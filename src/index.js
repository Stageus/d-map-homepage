import React from "react";
import ReactDOM from "react-dom/client";
import App from "./0_App";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </RecoilRoot>
);
