import { Fragment, ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./style.module.css";

const Drawer = (props: DrawerProps & { children: ReactNode }) => {
  const {
    open,
    openDuration,
    willBeClosed,
    handleClose,
    closeDuration,
    children,
    sheetClassName,
    backdropClassName,
    direction = "bottom",
  } = props;

  const directionKeyframes = {
    bottom: {
      open: `slide-bottom-in`,
      close: `slide-bottom-out`,
    },
    top: {
      open: `slide-top-in`,
      close: `slide-top-out`,
    },
    left: {
      open: `slide-left-in`,
      close: `slide-left-out`,
    },
    right: {
      open: `slide-right-in`,
      close: `slide-right-out`,
    },
  };

  const animations = {
    backdrop: {
      false: `dialog-fade-in ${openDuration}ms`,
      true: `dialog-fade-out ${closeDuration}ms`,
    },
    sheet: {
      false: `${directionKeyframes[direction].open} ${openDuration}ms`,
      true: `${directionKeyframes[direction].close} ${closeDuration}ms`,
    },
  };

  if (open)
    return createPortal(
      <Fragment>
        <div
          onClick={handleClose}
          className={`${styles.backdrop} ${backdropClassName}`}
          style={{
            animation: animations.backdrop[`${willBeClosed}`],
          }}
        />
        <div
          className={`${styles.sheet} ${sheetClassName} ${styles[direction]}`}
          style={{
            animation: animations.sheet[`${willBeClosed}`],
          }}
        >
          {children}
        </div>
      </Fragment>,
      document.getElementById("modal-root")!
    );
  return null;
};

export default Drawer;
