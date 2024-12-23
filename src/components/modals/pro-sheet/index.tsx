import DrawerBase from "../../drawer";
import { ProSheetModalProps } from "../../types";
import { Fragment, useRef } from "react";
import { useModalPro, useModalUnmount, usePreventBgScroll } from "../../../lib";

const ProSheet = ({ TriggerElement, direction, children, ...props }: ProSheetModalProps) => {

    const drawerRef = useRef<HTMLDivElement>(null)

    const { handleOpenModal, handleCloseModal, currentModalKey, ...modalProps } = useModalPro({
        ...props,
        sheetRef: drawerRef,
        sidebarDirection: direction
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