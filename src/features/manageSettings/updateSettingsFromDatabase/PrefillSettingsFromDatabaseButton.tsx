import React from 'react';
import { ToolbarButton } from '@grafana/ui';
import { useUpdateSettingsFromDatabase } from './useUpdateSettingsFromDatabase';
import type { UseTableManager } from '../manageTableSettings/useTableManager';

export const PrefillSettingsFromDatabaseButton: React.FC<{
  name: string;
  manager: UseTableManager;
}> = ({ name, manager }) => {
  const { loading, get, sqlDatasource } = useUpdateSettingsFromDatabase({ name, manager });
  return (
    <ToolbarButton
      icon={loading ? 'fa fa-spinner' : 'sync'}
      variant="default"
      disabled={loading || sqlDatasource === null}
      onClick={() => get()}
    >
      Auto prefill
    </ToolbarButton>
  );
};
