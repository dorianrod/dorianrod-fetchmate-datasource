import { QueryEditorProps as QueryEditorPropsBase } from '@grafana/data';
import type { DataSource } from './datasource';
import type { MyDataSourceOptions, MyQuery } from 'features/types';

export type QueryEditorProps = QueryEditorPropsBase<DataSource, MyQuery, MyDataSourceOptions>;
