import styles from "./style.module.css";
import { createPortal } from "react-dom";
import { DialogBaseProps } from "../types";
import { Fragment, forwardRef } from "react";
import keyframes from '../../assets/keyframes.module.css'

const DialogBase = forwardRef<HTMLDivElement, DialogBaseProps>((props, ref) => {

  const { open, openDuration, willBeClosed, handleClose, closeDuration, children, sheetClassName = "", backdropClassName = "", headless = false } = props;

  const animations = {
    backdrop: {
      false: `${keyframes["dialog-fade-in"]} ${openDuration}ms`,
      true: `${keyframes["dialog-fade-out"]} ${closeDuration}ms`,
    },
    sheet: {
      false: `${keyframes["dialog-fade-in"]} ${openDuration}ms`,
      true: `${keyframes["dialog-fade-out"]} ${closeDuration}ms`,
    },
  };


  const classNames = {
    sheet: new Map([
      [false, styles.sheet],
      [true, styles.headlessSheet]
    ]),
    backdrop: new Map([
      [false, styles.backdrop],
      [true, styles.headlessBackdrop]
    ])
  };

  if (open)
    return createPortal(
      <Fragment>
        <div
          onClick={handleClose}
          className={`${classNames.backdrop.get(headless)} ${backdropClassName}`}
          style={{
            animation: animations.backdrop[`${willBeClosed}`],
          }}
        />
        <div
          ref={ref}
          className={`${classNames.sheet.get(headless)} ${sheetClassName}`}
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

export default DialogBase;

DialogBase.displayName = "dialog"
