import { uid } from "../utils/uid";
import { useSwiper } from "./useSwiper";
import { useModalTransition } from "./useModalTransition";
import { useScrollNearEdges } from "./useScrollNearEdges";

type useModalProProps = {
  modalKey?: string;
  canDismiss?: boolean;
  openDuration?: number;
  swipeToOpen?: boolean;
  closeDuration?: number;
  swipeToClose?: boolean;
  swipeThreshold?: number;
  sheetClassName?: string;
  backdropClassName?: string;
  closeCb?: () => void;
  sheetRef: React.RefObject<HTMLElement | undefined>;
  sidebarDirection?: "left" | "right" | "top" | "bottom";
};

const initialKey = uid("modal");

export const useModalPro = (props: useModalProProps) => {
  const {
    modalKey,
    swipeThreshold,
    swipeToClose = false,
    swipeToOpen = false,
    sidebarDirection,
    backdropClassName,
    sheetClassName,
    canDismiss,
    openDuration,
    closeDuration,
    sheetRef,
    closeCb,
  } = props;

  const currentModalKey = modalKey ?? initialKey;

  const {
    open,
    willBeClosed,
    handleOpenModal,
    handleCloseModal,
    backdropClassName: defaultBackdropClassName,
    canDismiss: defaultCanDismiss,
    closeDuration: defaultCloseDuration,
    openDuration: defaultOpenDuration,
    sheetClassName: defaultSheetClassName,
  } = useModalTransition({
    key: currentModalKey,
    closeCb,
  });

  const { isNearStart, isNearEnd } = useScrollNearEdges({
    key: currentModalKey,
    ref: open ? sheetRef : undefined,
  });

  const swipeEnabled = swipeToClose
    ? (sidebarDirection === "bottom" && isNearStart) ||
      (sidebarDirection === "bottom" && isNearEnd) ||
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
