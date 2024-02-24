import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux";
import {persistor, store} from "./state/store.ts";

import {PersistGate} from 'redux-persist/integration/react';
import router from "./router";
import {RouterProvider} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import { theme } from './theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                <CssBaseline/>
                <RouterProvider router={router}/>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
)
