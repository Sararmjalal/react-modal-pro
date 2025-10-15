import { useEffect } from "react"
import { useModals, useRouter } from "../../context"

export const useModalUnmount = (modalKey: string) => {
  const { updateModalStack } = useRouter()
  const { removeModal } = useModals()
  useEffect(() => {
    return () => {
      updateModalStack((prev) => {
        if (prev[0]) {
          return prev.filter(item => {
            if (item.key === modalKey) {
              removeModal(modalKey)
              return false
            }
            return true
          })
        }
        return prev
      })
    }
  }, [])
}