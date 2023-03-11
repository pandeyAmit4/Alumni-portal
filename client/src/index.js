import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import dotenv from "dotenv";
import AuthProvider from "./context/AuthContext";
import * as serviceWorker from "./serviceWorker";
dotenv.config();
ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
serviceWorker.register();
