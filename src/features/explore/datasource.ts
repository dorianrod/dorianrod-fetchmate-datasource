import { CoreApp, DataQueryRequest, DataQueryResponse, DataSourceInstanceSettings } from '@grafana/data';

import { MyQuery, MyDataSourceOptions } from '../types';
import { DataSourceWithBackend } from '@grafana/runtime';
import { Observable, from, lastValueFrom } from 'rxjs';
import { getSQLDatasourceFromSettings } from './helpers/getSQLDatasourceFromSettings';

export class DataSource extends DataSourceWithBackend<MyQuery, MyDataSourceOptions> {
  static _sqlByPrompts: { [prompt: string]: string } = {};
  static _getPromptByPrompts = (prompts: string[]) => prompts.join(';');
  static getQuerySqlByPrompt = (prompts: string[]) => DataSource._sqlByPrompts[DataSource._getPromptByPrompts(prompts)];

  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super({ ...instanceSettings, access: 'direct' });
  }

  query(request: DataQueryRequest<MyQuery>): Observable<DataQueryResponse> {
    const getData = async (request: DataQueryRequest<MyQuery>) => {
      const prompt = DataSource._getPromptByPrompts(request.targets[0]?.prompts ?? []);
      if (!prompt) {
        return {
          data: [],
        };
      }

      const sqlDataSource = await getSQLDatasourceFromSettings(this.uid);
      const data: DataQueryResponse = await lastValueFrom(super.query(request));

      const errors: string[] = [];
      const sqlTargets = data.data.map(({ fields, refId }) => {
        const valueField = fields.find(({ name }: { name: string }) => name === 'values');
        const errorField = fields.find(({ name }: { name: string }) => name === 'errors');
        if (errorField) {
          errors.push(errorField.values[0]);
        }

        return {
          rawSql: valueField && valueField.values[0],
          format: 'table',
          refId,
        };
      });

      if (errors.length) {
        throw Error(errors.join(', '));
      }

      if (sqlTargets.length === 0) {
        throw {
          data: [],
        };
      }
      const sql = sqlTargets[0].rawSql;
      DataSource._sqlByPrompts[prompt] = sql;

      const sqlQuery = sqlDataSource.query({
        ...request,
        targets: sqlTargets,
      }) as Observable<DataQueryResponse>;

      const sqlData = await lastValueFrom(sqlQuery);

      return sqlData;
    };

    return from(getData(request));
  }

  getDefaultQuery(app: CoreApp): Partial<MyQuery> {
    return { prompts: [''], engine: 'MySQL' };
  }
}
