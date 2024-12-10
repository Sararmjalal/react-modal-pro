"use client"
import { useEffect } from "react"
import { useRouter } from "./useRouter"
import { useModals } from "../../context"


export const useModalTransition = ({ key, confirmCb }: useModalTransitionProps) => {

    const modalKey = `#${key}`

    const { navigate, path } = useRouter()
    const { modals, setModal, setOpen, setWillBeClosed, removeModal, initialModal } = useModals()

    const thisModal = modals[key] ?? initialModal

    const { willBeClosed } = thisModal

    const checkHash = () => {
        const currentHash = window.location.hash
        const isAlreadyInHash = currentHash.split("#").some(item => item === key)
        console.log({ isAlreadyInHash })
        return { isAlreadyInHash, currentHash }
    }

    useEffect(() => {
        if (!modals[key]) setModal(key)
    }, [])

    useEffect(() => {
        const { isAlreadyInHash } = checkHash()
        setOpen(key, isAlreadyInHash)
        console.log("is Already in hash", { isAlreadyInHash, path, open: thisModal.open })
        if (!isAlreadyInHash && willBeClosed) setWillBeClosed(key, false)
    }, [path]);

    useEffect(() => {
        if (willBeClosed) {
            let timeout
            const { isAlreadyInHash } = checkHash()
            console.log({ isAlreadyInHash })
            if (timeout) timeout = undefined
            if (isAlreadyInHash) {
                console.log("hello here")
                timeout = setTimeout(() => {
                    window.history.back()
                    if (confirmCb) confirmCb()
                }, thisModal.closeDuration - 100)
            } else {
                removeModal(key)
            }
        }
    }, [willBeClosed])

    const handleOpenModal = () => {
        const { isAlreadyInHash, currentHash } = checkHash()
        if (isAlreadyInHash) return
        navigate(currentHash + modalKey)
    }

    const handleCloseModal = () => {
        if (thisModal.canDismiss) setWillBeClosed(key, true)
    }

    return { ...thisModal, handleOpenModal, handleCloseModal }
}