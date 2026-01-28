import { createRoot } from "react-dom/client";
import { theme } from "./theme/theme.ts";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </Provider>,
);
