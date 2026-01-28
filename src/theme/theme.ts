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
                    top: 10,
                    zIndex: 1000,
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: "outlined"
            },
            styleOverrides: {
                root: {
                    width: "360px"
                }
            }
        }
    },
});
