import DrawerBase from "../../drawer";
import { useModalPro } from "../../../lib";
import { ProSheetModalProps } from "../../types";
import { Fragment, Ref, useEffect, useRef } from "react";

const ProSheet = ({ TriggerElement, direction, children, ...props }: ProSheetModalProps) => {

    const drawerRef = useRef<HTMLDivElement>(null)

    const { handleOpenModal, handleCloseModal, currentModalKey, ...modalProps } = useModalPro({
        ...props,
        sheetRef: drawerRef,
        sidebarDirection: direction
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
            <div
                style={{ width: "fit-content" }}
                onClick={handleOpenModal}>
                {TriggerElement}
            </div>
            <DrawerBase
                {...modalProps}
                mode="prosheet"
                direction={direction}
                key={currentModalKey}
                handleClose={handleCloseModal}
                ref={drawerRef}>
                {children}
            </DrawerBase >
        </Fragment>
    )
}

export default ProSheet