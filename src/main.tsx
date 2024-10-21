import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./index.css";

import { Provider } from "react-redux";
import store from "@/app/store.ts";

import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
