/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable import/no-extraneous-dependencies */
import { createTheme } from '@mui/material/styles';
import { DefaultTheme } from '@mui/private-theming';

const theme: Partial<DefaultTheme> = createTheme({
  typography: {
    fontFamily: ['"Raleway"', 'sans-serif'].join(','),
  },
}) as Partial<DefaultTheme>;

export default theme;
