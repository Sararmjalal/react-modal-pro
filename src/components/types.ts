export type ModalProps = {
  open: boolean;
  willBeClosed: boolean;
  handleClose: () => void;
}

export type DialogBaseProps = ModalProps & Required<Omit<ModalControls, "modalKey">>;

export type DrawerBaseProps = {
  direction: DrawerDirection;
} & ModalProps & Required<Omit<ModalControls, "modalKey">>;

export type ModalProviderProps = {
  defaultCanDismiss?: boolean;
  defaultOpenDuration?: number;
  defaultCloseDuration?: number;
  defaultSheetClassName?: string;
  defaultBackdropClassName?: string;
};

export type SidebarModalProps = {
  direction: "left" | "right";
} & Omit<UseModalProProps, "sheetRef">;

export type ProSheetModalProps = {
  direction: "top" | "bottom";
} & Omit<UseModalProProps, "sheetRef">;

export type DialogModalProps = & Omit<UseModalProProps, "sheetRef">