import { Settings } from 'features/manageSettings/types';
import type { Table } from 'features/types';

export const useTableManager = ({ updateSetting, settings }: Settings) => {
  const newSetting = {
    name: '',
    description: '',
    fields: [],
  };

  const tables = [...(settings.tables ?? [])];

  const add = () => {
    updateSetting('tables', [...tables, { ...newSetting }]);
  };

  const update = (index: number, tableSettings: Partial<Table>) => {
    const newTables = tables;
    newTables[index] = { ...newTables[index], ...tableSettings };
    updateSetting('tables', newTables);
  };

  const updateAll = (tables: Table[]) => {
    updateSetting('tables', [...tables]);
  };

  const deleteAt = (index: number) => {
    const newTables = [...tables];
    newTables.splice(index, 1);
    updateSetting('tables', newTables);
  };

  const get = <T extends keyof Table>(index: number, key: T): Table[T] => {
    const tableSettings = tables[index] ?? { ...newSetting };
    return tableSettings[key] as Table[T];
  };

  return {
    add,
    update,
    updateAll,
    get,
    deleteAt,
  };
};

export type UseTableManager = ReturnType<typeof useTableManager>;
