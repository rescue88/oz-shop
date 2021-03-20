import { createMuiTheme } from '@material-ui/core';

const theme: any = createMuiTheme({
    typography: {
        button: {
            fontSize: '1rem'
        }
    },
    palette: {
        primary: {
            main: '#33F681'
        },
        secondary: {
            main: '#FFA84C'
        }
    }
});

export default theme;