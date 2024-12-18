import { DialogModalProps, SidebarModalProps, ProSheetModalProps } from "./components/types";

export { useModalController } from "./lib";
export { default as Dialog } from "./components/modals/dialog";
export { default as Sidebar } from "./components/modals/sidebar";
export { default as ProSheet } from "./components/modals/pro-sheet";
export { default as ProModalProvider } from "./components/providers/ProModalProvider";

export type { DialogModalProps, SidebarModalProps, ProSheetModalProps };