
import { ReactNode } from 'react';
import styles from './style.module.css';
import { createPortal } from "react-dom";
import { Fragment } from "react/jsx-runtime";

const DialogBase = (props: DialogProps & { children: ReactNode, ref?: React.Ref<HTMLDivElement | null> }) => {

    const { open, openDuration, willBeClosed, handleClose, closeDuration, children, sheetClassName = "", backdropClassName = "", ref } = props

    const animations = {
        backdrop: {
            "false": `dialog-fade-in ${openDuration}ms`,
            "true": `dialog-fade-out ${closeDuration}ms`
        },
        sheet: {
            "false": `dialog-fade-in ${openDuration}ms`,
            "true": `dialog-fade-out ${closeDuration}ms`
        }
    }

    if (open) return createPortal(
        <Fragment>
            <div
                onClick={handleClose}
                className={`${styles.backdrop} ${backdropClassName}`}
                style={{
                    animation: animations.backdrop[`${willBeClosed}`]
                }}
            />
            <div
                ref={ref}
                className={`${styles.sheet} ${sheetClassName}`}
                style={{
                    animation: animations.sheet[`${willBeClosed}`]
                }}>
                {children}
            </div>
        </Fragment>,
        document.getElementById("modal-root")!
    )
    return null
}

export default DialogBase