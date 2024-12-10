import React from 'react';
import "./assets/styles.css";
import TestPage from "./TestPage";
import ReactDOM from "react-dom/client";
import { ModalDefaultsProvider, ModalsProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ModalDefaultsProvider>
      <ModalsProvider>
        <TestPage />
      </ModalsProvider>
    </ModalDefaultsProvider>
    <div id="modal-root" />
  </React.StrictMode>
);