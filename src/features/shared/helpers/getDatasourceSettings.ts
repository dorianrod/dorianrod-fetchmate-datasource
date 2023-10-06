import type { DataSourceSettings } from '@grafana/data';
import { getDataSourceSrv } from '@grafana/runtime';

export const getDatasourceJsonDataById = <T extends DataSourceSettings>(uid: string) => {
  return getDataSourceSettingsById<T>(uid)?.jsonData as T | undefined;
};

export const getDataSourceSettingsById = <T extends DataSourceSettings>(uid: string) => {
  return getDataSourceSrv()
    .getList()
    .find(({ uid: sourceUid }) => sourceUid === uid) as T | undefined;
};
