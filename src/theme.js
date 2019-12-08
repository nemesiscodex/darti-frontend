import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1f2b38',
    },
    secondary: {
      main: '#50e3c2',
      dark: '#42c3a1',
      light: 'rgba(80,227,194,0.75)',
    },
    error: {
      main: '#d44250',
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
