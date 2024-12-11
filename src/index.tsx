import React from "react";
import "./assets/styles.css";
import ReactDOM from "react-dom/client";
import SidebarTest from "./SidebarTest";
import ModalProvider from "./components/providers/ModalProvider";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ModalProvider>
      <SidebarTest />
    </ModalProvider>
    <div id="modal-root" />
  </React.StrictMode>
);
