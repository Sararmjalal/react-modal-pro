import { useEffect } from "react"
import { useRouter } from "../../context"

export const useModalUnmount = (modalKey: string) => {
  const { updateModalStack } = useRouter()
  useEffect(() => {
    return () => {
      updateModalStack((prev) => prev.filter(item => item.key !== modalKey))
    }
  }, [])
}