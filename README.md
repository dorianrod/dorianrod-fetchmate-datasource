<div align="center">
    <img src="https://github.com/dorianrod/grafana-fetchmate-datasource/blob/master/src/img/logo.svg" alt="Logo" style="max-height: 400px;" />
</div>

# Grafana FetchMate Datasource Plugin

This plugin allows you to query data by asking questions in Human-language without the need to know SQL language.

<div align="center">
    <img src="https://github.com/dorianrod/grafana-fetchmate-datasource/blob/master/src/img/explore.gif" alt="Explore demo"/>
</div>

## Components

- A Grafana datasource plugin that translates "human" queries into SQL queries
- A microservice using OpenAI to translate a question into a SQL query based on a description of the data in the database ([repository](https://github.com/dorianrod/fetchmate))

## Getting Started

### Create an OpenAI Token

To use OpenAI services, you need an API key. Here are the steps to create an OpenAI token:

1. **Refer to OpenAI Documentation**: Follow the official OpenAI documentation to create your API key. You can find detailed instructions on how to obtain your key in the [OpenAI Documentation](https://platform.openai.com/).

2. **Update Environment Variables**: Once you have your API key, create or modify your `.env` file and add the following line:

   ```
   OPENAPI_KEY_API=your-openai-api-key
   ```

   Replace `your-openai-api-key` with the actual API key you obtained from OpenAI.

### Run the application:

1. Install docker-compose from [here](https://docs.docker.com/compose/install/)
2. Run the command `make build` to build datasource backend and frontend
3. Run the command `make start` to run grafana / mysql / fetchMate dockers
4. Access Grafana at `localhost:3000`
5. Log in using the ID `admin` and password `admin`
6. Navigate to the "Explore" module in Grafana
7. Open a datasource "Basket dataset" or "Product dataset"
8. Ask your questions. Examples with the "Basket" dataset:
   - Provide the average daily basket cost for the 'Family Foods' store by day
   - What day had the highest revenue for 'Family Foods' store?
   - Which customer (name) buys the most products?

## Configuring a new datasource

To configure a new datasource:

1. Create a MySQL datasource
2. Create a "FetchMate" type datasource
3. Enter the URL of the FetchMate service
4. Specify the SQL data source to use
5. Click the "Auto prefill" button to prefill tables descriptions
6. Provide information about table contents, fields, and how they are related
7. Test! The accuracy of responses depends greatly on the quality of table and column descriptions. It's ideal to update information based on the quality of responses provided by the AI.

<div align="center">
    <img src="https://github.com/dorianrod/grafana-fetchmate-datasource/blob/master/src/img/settings.gif" alt="Create new datasource"/>
</div>

## Contributing

We welcome contributions from the community. If you'd like to contribute, please follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature or bug fix.
4. Make your changes and commit them with a clear message.
5. Push your changes to your fork on GitHub.
6. Open a pull request from your branch to the main repository's `master` branch.
7. Be sure to describe your changes in detail and explain why they are necessary.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](https://github.com/dorianrod/grafana-fetchmate-datasource/blob/master/LICENSE) file for details.
