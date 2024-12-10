import { useState } from "react"
import Dialog from "./components/dialog"

const TestPage = () => {
    const [open, setOpen] = useState(false)


    return (
        <>
            <button onClick={() => setOpen(true)}>
                open
            </button>
            <Dialog open={open} willBeClosed={false} handleClose={() => setOpen(false)}>
                ThisChildren
            </Dialog>
        </>
    )
}

export default TestPage