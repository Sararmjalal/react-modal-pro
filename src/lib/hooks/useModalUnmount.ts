import { useEffect } from "react"
import { useModals } from "../../context"

export const useModalUnmount = (key: string) => {

  const { removeModal, modals, initialModal } = useModals()
  const thisModal = modals[key] ?? initialModal

  useEffect(() => {
    return () => {
      if (thisModal.open || thisModal.willBeClosed) {
        removeModal(key);
        const currentState = window.history.state || {};
        const isAlreadyInState = currentState.modalStack ?
          currentState.modalStack.some((item: { key: string, canDismiss: boolean }) => item.key === key)
          :
          false
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