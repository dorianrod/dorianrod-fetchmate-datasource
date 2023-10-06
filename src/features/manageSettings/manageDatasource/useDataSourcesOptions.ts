import { getDataSourceSrv } from '@grafana/runtime';
import { compatibleDatasources } from 'features/constants';

export const useDataSourcesOptions = () => {
  const dataSources = getDataSourceSrv();
  const list = dataSources.getList();
  return list
    .filter(({ type }) => compatibleDatasources.map(({ name }) => name).includes(type))
    .map(({ name, uid }) => ({
      value: uid,
      label: name,
    }));
};
