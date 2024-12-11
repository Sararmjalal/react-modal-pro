import { Fragment, ReactNode, Ref, useRef } from "react";
import { useModalPro } from "../../../lib";
import DrawerBase from "../../drawer";

type Props = {
  modalKey?: string;
  canDismiss?: boolean;
  openDuration?: number;
  swipeToOpen?: boolean;
  closeDuration?: number;
  swipeToClose?: boolean;
  swipeThreshold?: number;
  sheetClassName?: string;
  backdropClassName?: string;
  closeCb?: () => void;
  direction: "left" | "right";
  children: ReactNode;
  TriggerElement: ReactNode;
};

const Sidebar = ({ direction, ...sidebarProps }: Props) => {
  const sheetRef = useRef<HTMLDivElement>(undefined);
  const { handleOpenModal, handleCloseModal, ...props } = useModalPro({
    sheetRef,
    ...sidebarProps,
    sidebarDirection: direction,
  });

  return (
    <Fragment>
      <div style={{ width: "fit-content" }} onClick={() => handleOpenModal()}>
        {sidebarProps.TriggerElement}
      </div>
      <Fragment>
        <DrawerBase
          {...props}
          direction={direction}
          ref={sheetRef as Ref<HTMLDivElement | null>}
          handleClose={handleCloseModal}
        >
          {sidebarProps.children}
        </DrawerBase>
      </Fragment>
    </Fragment>
  );
};

export default Sidebar;
