import { Ref, useRef } from "react";
import { useModalPro } from "./lib";
import DialogBase from "./components/dialog";
import ProSheet from "./components/modals/pro-sheet";

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
            <ProSheet
                swipeToOpen={false}
                swipeToClose={true}
                direction="bottom"
                TriggerElement={
                    <button>hello sheet</button>
                }>
                <div style={{ height: "200vh" }}>drawer children</div>
            </ProSheet>
        </div>
    )
}

export default TestPage;
