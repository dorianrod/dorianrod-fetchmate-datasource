import React from 'react';
import { Button, Container, Field, TextArea, useStyles2 } from '@grafana/ui';
import { getStyle } from './QueryEditor.style';
import { QueryEditorProps } from './types';
import { usePromptsManager } from './usePromptsManager';
import { SQLRequest } from './SQLRequest';
import { DataSource } from './datasource';

export const QueryEditor: React.FC<QueryEditorProps & { extraPrompts?: boolean }> = ({
  extraPrompts = false,
  datasource,
  data,
  ...props
}) => {
  const style = useStyles2(getStyle);
  const { prompts, update, deleteAt, add } = usePromptsManager(props);

  const querySQL = DataSource.getQuerySqlByPrompt(prompts);

  const isLoading = data?.state === 'Loading';

  return (
    <>
      {prompts.map((request, index) => {
        return (
          <div className={style.wrapper} key={index}>
            <Container grow={2}>
              <Field label={index === 0 ? 'What do you want to know about your data' : 'Details'}>
                <TextArea
                  rows={5}
                  disabled={isLoading}
                  value={request}
                  onChange={(e) => update(index, e.currentTarget.value)}
                />
              </Field>
            </Container>
            {index > 0 ? (
              <Container>
                <Button variant="secondary" size="sm" onClick={() => deleteAt(index)} icon="times" />
              </Container>
            ) : null}
          </div>
        );
      })}
      {querySQL && <SQLRequest querySQL={querySQL} datasource={datasource} />}
      {extraPrompts && (
        <Button variant="secondary" size="sm" onClick={add} icon="times">
          Give details
        </Button>
      )}
    </>
  );
};
