import { useEffect } from "react"
import { useModals, useRouter } from "../../context"

export const useModalUnmount = (modalKey: string) => {
  const { updateModalStack } = useRouter()
  const { modals, removeModal } = useModals()
  useEffect(() => {
    return () => {
      updateModalStack(() => [])
      if (modals[modalKey]?.open || modals[modalKey]?.willBeClosed) removeModal(modalKey)
    }
  }, [])
}