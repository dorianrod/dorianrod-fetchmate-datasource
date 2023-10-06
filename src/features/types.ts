import { DataQuery, DataSourceApi, DataSourceJsonData } from '@grafana/data';

export type SQLSource = DataSourceApi<DataQuery, DataSourceJsonData>;

export interface MyQuery extends DataQuery {
  prompts: string[];
  engine: string;
}

export type Column = {
  name: string;
  description?: string;
  type: string;
};

export type Table = {
  name: string;
  description?: string;
  fields?: Column[];
};

export interface MyDataSourceOptions extends DataSourceJsonData {
  source?: string;
  context?: string;
  tables: Table[];
}
