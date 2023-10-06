import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';

export const getStyle = (theme: GrafanaTheme2) => {
  return {
    wrapper: css`
      display: 'flex';
      align-items: 'center';
      gap: ${theme.spacing(2)};
      padding: ${theme.spacing(2)};
    `,
  };
};
