import { DataSourcePluginOptionsEditorProps, DataSourceSettings } from '@grafana/data';
import type { MyDataSourceOptions } from '../types';

export type ConfigProps = DataSourcePluginOptionsEditorProps<MyDataSourceOptions>;

export type UpdateSetting = (path: string, value: any) => void;

export interface Settings {
  updateSetting: UpdateSetting;
  settings: DataSourceSettings<MyDataSourceOptions, {}>['jsonData'];
}
