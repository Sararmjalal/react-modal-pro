import { Ref, useRef } from "react";
import { useModalPro } from "./lib";
import DialogBase from "./components/dialog";
import DrawerBase from "./components/drawer";

const TestPage = () => {

    const DialogRef = useRef<HTMLDivElement>(undefined)
    const DrawerRef = useRef<HTMLDivElement>(undefined)

    const { handleOpenModal, handleCloseModal, ...props } = useModalPro({
        modalKey: "hello1",
        sheetRef: DialogRef
    })

    const { handleOpenModal: handleOpenDrawer, handleCloseModal: handleCloseDrawer, currentModalKey, ...propss } = useModalPro({
        sheetRef: DrawerRef,
        swipeToClose: true,
        swipeToOpen: true,
        sidebarDirection: "top"
    })

    return (
        <div style={{
            overscrollBehavior: "none"
        }}>
            <button onClick={handleOpenModal}>
                open
            </button>
            <button onClick={handleOpenDrawer}>
                open drawer
            </button>
            <DialogBase
                {...props}
                ref={DialogRef as Ref<HTMLDivElement | null>}
                handleClose={handleCloseModal}>
                ThisChildren
            </DialogBase>
            <DrawerBase
                key={currentModalKey}
                direction="top"
                ref={DrawerRef as Ref<HTMLDivElement | null>}
                handleClose={handleCloseDrawer}
                {...propss}
            >
                <div style={{ height: "200vh" }}>drawer children</div>
            </DrawerBase >
        </div>
    )
}

export default TestPage;
