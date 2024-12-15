import styles from "./style.module.css";
import { createPortal } from "react-dom";
import { DialogBaseProps } from "../types";
import { Fragment, forwardRef } from "react";

const DialogBase = forwardRef<HTMLDivElement, DialogBaseProps>((props, ref) => {

    const { open, openDuration, willBeClosed, handleClose, closeDuration, children, sheetClassName = "", backdropClassName = "" } = props;

    const animations = {
        backdrop: {
            false: `dialog-fade-in ${openDuration}ms`,
            true: `dialog-fade-out ${closeDuration}ms`,
        },
        sheet: {
            false: `dialog-fade-in ${openDuration}ms`,
            true: `dialog-fade-out ${closeDuration}ms`,
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
                    className={`${styles.sheet} ${sheetClassName}`}
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
