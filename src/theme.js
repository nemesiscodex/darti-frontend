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
            default: '#d8d8d8',
        },
    },
});

export default theme;