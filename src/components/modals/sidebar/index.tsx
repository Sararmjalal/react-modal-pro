import DrawerBase from "../../drawer";
import { useModalPro } from "../../../lib";
import { Fragment, Ref, useRef } from "react";
import { SidebarModalProps } from "../../types";

const Sidebar = ({ direction, ...sidebarProps }: SidebarModalProps) => {

  const sheetRef = useRef<HTMLDivElement>(null);

  const { handleOpenModal, handleCloseModal, currentModalKey, ...props } = useModalPro({
    sheetRef,
    ...sidebarProps,
    sidebarDirection: direction
  });

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
