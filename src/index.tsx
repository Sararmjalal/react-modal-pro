import React from 'react';
import "./assets/styles.css";
import TestPage from "./TestPage";
import ReactDOM from "react-dom/client";
import { ModalDefaultsProvider, ModalsProvider } from './context';
import ModalProvider from './components/providers/ModalProvider';

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ModalProvider>
      <TestPage />
    </ModalProvider>
    <div id="modal-root" />
  </React.StrictMode>
);