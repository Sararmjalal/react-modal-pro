import DrawerBase from "../../drawer";
import { Fragment, useRef } from "react";
import { SidebarModalProps } from "../../types";
import { useModalPro, useModalUnmount } from "../../../lib";

const Sidebar = ({ direction, ...sidebarProps }: SidebarModalProps) => {

  const sheetRef = useRef<HTMLDivElement>(null);

  const { handleOpenModal, handleCloseModal, currentModalKey, ...props } = useModalPro({
    sheetRef,
    ...sidebarProps,
    sidebarDirection: direction
  });

  useModalUnmount(sidebarProps.modalKey);

  return (
    <Fragment>
      <div
        style={{ width: "fit-content" }}
        onClick={() => handleOpenModal()}>
        {sidebarProps.TriggerElement}
      </div>
      <DrawerBase
        {...props}
        mode="sidebar"
        key={currentModalKey}
        direction={direction}
        handleClose={handleCloseModal}
        ref={sheetRef}
      >
        {sidebarProps.children}
      </DrawerBase>
    </Fragment>
  );
};

export default Sidebar;
