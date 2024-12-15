import styles from "./style.module.css";
import keyframes from '../../assets/keyframes.module.css'
import { createPortal } from "react-dom";
import { DrawerBaseProps } from "../types";
import { Fragment, forwardRef } from "react";

const DrawerBase = forwardRef<HTMLDivElement, DrawerBaseProps>((props, ref) => {

  const { open, openDuration, willBeClosed, handleClose, closeDuration, children, sheetClassName, backdropClassName, direction, mode } = props;

  const directionKeyframes = {
    bottom: {
      open: `${keyframes["slide-bottom-in"]}`,
      close: `${keyframes["slide-bottom-out"]}`,
    },
    top: {
      open: `${keyframes["slide-top-in"]}`,
      close: `${keyframes["slide-top-out"]}`,
    },
    left: {
      open: `${keyframes["slide-left-in"]}`,
      close: `${keyframes["slide-left-out"]}`,
    },
    right: {
      open: `${keyframes["slide-right-in"]}`,
      close: `${keyframes["slide-right-out"]}`,
    },
  };

  const animations = {
    backdrop: {
      false: `${keyframes["dialog-fade-in"]} ${openDuration}ms`,
      true: `${keyframes["dialog-fade-out"]} ${closeDuration}ms`,
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
          className={`${styles.backdrop} ${styles[mode]} ${backdropClassName}`}
          style={{
            animation: animations.backdrop[`${willBeClosed}`],
          }}
        />
        <div
          ref={ref}
          className={`${styles.sheet} ${styles[mode]} ${styles[direction]} ${sheetClassName}`}
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

DrawerBase.displayName = "drawer"
