import DialogBase from "./components/dialog";
import DrawerBase from "./components/drawer";
import { useModalTransition } from "./lib/hooks/useModalTransition";

const TestPage = () => {

    const { handleOpenModal, handleCloseModal, ...props } = useModalTransition({
        key: "hello"
    })
    const { handleOpenModal: handleOpenDrawer, handleCloseModal: handleCloseDrawer, ...propss } = useModalTransition({
        key: "hello2"
    })
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
                handleClose={handleCloseModal}>
                ThisChildren
            </DialogBase>
            <DrawerBase
                handleClose={handleCloseDrawer}
                {...propss}
            >
                <div>drawer children</div>
            </DrawerBase>
        </>
    )
}

export default TestPage