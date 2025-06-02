import { useEffect } from "react"
import { onCloseProps } from "../types"
import { useModals } from "../../context"
import { onClose } from "../utils/onClose"

export const useModalUnmount = ({ ...props }: Omit<onCloseProps, "removeModal" | "thisModal">) => {

    const { removeModal, modals } = useModals()
    const thisModal = modals[props.key] ?? { open: false, willBeClosed: false }

    useEffect(() => {
        return () => {
            // console.log("unmount", { key: props.key })
            // onClose({ ...props, removeModal, thisModal })
        }
    }, [])
}