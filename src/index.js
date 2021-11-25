import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import CustomThemeProvider from "context/themeCtx";
import AuthProvider from "context/authCtx";

ReactDOM.render(
    <BrowserRouter>
        <CustomThemeProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </CustomThemeProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
