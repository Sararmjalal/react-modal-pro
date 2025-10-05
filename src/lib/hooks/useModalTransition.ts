import { useEffect } from "react"
import { onClose } from "../../lib"
import { UseModalTransitionProps } from "../types"
import { useModals, useRouter } from "../../context"

export const useModalTransition = ({ key, closeCb, canDismiss, closeDuration }: UseModalTransitionProps) => {
  const { alreadyPushedLocations, modalStack, setModalStack } = useRouter()
  const { modals, setModal, setOpen, setWillBeClosed, removeModal, initialModal, closeCbs } = useModals()
  const thisModal = modals[key] ?? initialModal
  const { willBeClosed, open } = thisModal

  useEffect(() => {
    if (!modals[key]) setModal(key, canDismiss)
  }, [])

  useEffect(() => {
    const isAlreadyInState = modalStack ? modalStack.some((item) => item.key === key) : false
    if (isAlreadyInState && !open) {
      setOpen(key, true)
      setWillBeClosed(key, false)
    }
    else if (!isAlreadyInState && open) {
      if (!willBeClosed) setWillBeClosed(key, true)
    }
  }, [key, modalStack, open])

  const updateCloseCb = () => {
    closeCbs[key] = closeCb
  }

  useEffect(() => {
    onClose({ closeDuration, key, removeModal, thisModal, updateCloseCb })
    return () => {
      onClose({ closeDuration, key, removeModal, thisModal, updateCloseCb })
    }
  }, [willBeClosed])

  const handleOpenModal = () => {
    if (!modalStack[0]) {
      const currentPath = window.location.pathname
      if (!alreadyPushedLocations[currentPath]) {
        alreadyPushedLocations[currentPath] = true
        window.history.pushState(window.history.state, "")
      }
    }
    if (!modalStack.some((item) => item.key === key)) {
      const clone = modalStack ? [...modalStack, { key, canDismiss }] : [{ key, canDismiss }]
      window.modalStack = clone
      setModalStack(clone)
    }
  }

  const handleCloseModal = () => window.history.back()

  return { ...thisModal, handleOpenModal, handleCloseModal }
}