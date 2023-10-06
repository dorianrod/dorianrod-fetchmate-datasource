import React from 'react';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { DataSourceHttpSettings, TextArea } from '@grafana/ui';
import { DatasourceSelector } from './manageDatasource/DatasourceSelector';
import { InlineField, FieldSet } from 'features/shared/UI';
import { TablesList } from './manageTableSettings/TablesList';
import type { ConfigProps } from 'features/manageSettings/types';

export const EditorForm: React.FC<ConfigProps> = (props) => {
  const { options, onOptionsChange } = props;

  const updateSetting = (path: string, value: any) => {
    const newSettings = cloneDeep(options.jsonData);
    set(newSettings, path, value);
    onOptionsChange({ ...options, jsonData: newSettings });
  };

  return (
    <>
      <DataSourceHttpSettings
        defaultUrl=""
        urlLabel="FetchMate service URL"
        dataSourceConfig={{ ...options, access: 'direct' }}
        onChange={onOptionsChange}
        showAccessOptions={false}
        showForwardOAuthIdentityOption={false}
      />
      <DatasourceSelector {...props} />
      <FieldSet label="Dataset context">
        <InlineField
          label="Context"
          tooltip="You can provide context here that is common across tables. For example, if there are naming standards for tables, foreign keys, etc."
        >
          <TextArea
            rows={5}
            value={options.jsonData.context}
            onChange={(e) => updateSetting('context', e.currentTarget.value)}
          />
        </InlineField>
      </FieldSet>
      <TablesList settings={options.jsonData} updateSetting={updateSetting} />
    </>
  );
};
