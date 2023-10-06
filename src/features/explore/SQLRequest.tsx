import React from 'react';
import { HorizontalGroup, LinkButton } from '@grafana/ui';
import type { DataSource } from './datasource';
import { getDataSourceSettingsById, getDatasourceJsonDataById } from 'features/shared/helpers/getDatasourceSettings';

interface SQLRequestProps {
  querySQL: string;
  datasource: DataSource;
}

export const SQLRequest: React.FC<SQLRequestProps> = ({ querySQL, datasource }) => {
  return (
    <HorizontalGroup justify="flex-end">
      <LinkButton
        onClick={(e) => e.stopPropagation()}
        href={getEditorURL(datasource, querySQL)}
        icon="edit"
        fill="text"
        variant="secondary"
        target="_blank"
      >
        Edit SQL Request
      </LinkButton>
    </HorizontalGroup>
  );
};

const getEditorURL = (datasource: DataSource, querySQL: string) => {
  const { source } = getDatasourceJsonDataById<any>(datasource.uid) ?? {};
  const sqlDatasource = getDataSourceSettingsById<any>(source);

  const options = {
    datasource: sqlDatasource.type,
    queries: [
      {
        datasource: { type: sqlDatasource.type, uid: sqlDatasource.uid },
        rawSql: querySQL,
        format: 'table',
      },
    ],
  };

  return '/explore?left=' + encodeURIComponent(JSON.stringify(options));
};
