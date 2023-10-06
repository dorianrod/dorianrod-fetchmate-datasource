import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme2) => {
  return {
    title: css`
      margin-top: ${theme.spacing(4)};
    `,
    nameHeader: css`
      width: 200px !important;
    `,
    typeHeader: css`
      width: 200px !important;
    `,
    deleteHeader: css`
      width: 50px !important;
    `,
    cell:
      css`
        text-overflow: ellipsis;
        overflow: hidden;
      ` + ' max-width-10',
  };
};
