import { useState } from "react"
import Dialog from "./components/dialog"
import { useModalTransition } from "./lib/hooks/useModalTransition"

const TestPage = () => {

    const { handleOpenModal, handleCloseModal, ...props } = useModalTransition({
        key: "hello"
    })

    return (
        <>
            <button onClick={handleOpenModal}>
                open
            </button>
            <Dialog
                {...props}
                handleClose={handleCloseModal}>
                ThisChildren
            </Dialog>
        </>
    )
}

export default TestPage