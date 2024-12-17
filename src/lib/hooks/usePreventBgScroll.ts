import { useEffect } from "react";

export const usePreventBgScroll = (open: boolean) => {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
            document.body.style.overscrollBehavior = "none";
            return () => {
                document.body.style.overflow = "auto";
                document.body.style.overscrollBehavior = "initial";
            };
        }
    }, [open]);
}