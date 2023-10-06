import { SQLSource, Table } from '../../types';
import { DATASOURCE_MYSQL } from '../../constants';
import { getDatasourceJsonDataById } from '../../shared/helpers/getDatasourceSettings';

interface BaseStructureGetter {
  source: SQLSource;
  getFields(): Promise<Table[]>;
}

abstract class GenericStructureGetter implements BaseStructureGetter {
  source: SQLSource;
  constructor(source: SQLSource) {
    this.source = source;
  }
  async getFields(): Promise<Table[]> {
    throw new Error('not implemented');
  }
}

class MysqlStructureGetter extends GenericStructureGetter {
  async getFields(): Promise<Table[]> {
    const TablesList: Table[] = [];

    const source = this.source as any;
    const settings = getDatasourceJsonDataById<any>(source.uid)!;

    const defaultDatabase = settings.database ?? null;

    const datasets = defaultDatabase
      ? [defaultDatabase]
      : (await source.getDB().datasets()).filter(
          (name: string) => !['mysql', 'performance_schema', 'sys'].includes(name)
        );

    for (let datasetIndex in datasets) {
      const dataset = datasets[datasetIndex];
      const tables = await source.getDB().tables(dataset);

      for (let tableIndex in tables) {
        const table = tables[tableIndex];

        const prefix = defaultDatabase === dataset ? '' : `${dataset}.`;

        const currentTable: Table = {
          description: '',
          name: `${prefix}${table}`,
          fields: [],
        };

        const fields: any[] = await source.getDB().fields({
          dataset,
          table,
        });

        fields.forEach((field) => {
          currentTable.fields?.push({
            name: field.name,
            description: '',
            type: field.type,
          });
        });

        TablesList.push(currentTable);
      }
    }

    return TablesList;
  }
}

export const getSQLStructure = async (sqlDatasource: SQLSource) => {
  switch (sqlDatasource.type) {
    case DATASOURCE_MYSQL:
      return new MysqlStructureGetter(sqlDatasource).getFields();

    default:
      throw new Error('This datasource is not implemented');
  }
};
