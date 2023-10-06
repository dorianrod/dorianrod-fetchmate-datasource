import { getDatasourceJsonDataById } from '../../shared/helpers/getDatasourceSettings';
import { getDataSourceSrv } from '@grafana/runtime';

export const getSQLDatasourceFromSettings = async (uid: string) => {
  const datasourceSettings = getDatasourceJsonDataById<any>(uid);
  if (!datasourceSettings) {
    throw 'Source not found';
  }
  const sqlDataSourceName = datasourceSettings.source;
  const sqlDataSource = await getDataSourceSrv().get(sqlDataSourceName);

  return sqlDataSource;
};
