import DialogBase from "../../dialog";
import { Fragment, useRef } from "react";
import { DialogModalProps } from "../../types";
import { useModalPro, useModalUnmount, usePreventBgScroll } from "../../../lib";

const Dialog = ({ TriggerElement, children, closeDuration = 300, closeCb, ...props }: DialogModalProps) => {

    const dialogRef = useRef<HTMLDivElement>(null)
    const { handleOpenModal, handleCloseModal, currentModalKey, ...modalProps } = useModalPro({
        ...props,
        closeCb,
        closeDuration,
        sheetRef: dialogRef
    })

    usePreventBgScroll(modalProps.open);
    useModalUnmount(currentModalKey);

    return (
        <Fragment>
            <div
                className="modal_pro_trigger_element"
                onClick={handleOpenModal}>
                {TriggerElement}
            </div>
            <DialogBase
                {...modalProps}
                closeDuration={closeDuration}
                key={currentModalKey}
                handleClose={handleCloseModal}
                ref={dialogRef}>
                {children}
            </DialogBase>
        </Fragment>
    )
}

export default Dialog