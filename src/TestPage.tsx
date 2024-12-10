import Dialog from "./components/dialog";
import Drawer from "./components/drawer";
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
            <Dialog
                {...props}
                handleClose={handleCloseModal}>
                ThisChildren
            </Dialog>
            <Drawer
                handleClose={handleCloseDrawer}
                {...propss}
            >
                <div>drawer children</div>
            </Drawer>
        </>
    )
}

export default TestPage