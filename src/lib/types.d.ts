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

type useScrollNearEdgesProps = {
  ref?: React.RefObject<HTMLElement | undefined>;
  offset?: number;
  key?: string;
};

type useModalTransitionProps = {
  key: string;
  closeCb?: () => void;
  canDismiss: boolean
  closeDuration: number
};
