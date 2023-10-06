import React from 'react';
import { Button, HorizontalGroup } from '@grafana/ui';
import { useTableManager } from './useTableManager';
import { PrefillSettingsFromDatabaseButton } from '../updateSettingsFromDatabase/PrefillSettingsFromDatabaseButton';
import { FieldSet } from 'features/shared/UI';
import { TableSettings } from './TableSettings';
import type { Settings } from '../types';

export const TablesList: React.FC<Settings> = (props) => {
  const tableManager = useTableManager(props);
  const { settings } = props;

  const label = (
    <HorizontalGroup justify="space-between">
      <span>Tables</span>
      <HorizontalGroup>
        {settings.source && <PrefillSettingsFromDatabaseButton manager={tableManager} name={settings.source} />}
        <Button variant="secondary" onClick={() => tableManager.add()}>
          + Add table
        </Button>
      </HorizontalGroup>
    </HorizontalGroup>
  );

  return (
    <FieldSet label={label as unknown as string /* Typing */}>
      {settings.tables?.map((_, index) => {
        return <TableSettings index={index} key={index} manager={tableManager} {...props} />;
      })}
    </FieldSet>
  );
};
