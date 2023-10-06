package plugin

import "time"

// apiMetrics is a struct containing a slice of dataPoint
type apiMetrics struct {
	DataPoints []apiDataPoint `json:"datapoints"`
}

// apiDataPoint is a single data point with a timestamp and a float value
type apiDataPoint struct {
	Time  time.Time `json:"time"`
	Value float64   `json:"value"`
}

type apiQuery struct {
	Prompts []string `json:"prompts"`
	Engine  string   `json:"engine"`
}

type Field struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Type        string `json:"type"`
}

type Table struct {
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Fields      []Field `json:"fields"`
}

type JSONData struct {
	Source  string  `json:"source"`
	Context string  `json:"context"`
	Tables  []Table `json:"tables"`
}
