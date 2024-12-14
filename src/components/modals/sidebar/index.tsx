import DrawerBase from "../../drawer";
import { useModalPro } from "../../../lib";
import { Fragment, Ref, useRef } from "react";
import { SidebarModalProps } from "../../types";

const Sidebar = ({ direction, ...sidebarProps }: SidebarModalProps) => {

  const sheetRef = useRef<HTMLDivElement>(undefined);

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
        key={currentModalKey}
        direction={direction}
        handleClose={handleCloseModal}
        ref={sheetRef as Ref<HTMLDivElement | null>}
      >
        {sidebarProps.children}
      </DrawerBase>
    </Fragment>
  );
};

export default Sidebar;
