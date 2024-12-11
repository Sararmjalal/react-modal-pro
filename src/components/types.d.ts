type ModalProps = {
  open: boolean;
  willBeClosed: boolean;
  handleClose: () => void;
}

type DialogBaseProps = ModalProps & Required<Omit<ModalControls, "modalKey">>;

type DrawerBaseProps = {
  direction: DrawerDirection;
} & ModalProps & Required<Omit<ModalControls, "modalKey">>;

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

type DialogModalProps = & Omit<UseModalProProps, "sheetRef">