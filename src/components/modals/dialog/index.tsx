import DialogBase from "../../dialog";
import { useModalPro } from "../../../lib";
import { Fragment, ReactNode, Ref, useEffect, useRef } from "react";

type DialogProps = {
    modalKey?: string;
    children: ReactNode;
    canDismiss?: boolean;
    closeCb?: () => void;
    openDuration?: number;
    closeDuration?: number;
    sheetClassName?: string;
    TriggerElement: ReactNode;
    backdropClassName?: string;
}

const Dialog = ({ TriggerElement, children, ...props }: DialogProps) => {

    const dialogRef = useRef<HTMLDivElement>(undefined)

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
                ref={dialogRef as Ref<HTMLDivElement | null>}>
                {children}
            </DialogBase>
        </Fragment>
    )
}

export default Dialog