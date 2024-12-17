import DialogBase from "../../dialog";
import { DialogModalProps } from "../../types";
import { Fragment, useEffect, useRef } from "react";
import { useModalPro, useModalUnmount } from "../../../lib";

const Dialog = ({ TriggerElement, children, ...props }: DialogModalProps) => {

    const dialogRef = useRef<HTMLDivElement>(null)

    const { handleOpenModal, handleCloseModal, currentModalKey, ...modalProps } = useModalPro({
        ...props,
        sheetRef: dialogRef
    })

    useEffect(() => {
        if (modalProps.open) {
            document.body.style.overscrollBehavior = "none";
            return () => {
                document.body.style.overscrollBehavior = "initial";
            };
        }
    }, [modalProps.open]);

    useModalUnmount(props.modalKey);

    return (
        <Fragment>
            <div
                style={{ width: "fit-content" }}
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