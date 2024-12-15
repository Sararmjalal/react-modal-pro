import DialogBase from "../../dialog";
import { useModalPro } from "../../../lib";
import { DialogModalProps } from "../../types";
import { Fragment, Ref, useEffect, useRef } from "react";

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

    return (
        <Fragment>
            <div onClick={handleOpenModal}>
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