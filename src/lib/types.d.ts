type SwipeDirection = "vertical" | "horizontal";

type UseSwiperProps = {
  direction: SwipeDirection;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  enabled?: boolean;
  key?: string;
};

type UseScrollNearEdgesProps = {
  ref?: React.RefObject<HTMLElement | undefined>;
  offset?: number;
  key?: string;
};

type UseModalTransitionProps = {
  key: string;
  closeCb?: () => void;
  canDismiss: boolean
  closeDuration: number
};

type DrawerDirection = "left" | "right" | "top" | "bottom"

type ModalControls = {
  modalKey?: string;
  openDuration?: number;
  closeDuration?: number;
  sheetClassName?: string;
  backdropClassName?: string;
}

type UseModalProProps = {
  canDismiss?: boolean;
  swipeToOpen?: boolean;
  swipeToClose?: boolean;
  swipeThreshold?: number;
  closeCb?: () => void;
  sheetRef: React.RefObject<HTMLElement | undefined>;
  sidebarDirection?: DrawerDirection;
} & ModalControls;
