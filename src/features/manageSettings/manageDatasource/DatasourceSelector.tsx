import React from 'react';
import { SelectableValue } from '@grafana/data';
import { Alert, LinkButton, Select, HorizontalGroup } from '@grafana/ui';
import { ConfigProps } from '../types';
import { compatibleDatasources } from 'features/constants';
import { FieldSet, InlineField } from '../../shared/UI';
import { useDataSourcesOptions } from './useDataSourcesOptions';

export const DatasourceSelector: React.FC<ConfigProps> = ({ onOptionsChange, options }) => {
  const dataSourcesOptions = useDataSourcesOptions();

  return (
    <FieldSet label="Datasource">
      {dataSourcesOptions.length ? (
        <InlineField
          label="SQL Datasource"
          tooltip="Provide information about the structure of this table: what columns does it contain? What are their names and attribute types? The best way is to provide the SQL query used to create this table."
        >
          <Select
            options={dataSourcesOptions}
            value={options.jsonData?.source}
            onChange={({ value }: SelectableValue<string>) =>
              onOptionsChange({ ...options, jsonData: { ...options.jsonData, source: value! } })
            }
          />
        </InlineField>
      ) : (
        <>
          <Alert severity="info" title={''}>
            You need to add a compatible SQL data source first:
          </Alert>
          <HorizontalGroup>
            {compatibleDatasources.map(({ name, text }) => {
              return (
                <LinkButton key={name} href={`http://localhost:3000/connections/datasources/${name}`} icon="plus">
                  {text}
                </LinkButton>
              );
            })}
          </HorizontalGroup>
        </>
      )}
    </FieldSet>
  );
};
