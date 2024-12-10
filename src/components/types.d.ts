type DialogProps = {
    open: boolean
    openDuration?: number
    willBeClosed: boolean
    closeDuration?: number
    handleClose: () => void
    sheetClassName?: string
    backdropClassName?: string
}