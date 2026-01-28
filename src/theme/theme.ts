import { createTheme } from "@mui/material";

export const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    "&::-webkit-scrollbar": {
                        width: 0,
                    },
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    width: 300,
                    position: "fixed",
                    right: 10,
                    top: 90,
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                
            }
        }
    },
});
