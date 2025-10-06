import DrawerBase from "../../drawer";
import { Fragment, useRef } from "react";
import { SidebarModalProps } from "../../types";
import { useModalPro, usePreventBgScroll } from "../../../lib";

const Sidebar = ({ direction, closeCb, closeDuration = 300, ...sidebarProps }: SidebarModalProps) => {

  const sheetRef = useRef<HTMLDivElement>(null);

  const { handleOpenModal, handleCloseModal, currentModalKey, ...props } = useModalPro({
    sheetRef,
    closeCb,
    ...sidebarProps,
    sidebarDirection: direction
  });

  usePreventBgScroll(props.open);

  return (
    <Fragment>
      <div
        className="modal_pro_trigger_element"
        onClick={() => handleOpenModal()}>
        {sidebarProps.TriggerElement}
      </div>
      <DrawerBase
        {...props}
        mode="sidebar"
        key={currentModalKey}
        direction={direction}
        closeDuration={closeDuration}
        handleClose={handleCloseModal}
        ref={sheetRef}
      >
        {sidebarProps.children}
      </DrawerBase>
    </Fragment>
  );
};

export default Sidebar;
