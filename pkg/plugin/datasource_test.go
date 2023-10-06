package plugin

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

const refID = "A"

var dsReq = &backend.QueryDataRequest{
	Queries: []backend.DataQuery{
		{RefID: refID},
	},
}

func TestHealthCheck(t *testing.T) {
	// tc is a test case for the health check test
	type tc struct {
		// name identifies the test case
		name string

		// h is an http.HandlerFunc that will be used for the mocked http server connected to the datasource
		h http.HandlerFunc

		// pre is an (optional) function executed before the health check that can modify the datasource object
		pre func(ds *Datasource)

		// post is an (optional) function executed after the heath check.
		// it should be used to run assertions on the result of the health check
		post func(t *testing.T, res *backend.CheckHealthResult)
	}

	// Re-usable HTTP handler funcs
	h500 := http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		w.WriteHeader(http.StatusInternalServerError)
	})
	h200 := http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	for _, c := range []tc{
		// Error 500 from the remote server should return a healthcheck error
		{
			name: "500",
			h:    h500,
			post: func(t *testing.T, res *backend.CheckHealthResult) {
				assert.Contains(t, res.Message, "500", "response message should contain status code")
			},
		},

		// Wrong URL on the datasource config should return a healthcheck error
		{
			name: "wrong url",
			h:    h500,
			pre: func(ds *Datasource) {
				ds.settings.URL = "wrong"
			},
			post: func(t *testing.T, res *backend.CheckHealthResult) {
				assert.Equal(t, "request error", res.Message)
			},
		},

		// 200 OK from the remote server should return an OK healthcheck
		{
			name: "success",
			h:    h200,
			post: func(t *testing.T, res *backend.CheckHealthResult) {
				assert.Equal(t, backend.HealthStatusOk, res.Status, "status should be ok")
				assert.Equal(t, "Data source is working", res.Message, "message should be correct")
			},
		},
	} {
		t.Run(c.name, func(t *testing.T) {
			// Create mock server
			svc := httptest.NewServer(c.h)
			defer svc.Close()

			// Create its corresponding datasource
			ds := newMockDataSourceFromHttpTestServer(svc, "")

			// Optionally run the testcase's pre function
			if c.pre != nil {
				c.pre(&ds)
			}

			// Run healthcheck and do not expect a function err
			resp, err := ds.CheckHealth(context.Background(), nil)
			require.NoError(t, err, "CheckHealth must not return an error")
			require.NotNil(t, resp, "resp must not be nil")

			// Optionally run the testcase's post function (extra assertions)
			if c.post != nil {
				c.post(t, resp)
			}
		})
	}
}

// newMockDataSourceFromHttpTestServer returns a new Datasource that connects to the
// specified testServer.
func newMockDataSourceFromHttpTestServer(testServer *httptest.Server, urlSuffix string) Datasource {
	return Datasource{
		httpClient: testServer.Client(),
		settings: backend.DataSourceInstanceSettings{
			URL: testServer.URL + urlSuffix,
		},
	}
}

type mockServerOption func(w http.ResponseWriter, req *http.Request)

func withSuccessResponse(w http.ResponseWriter, _ *http.Request) {
	const pointsN = 1024
	points := make([]apiDataPoint, pointsN)
	for i := 0; i < pointsN; i++ {
		ts := time.Now().Add(time.Second * time.Duration(-i)).UTC()
		points[i].Time = ts
		points[i].Value = float64(i)
	}
	w.Header().Add("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(apiMetrics{
		DataPoints: points,
	}); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
}

func withDelay(duration time.Duration) mockServerOption {
	return func(w http.ResponseWriter, req *http.Request) {
		time.Sleep(duration)
	}
}

func withStatusAndBody(statusCode int, body []byte) mockServerOption {
	return func(w http.ResponseWriter, req *http.Request) {
		w.WriteHeader(statusCode)
		_, _ = w.Write(body)
	}
}

// newDefaultMockDataSource creates a new httptest.Server which implements a handler
// that returns a valid JSON apiMetrics as its
// handler, and returns a Datasource that is linked to the /metrics handler of the httptest.Server.
// The function returns both the Datasource and the httptest.Server.
// The caller should `defer Close()` the returned httptest.Server.
func newDefaultMockDataSource(opts ...mockServerOption) (Datasource, *httptest.Server) {
	mux := http.NewServeMux()
	mux.HandleFunc("/metrics", func(w http.ResponseWriter, req *http.Request) {
		for _, opt := range opts {
			opt(w, req)
		}
	})
	srv := httptest.NewServer(mux)
	return newMockDataSourceFromHttpTestServer(srv, "/metrics"), srv
}
