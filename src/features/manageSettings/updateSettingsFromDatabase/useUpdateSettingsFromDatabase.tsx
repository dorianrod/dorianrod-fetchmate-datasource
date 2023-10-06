import { useCallback, useEffect, useState } from 'react';
import { getDataSourceSrv } from '@grafana/runtime';
import { UseTableManager } from '../manageTableSettings/useTableManager';
import { getSQLStructure } from './getSQLStructure';
import { SQLSource } from 'features/types';

export const useUpdateSettingsFromDatabase = ({ name, manager }: { name: string; manager: UseTableManager }) => {
  const [loading, setLoading] = useState(false);
  const [datasource, setDatasource] = useState<SQLSource | null>(null);

  useEffect(() => {
    const getDataSource = async () => {
      try {
        const dataSource = await getDataSourceSrv().get(name);
        setDatasource(dataSource);
      } catch (err) {
        console.error(err);
        setDatasource(null);
      }
    };
    getDataSource();
  }, [name]);

  const get = useCallback(async () => {
    if (datasource) {
      try {
        setLoading(true);
        const tableSettings = await getSQLStructure(datasource);
        manager.updateAll(tableSettings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datasource]);

  return { loading, get, sqlDatasource: datasource };
};
