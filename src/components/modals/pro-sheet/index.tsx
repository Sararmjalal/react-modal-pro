import DrawerBase from "../../drawer";
import { Fragment, useRef } from "react";
import { ProSheetModalProps } from "../../types";
import { useModalPro, useModalUnmount, usePreventBgScroll } from "../../../lib";

const ProSheet = ({ TriggerElement, direction, children, closeCb, closeDuration = 300, ...props }: ProSheetModalProps) => {

    const drawerRef = useRef<HTMLDivElement>(null)
    const { handleOpenModal, handleCloseModal, currentModalKey, ...modalProps } = useModalPro({
        ...props,
        closeCb,
        sheetRef: drawerRef,
        sidebarDirection: direction
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
            <DrawerBase
                {...modalProps}
                mode="prosheet"
                closeDuration={closeDuration}
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