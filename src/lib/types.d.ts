
type SwipeDirection = "vertical" | "horizontal";

type UseSwiperProps = {
    direction: SwipeDirection;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    threshold?: number;
    enabled?: boolean
    key?: string
}

type useScrollNearEdgesProps = {
    ref?: React.RefObject<HTMLElement | undefined>,
    offset?: number
}

type useModalTransitionProps = {
    key: string
    confirmCb?: () => void
}