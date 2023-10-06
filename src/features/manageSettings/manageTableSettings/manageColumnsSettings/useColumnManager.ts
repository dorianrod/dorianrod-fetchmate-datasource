import type { Column } from 'features/types';
import type { UseTableManager } from '../useTableManager';

export const useColumnManager = ({ index: tableIndex, manager }: { index: number; manager: UseTableManager }) => {
  const fields = [...(manager.get(tableIndex, 'fields') ?? [])];

  const newField: Column = {
    name: '',
    description: '',
    type: '',
  };

  const get = (index: number) => {
    return fields[index] ?? { ...newField };
  };

  const add = (field?: Partial<Column>) => {
    const newFields = [...fields, { ...newField, ...field }];
    manager.update(tableIndex, {
      fields: newFields,
    });
  };

  const update = (index: number, field: Partial<Column>) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], ...field };
    manager.update(tableIndex, {
      fields: newFields,
    });
  };

  const deleteAt = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    manager.update(tableIndex, {
      fields: newFields,
    });
  };

  return {
    get,
    add,
    update,
    deleteAt,
  };
};

export type UseColumnManager = ReturnType<typeof useColumnManager>;
