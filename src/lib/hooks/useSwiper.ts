import { useEffect, useRef } from "react";
import { UseSwiperProps } from "../types";

export const useSwiper = ({ direction, onSwipeUp, onSwipeDown, onSwipeLeft,
    onSwipeRight, threshold = 100, enabled = true, key }: UseSwiperProps) => {

    const touchStartRef = useRef<{ x: number; y: number } | null>(null);
    const touchDeltaRef = useRef({ x: 0, y: 0 });

    const handleTouchStart = (e: TouchEvent) => {
        touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        touchDeltaRef.current = { x: 0, y: 0 };
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!touchStartRef.current) return;

        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;

        const diffX = touchEndX - touchStartRef.current.x;
        const diffY = touchEndY - touchStartRef.current.y;

        touchDeltaRef.current = { x: diffX, y: diffY };
    };

    const handleTouchEnd = () => {
        if (!touchStartRef.current) return;

        const { x: diffX, y: diffY } = touchDeltaRef.current;

        const absDiffX = Math.abs(diffX);
        const absDiffY = Math.abs(diffY);

        const swipeFunctions = {
            vertical: () => {
                if (absDiffY > threshold) {
                    if (diffY > 0 && onSwipeDown) {
                        onSwipeDown();
                    } else if (onSwipeUp) {
                        onSwipeUp();
                    }
                }
            },
            horizontal: () => {
                if (absDiffX > threshold) {
                    if (diffX > 0 && onSwipeRight) {
                        onSwipeRight();
                    } else if (onSwipeLeft) {
                        onSwipeLeft();
                    }
                }
            }
        }

        swipeFunctions[direction]()

        touchStartRef.current = null;
        touchDeltaRef.current = { x: 0, y: 0 };
    };

    useEffect(() => {
        if (enabled) {
            window.addEventListener("touchstart", handleTouchStart);
            window.addEventListener("touchmove", handleTouchMove);
            window.addEventListener("touchend", handleTouchEnd);
            return () => {
                window.removeEventListener("touchstart", handleTouchStart);
                window.removeEventListener("touchmove", handleTouchMove);
                window.removeEventListener("touchend", handleTouchEnd);
            };
        }
    }, [enabled, key]);

    return {};
};