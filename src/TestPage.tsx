import { useState } from "react"
import Dialog from "./components/dialog"
import { useModalTransition } from "./lib/hooks/useModalTransition"

const TestPage = () => {

    const { open, handleCloseModal, handleOpenModal, willBeClosed } = useModalTransition({
        key: "hello"
    })

    return (
        <>
            <button onClick={handleOpenModal}>
                open
            </button>
            <Dialog
                open={open}
                willBeClosed={willBeClosed}
                handleClose={handleCloseModal}>
                ThisChildren
            </Dialog>
        </>
    )
}

export default TestPage