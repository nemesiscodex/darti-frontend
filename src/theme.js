import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#343a54',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: '#d44250',
        },
        background: {
            default: '#eaeaea',
        },
    },
});

export default theme;