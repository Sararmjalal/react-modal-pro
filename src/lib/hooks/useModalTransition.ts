import { useEffect } from "react"
import { UseModalTransitionProps } from "../types"
import { useModals, useRouter } from "../../context"
import { onClose } from "../utils/onClose"

export const useModalTransition = ({ key, closeCb, canDismiss, closeDuration }: UseModalTransitionProps) => {
  const { alreadyPushedLocations, modalStack, updateModalStack, pushedLocationsCount } = useRouter()
  const { modals, setModal, setOpen, setWillBeClosed, removeModal, initialModal, closeCbs } = useModals()
  const thisModal = modals[key] ?? initialModal
  const { willBeClosed, open } = thisModal

  useEffect(() => {
    if (!modals[key]) setModal(key, canDismiss)
  }, [])

  useEffect(() => {
    const isAlreadyInState = modalStack.some((item) => item.key === key)
    if (isAlreadyInState && !open) {
      setOpen(key, true)
      setWillBeClosed(key, false)
    }
    else if (!isAlreadyInState && open && !willBeClosed) {
      setWillBeClosed(key, true)
    }
  }, [key, modalStack, open, willBeClosed])
  const updateCloseCb = () => closeCbs[key] = closeCb

  useEffect(() => {
    onClose({ closeDuration, key, removeModal, thisModal, updateCloseCb, updateModalStack, closeCb })
  }, [willBeClosed])

  useEffect(() => {
    if (thisModal.isRecentlyClosed) {
      if (closeCb) closeCb()
      setModal(key, canDismiss)
    }
  }, [thisModal.isRecentlyClosed])

  const handleOpenModal = () => {
    if (!modalStack[0]) {
      const currentPath = window.location.pathname
      if (!alreadyPushedLocations[currentPath]) {
        alreadyPushedLocations[currentPath] = true
        pushedLocationsCount[currentPath] = (pushedLocationsCount[currentPath] || 0) + 1
        window.history.pushState(window.history.state, "")
      }
    }
    if (!modalStack.some((item) => item.key === key))
      updateModalStack((prev) => [...prev, { key, canDismiss }])
  }

  const handleCloseModal = () => {
    if (canDismiss) updateModalStack((prev) => prev.filter((item) => item.key !== key))
  }

  return { ...thisModal, handleOpenModal, handleCloseModal }
}