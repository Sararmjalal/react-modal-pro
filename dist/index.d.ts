import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

type DrawerDirection = "left" | "right" | "top" | "bottom";
type ModalControls = {
    modalKey?: string;
    openDuration?: number;
    closeDuration?: number;
    sheetClassName?: string;
    backdropClassName?: string;
};
type UseModalProProps = {
    canDismiss?: boolean;
    swipeToOpen?: boolean;
    swipeToClose?: boolean;
    swipeThreshold?: number;
    closeCb?: () => void;
    sheetRef: React.RefObject<HTMLElement | undefined>;
    sidebarDirection?: DrawerDirection;
} & ModalControls;

type ModalProviderProps = {
    defaultCanDismiss?: boolean;
    defaultOpenDuration?: number;
    defaultCloseDuration?: number;
    defaultSheetClassName?: string;
    defaultBackdropClassName?: string;
};
type SidebarExtendedProps = {
    children: ReactNode;
    TriggerElement: ReactNode;
};
type SidebarModalProps = {
    direction: "left" | "right";
} & Omit<UseModalProProps, "sheetRef"> & SidebarExtendedProps;
type ProSheetExtendedProps = {
    children: ReactNode;
    TriggerElement: ReactNode;
};
type ProSheetModalProps = {
    direction: "top" | "bottom";
} & Omit<UseModalProProps, "sheetRef"> & ProSheetExtendedProps;
type DialogExtendedProps = {
    children: ReactNode;
    TriggerElement: ReactNode;
};
type DialogModalProps = DialogExtendedProps & Omit<UseModalProProps, "sheetRef">;

declare const ProModalProvider: ({ children, ...props }: ModalProviderProps & {
    children: ReactNode;
}) => react_jsx_runtime.JSX.Element;

declare const Dialog: ({ TriggerElement, children, ...props }: DialogModalProps) => react_jsx_runtime.JSX.Element;

declare const ProSheet: ({ TriggerElement, direction, children, ...props }: ProSheetModalProps) => react_jsx_runtime.JSX.Element;

declare const Sidebar: ({ direction, ...sidebarProps }: SidebarModalProps) => react_jsx_runtime.JSX.Element;

declare const useModalPro: (props: UseModalProProps) => {
    currentModalKey: string;
    backdropClassName: string;
    canDismiss: boolean;
    closeDuration: number;
    openDuration: number;
    sheetClassName: string;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
    open: boolean;
    willBeClosed: boolean;
};

export { Dialog, ProModalProvider, ProSheet, Sidebar, useModalPro };
