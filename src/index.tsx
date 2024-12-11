import React from "react";
import "./assets/styles.css";
import TestPage from "./TestPage";
import ReactDOM from "react-dom/client";
import ModalProvider from "./components/providers/ModalProvider";
import SidebarTest from "./SidebarTest";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ModalProvider>
      <TestPage />
      <SidebarTest />
    </ModalProvider>
    <div id="modal-root" />
  </React.StrictMode>
);
