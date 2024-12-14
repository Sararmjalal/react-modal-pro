import { Fragment, ReactNode, Ref } from "react";
import { createPortal } from "react-dom";
import "./drawer.css";
import { DrawerBaseProps } from "../types";

const DrawerBase = (props: DrawerBaseProps & { children: ReactNode, ref?: Ref<HTMLDivElement> }) => {

  const { open, openDuration, willBeClosed, handleClose, closeDuration, children, sheetClassName, backdropClassName, direction, ref } = props;

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
          className={`backdrop ${backdropClassName}`}
          style={{
            animation: animations.backdrop[`${willBeClosed}`],
          }}
        />
        <div
          ref={ref}
          className={`sheet ${sheetClassName} sheet${[direction]}`}
          style={{
            animation: animations.sheet[`${willBeClosed}`]
          }}
        >
          {children}
        </div>
      </Fragment>,
      document.getElementById("modal-root")!
    );
  return null;
};

export default DrawerBase;
