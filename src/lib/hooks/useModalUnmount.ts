import { useEffect } from "react"
import { useModals, useRouter } from "../../context"

export const useModalUnmount = (key: string) => {

  const { removeModal, modals, initialModal } = useModals()
  const { modalStack, updateModalStack } = useRouter()
  const thisModal = modals[key] ?? initialModal

  useEffect(() => {
    return () => {
      console.log("here", key)
      if (thisModal.open || thisModal.willBeClosed) {
        console.log("here2", key)
        removeModal(key);
      }
    }
  }, [])
}