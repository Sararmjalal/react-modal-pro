import styles from "./style.module.css";
import { createPortal } from "react-dom";
import { DrawerBaseProps } from "../types";
import { Fragment, forwardRef } from "react";

const DrawerBase = forwardRef<HTMLDivElement, DrawerBaseProps>((props, ref) => {

  const { open, openDuration, willBeClosed, handleClose, closeDuration, children, sheetClassName, backdropClassName, direction } = props;

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
          ref={ref}
          className={`${styles.sheet} ${sheetClassName} ${styles[direction]}`}
          style={{
            animation: animations.sheet[`${willBeClosed}`],
          }}
        >
          {children}
        </div>
      </Fragment>,
      document.getElementById("pro-modal-root")!
    );
  return null;
});

export default DrawerBase;
