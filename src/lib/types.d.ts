
type SwipeDirection = "vertical" | "horizontal";

type UseSwiperProps = {
    direction: SwipeDirection;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    threshold?: number;
    enabled?: boolean
}

type useScrollNearEdgesProps = {
    ref?: React.RefObject<HTMLElement>,
    offset?: number
}

type useModalTransitionProps = {
    duration?: number
    key: string
    confirmCb?: () => void
    canDismiss?: boolean
}