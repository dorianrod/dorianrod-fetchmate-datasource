import React from 'react';
import { Button, Input, Modal, TextArea } from '@grafana/ui';
import { InlineField } from 'features/shared/UI';
import type { UseColumnEditModalManager } from './useColumnEditModalManager';

interface ColumnEditModalProps {
  manager: UseColumnEditModalManager;
}

export const ColumnEditModal: React.FC<ColumnEditModalProps> = ({ manager }) => {
  const { isOpen, close, save, field, setField } = manager;
  return (
    <>
      <Modal onDismiss={() => close()} title="Column" isOpen={isOpen}>
        <>
          <InlineField tooltip="SQL name of the column in the table" label="Name">
            <Input value={field.name} onChange={(e) => setField({ ...field, name: e.currentTarget.value })} />
          </InlineField>
          <InlineField tooltip="SQL type: varchar, int, float, ..." label="Type">
            <Input value={field.type} onChange={(e) => setField({ ...field, type: e.currentTarget.value })} />
          </InlineField>
          <InlineField
            tooltip="Provide functional information about the content of this column in your table. You can also provide possible values if it's a text field."
            label="Description"
          >
            <TextArea
              rows={5}
              value={field.description}
              onChange={(e) => setField({ ...field, description: e.currentTarget.value })}
            />
          </InlineField>
        </>
        <Modal.ButtonRow>
          <Button fill="outline" variant="secondary" onClick={() => close()}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              save();
              close();
            }}
          >
            Save
          </Button>
        </Modal.ButtonRow>
      </Modal>
    </>
  );
};
