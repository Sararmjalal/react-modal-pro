import { Ref, useRef } from "react";
import DialogBase from "./components/dialog";
import DrawerBase from "./components/drawer";
import { useModalPro } from "./lib";
import { useModalTransition } from "./lib/hooks/useModalTransition";

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
        sidebarDirection: "top",
        sheetClassName: "salam"
    })
    console.log({ open: propss.open })
    return (
        <>
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
                handleClose={handleCloseDrawer}
                {...propss}
            >
                <div>drawer children</div>
            </DrawerBase>
        </>
    )
}

export default TestPage