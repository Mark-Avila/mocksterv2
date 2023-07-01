import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.ts";
import { BrowserRouter } from "react-router-dom";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type RootState = ReturnType<typeof store.getState>;

export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
