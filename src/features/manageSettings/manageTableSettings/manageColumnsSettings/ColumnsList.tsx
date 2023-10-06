import { Button, HorizontalGroup, useStyles2 } from '@grafana/ui';
import { UseTableManager } from '../useTableManager';
import React from 'react';
import { getStyles } from 'features/manageSettings/styles';
import { ColumnEditModal } from './ColumnEditModal';
import { useColumnManager } from './useColumnManager';
import { useColumnEditModalManager } from './useColumnEditModalManager';

interface ColumnsListProps {
  manager: UseTableManager;
  index: number;
}

export const ColumnsList: React.FC<ColumnsListProps> = ({ manager, index }) => {
  const style = useStyles2(getStyles);
  const fieldManager = useColumnManager({ manager, index });
  const fieldModalManager = useColumnEditModalManager(fieldManager);

  const { deleteAt } = fieldManager;
  const fields = manager.get(index, 'fields') ?? [];

  return (
    <>
      <ColumnEditModal manager={fieldModalManager} />
      <h4 className={style.title}>
        <HorizontalGroup justify="flex-end">
          {/* <span>Columns informations</span> */}
          <Button
            variant="secondary"
            onClick={() => {
              fieldModalManager.new();
            }}
          >
            + Add column
          </Button>
        </HorizontalGroup>
      </h4>
      {fields.length > 0 && (
        <table className="filter-table filter-table--hover">
          <thead>
            <tr>
              <th className={style.nameHeader}>Name</th>
              <th className={style.typeHeader}>Type</th>
              <th>Description</th>
              <th className={style.deleteHeader} />
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => {
              return (
                <tr key={index}>
                  <td className={style.cell}>{field.name}</td>
                  <td className={style.cell}>{field.type}</td>
                  <td className={style.cell}>{field.description}</td>
                  <td>
                    <HorizontalGroup>
                      <Button size="sm" fill="outline" variant="secondary" onClick={() => deleteAt(index)}>
                        x
                      </Button>
                      <Button icon="edit" size="sm" variant="secondary" onClick={() => fieldModalManager.edit(index)} />
                    </HorizontalGroup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
