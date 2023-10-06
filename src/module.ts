import { DataSourcePlugin } from '@grafana/data';
import { DataSource } from './features/explore/datasource';
import { QueryEditor } from 'features/explore/QueryEditor';
import { MyQuery, MyDataSourceOptions } from './features/types';
import { EditorForm } from 'features/manageSettings/EditorForm';

export const plugin = new DataSourcePlugin<DataSource, MyQuery, MyDataSourceOptions>(DataSource)
  .setConfigEditor(EditorForm)
  .setQueryEditor(QueryEditor);
