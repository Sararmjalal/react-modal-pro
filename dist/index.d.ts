import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

type ModalProviderProps = {
    defaultCanDismiss?: boolean;
    defaultOpenDuration?: number;
    defaultCloseDuration?: number;
    defaultSheetClassName?: string;
    defaultBackdropClassName?: string;
};
type SidebarModalProps = {
    direction: "left" | "right";
} & Omit<UseModalProProps, "sheetRef">;
type ProSheetModalProps = {
    direction: "top" | "bottom";
} & Omit<UseModalProProps, "sheetRef">;
type DialogModalProps = Omit<UseModalProProps, "sheetRef">;

declare const ProModalProvider: ({ children, ...props }: ModalProviderProps & {
    children: ReactNode;
}) => react_jsx_runtime.JSX.Element;

type DialogExtendedProps = {
    children: ReactNode;
    TriggerElement: ReactNode;
};
declare const Dialog: ({ TriggerElement, children, ...props }: DialogModalProps & DialogExtendedProps) => react_jsx_runtime.JSX.Element;

type ProSheetExtendedProps = {
    children: ReactNode;
    TriggerElement: ReactNode;
};
declare const ProSheet: ({ TriggerElement, direction, children, ...props }: ProSheetModalProps & ProSheetExtendedProps) => react_jsx_runtime.JSX.Element;

type SidebarExtendedProps = {
    children: ReactNode;
    TriggerElement: ReactNode;
};
declare const Sidebar: ({ direction, ...sidebarProps }: SidebarModalProps & SidebarExtendedProps) => react_jsx_runtime.JSX.Element;

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
