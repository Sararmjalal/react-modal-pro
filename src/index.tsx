import React from 'react';
import "./assets/styles.css";
import TestPage from "./TestPage";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <TestPage />
    <div id="modal-root" />
  </React.StrictMode>
);