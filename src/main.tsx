import { createRoot } from "react-dom/client";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App />
        <CssBaseline />
    </Provider>,
);
