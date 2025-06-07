import { useEffect } from "react"
import { onCloseProps } from "../types"
import { useModals } from "../../context"
import { onClose } from "../utils/onClose"

export const useModalUnmount = (key: string) => {

    const { removeModal, modals, initialModal } = useModals()
    const thisModal = modals[key] ?? initialModal

    useEffect(() => {
        return () => {
            if (thisModal.open || thisModal.willBeClosed) {
                removeModal(key);
                const currentState = window.history.state || {};
                const isAlreadyInState = currentState.modalStack ? currentState.modalStack.includes(key) : false
                if (isAlreadyInState) {
                    const clone = { ...currentState }
                    const modalIndex = clone.modalStack.findIndex((item: string) => item === key)
                    const newStack = clone.modalStack.slice(0, modalIndex)
                    clone.modalStack = newStack
                    window.history.replaceState({ ...clone }, '')
                }
            }
        }
    }, [])
}