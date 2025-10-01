import { useEffect, useRef } from "react";

export const usePreventBgScroll = (open: boolean) => {
  const scrollRef = useRef(0)
  useEffect(() => {
    if (open) {
      scrollRef.current = document.body.scrollTop || window.scrollY
      window.scrollTo({ top: scrollRef.current - 56 })
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";
      return () => {
        window.scrollTo({ top: scrollRef.current })
        document.body.style.overflow = "auto";
        document.body.style.overscrollBehavior = "initial";
      };
    }
  }, [open]);
}