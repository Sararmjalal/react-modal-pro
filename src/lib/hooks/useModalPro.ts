import { useSwiper } from "./useSwiper";
import { useModalTransition } from "./useModalTransition";
import { useScrollNearEdges } from "./useScrollNearEdges";
import { useModalDefaults } from "../../context";
import { UseModalProProps } from "../types";

export const useModalPro = (props: UseModalProProps) => {
  const { modalKey, swipeThreshold, swipeToClose = false, swipeToOpen = false, sidebarDirection, backdropClassName,
    sheetClassName, canDismiss, openDuration, closeDuration, sheetRef, closeCb } = props;

  const currentModalKey = modalKey.replaceAll(" ", "");

  const { backdropClassName: defaultBackdropClassName,
    canDismiss: defaultCanDismiss,
    closeDuration: defaultCloseDuration,
    openDuration: defaultOpenDuration,
    sheetClassName: defaultSheetClassName, } = useModalDefaults()

  const { open, willBeClosed, handleOpenModal, handleCloseModal } = useModalTransition({
    key: currentModalKey,
    closeCb,
    canDismiss: canDismiss ?? defaultCanDismiss,
    closeDuration: closeDuration ?? defaultCloseDuration
  });

  const { isNearStart, isNearEnd } = useScrollNearEdges({
    key: currentModalKey,
    ref: open ? sheetRef : undefined,
  });

  const swipeEnabled = swipeToClose
    ? (sidebarDirection === "bottom" && isNearStart) ||
    (sidebarDirection === "top" && isNearEnd) ||
    sidebarDirection === "left" ||
    sidebarDirection === "right"
    : swipeToOpen;

  const swipeDirection =
    sidebarDirection === "left" || sidebarDirection === "right"
      ? "horizontal"
      : "vertical";

  const swipeFunctions = {
    onSwipeUp: () => {
      if (sidebarDirection === "top" && swipeToClose) return handleCloseModal();
      if (sidebarDirection === "bottom" && swipeToOpen)
        return handleOpenModal();
    },
    onSwipeDown: () => {
      if (sidebarDirection === "top" && swipeToOpen) return handleOpenModal();
      if (sidebarDirection === "bottom" && swipeToClose)
        return handleCloseModal();
    },
    onSwipeRight: () => {
      if (sidebarDirection === "left" && swipeToOpen) return handleOpenModal();
      if (sidebarDirection === "right" && swipeToClose)
        return handleCloseModal();
    },
    onSwipeLeft: () => {
      if (sidebarDirection === "right" && swipeToOpen) return handleOpenModal();
      if (sidebarDirection === "left" && swipeToClose)
        return handleCloseModal();
    },
  };

  useSwiper({
    ...swipeFunctions,
    key: currentModalKey,
    enabled: swipeEnabled,
    threshold: swipeThreshold,
    direction: swipeDirection,
  });

  return {
    currentModalKey,
    backdropClassName: backdropClassName ?? defaultBackdropClassName,
    canDismiss: canDismiss ?? defaultCanDismiss,
    closeDuration: closeDuration ?? defaultCloseDuration,
    openDuration: openDuration ?? defaultOpenDuration,
    sheetClassName: sheetClassName ?? defaultSheetClassName,
    handleOpenModal,
    handleCloseModal,
    open,
    willBeClosed,
  };
};
