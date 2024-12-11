type DialogProps = {
  open: boolean;
  openDuration?: number;
  willBeClosed: boolean;
  closeDuration?: number;
  handleClose: () => void;
  sheetClassName?: string;
  backdropClassName?: string;
};

type DrawerProps = {
  open: boolean;
  openDuration: number;
  willBeClosed: boolean;
  closeDuration: number;
  handleClose: () => void;
  sheetClassName: string;
  backdropClassName: string;
  direction: "left" | "right" | "bottom" | "top";
};

type ModalProviderProps = {
  defaultCanDismiss?: boolean;
  defaultOpenDuration?: number;
  defaultCloseDuration?: number;
  defaultSheetClassName?: string;
  defaultBackdropClassName?: string;
}