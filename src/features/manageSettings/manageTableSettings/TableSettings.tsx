import React from 'react';
import { Button, Card, HorizontalGroup, Input, TextArea } from '@grafana/ui';
import { InlineField } from 'features/shared/UI';
import { ColumnsList } from './manageColumnsSettings/ColumnsList';
import type { UseTableManager } from './useTableManager';

interface TableSettingsProps {
  index: number;
  manager: UseTableManager;
}

export const TableSettings: React.FC<TableSettingsProps> = (props) => {
  const { manager, index } = props;

  return (
    <Card>
      <Card.Heading>
        <HorizontalGroup justify="flex-end">
          <Button variant="secondary" fill="outline" onClick={() => manager.deleteAt(index)}>
            Remove
          </Button>
        </HorizontalGroup>
      </Card.Heading>
      <Card.Description>
        <InlineField tooltip="SQL name of your table." label="Name" width={12}>
          <Input
            value={manager.get(index, 'name')}
            onChange={(e) =>
              manager.update(index, {
                name: e.currentTarget.value,
              })
            }
          />
        </InlineField>
        <InlineField
          tooltip="Provide comprehensive details about the data within your table in functional terms. Explain the concept of a 'row' and how columns are interconnected within this table as well as with other tables"
          label="Description"
          width={12}
        >
          <TextArea
            rows={5}
            value={manager.get(index, 'description')}
            onChange={(e) =>
              manager.update(index, {
                description: e.currentTarget.value,
              })
            }
          />
        </InlineField>
        <ColumnsList index={index} manager={manager} />
      </Card.Description>
    </Card>
  );
};
