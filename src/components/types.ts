import { ReactNode, Ref } from "react";
import { DrawerDirection, ModalControls, UseModalProProps } from "../lib/types";

export type ModalProps = {
  open: boolean;
  willBeClosed: boolean;
  handleClose: () => void;
}

export type DialogBaseProps = {
  children: ReactNode, ref?: React.Ref<HTMLDivElement | null>
} & ModalProps & Required<Omit<ModalControls, "modalKey">>;

export type DrawerBaseProps = {
  direction: DrawerDirection;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
  mode: "sidebar" | "prosheet"
} & ModalProps & Required<Omit<ModalControls, "modalKey">>;

export type ModalProviderProps = {
  defaultCanDismiss?: boolean;
  defaultOpenDuration?: number;
  defaultCloseDuration?: number;
  defaultSheetClassName?: string;
  defaultBackdropClassName?: string;
};

export type SidebarExtendedProps = {
  children: ReactNode;
  TriggerElement: ReactNode;
}

export type SidebarModalProps = {
  direction: "left" | "right";
} & Omit<UseModalProProps, "sheetRef" | "sidebarDirection"> & SidebarExtendedProps;

export type ProSheetExtendedProps = {
  children: ReactNode;
  TriggerElement: ReactNode;
}

export type ProSheetModalProps = {
  direction: "top" | "bottom";
} & Omit<UseModalProProps, "sheetRef" | "sidebarDirection"> & ProSheetExtendedProps;

export type DialogExtendedProps = {
  children: ReactNode;
  TriggerElement: ReactNode;
}

export type DialogModalProps = DialogExtendedProps & Omit<UseModalProProps, "sheetRef" | "swipeToOpen" | "swipeToClose" | "swipeThreshold" | "sidebarDirection">