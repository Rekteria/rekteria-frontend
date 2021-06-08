import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = {
  palette: {
    primary: {
      main: '#2d797d',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#2b2a2a',
      paper: '#374e50f5',
      menu: {
        color:'#374e50f5',
        hover: '#338b8e'
      }
    },
  },
  typography: {
    fontFamily: [
      'times new roman'
    ].join(','),
  },
};

export default createMuiTheme(theme)
