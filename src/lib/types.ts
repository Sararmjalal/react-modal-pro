export type SwipeDirection = "vertical" | "horizontal";

export type UseSwiperProps = {
  direction: SwipeDirection;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  enabled?: boolean;
  key?: string;
};

export type UseScrollNearEdgesProps = {
  ref?: React.RefObject<HTMLElement | undefined>;
  offset?: number;
  key?: string;
};

export type UseModalTransitionProps = {
  key: string;
  closeCb?: () => void;
  canDismiss: boolean
  closeDuration: number
};

export type DrawerDirection = "left" | "right" | "top" | "bottom"

export type ModalControls = {
  modalKey: string;
  openDuration?: number;
  closeDuration?: number;
  sheetClassName?: string;
  backdropClassName?: string;
}

export type UseModalProProps = {
  canDismiss?: boolean;
  swipeToOpen?: boolean;
  swipeToClose?: boolean;
  swipeThreshold?: number;
  closeCb?: () => void;
  sheetRef: React.RefObject<HTMLElement | undefined>;
  sidebarDirection?: DrawerDirection;
} & ModalControls;
