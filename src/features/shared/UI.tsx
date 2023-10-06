import { InlineField as BaseInlineField, InlineLabel } from '@grafana/ui';
import React, { PropsWithChildren } from 'react';

interface FieldSetProps extends PropsWithChildren {
  label: string;
}

export const FieldSet: React.FC<FieldSetProps> = ({ label, children }) => {
  return (
    <>
      <h3 className="page-heading">{label}</h3>
      <div className="gf-form-group">{children}</div>
    </>
  );
};

interface InlineFieldProps extends React.ComponentProps<typeof BaseInlineField> {
  width?: number;
  tooltip?: string;
}

export const InlineField: React.FC<InlineFieldProps> = ({ label, tooltip, grow = true, children, width = 13 }) => {
  return (
    <BaseInlineField
      grow={grow}
      label={
        <InlineLabel tooltip={tooltip} className={`width-${width}`}>
          {label}
        </InlineLabel>
      }
    >
      <>{children}</>
    </BaseInlineField>
  );
};
