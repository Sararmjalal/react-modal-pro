import { ReactNode } from "react"

export type DialogProps = {
    open: boolean
    children: ReactNode
    openDuration?: number
    willBeClosed: boolean
    closeDuration?: number
    handleClose: () => void
    sheetClassName?: string
    backdropClassName?: string
}