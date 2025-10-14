import DrawerBase from "../../drawer";
import { Fragment, useRef } from "react";
import { ProSheetModalProps } from "../../types";
import { useModalPro, usePreventBgScroll } from "../../../lib";
import { useModalUnmount } from "../../../lib/hooks/useModalUnmount";

const ProSheet = ({ TriggerElement, direction, children, closeCb, closeDuration = 300, ...props }: ProSheetModalProps) => {

  const drawerRef = useRef<HTMLDivElement>(null)
  const { handleOpenModal, handleCloseModal, currentModalKey, ...modalProps } = useModalPro({
    ...props,
    closeCb,
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