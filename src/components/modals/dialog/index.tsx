import DialogBase from "../../dialog";
import { DialogModalProps } from "../../types";
import { Fragment, useRef } from "react";
import { useModalPro, useModalUnmount, usePreventBgScroll } from "../../../lib";

const Dialog = ({ TriggerElement, children, ...props }: DialogModalProps) => {

    const dialogRef = useRef<HTMLDivElement>(null)

    const { handleOpenModal, handleCloseModal, currentModalKey, ...modalProps } = useModalPro({
        ...props,
        sheetRef: dialogRef
    })

    useModalUnmount(props.modalKey);
    usePreventBgScroll(modalProps.open);

    return (
        <Fragment>
            <div
                className="modal_pro_trigger_element"
                onClick={handleOpenModal}>
                {TriggerElement}
            </div>
            <DialogBase
                {...modalProps}
                key={currentModalKey}
                handleClose={handleCloseModal}
                ref={dialogRef}>
                {children}
            </DialogBase>
        </Fragment>
    )
}

export default Dialog