import { useEffect } from "react"
import { useModals } from "../../context"

export const useModalUnmount = (modalKey: string) => {

    const { removeModal } = useModals()

    useEffect(() => {
        return () => {
            removeModal(modalKey)
        }
    }, [])

}