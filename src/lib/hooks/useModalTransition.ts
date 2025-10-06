import { useEffect } from "react"
import { UseModalTransitionProps } from "../types"
import { useModals, useRouter } from "../../context"
import { onClose } from "../utils/onClose"

export const useModalTransition = ({ key, closeCb, canDismiss, closeDuration }: UseModalTransitionProps) => {
  const { alreadyPushedLocations, modalStack, updateModalStack } = useRouter()
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
      console.log("opening", key)
    }
    else if (!isAlreadyInState && open && !willBeClosed) {
      setWillBeClosed(key, true)
      console.log("closing", key)
    }
    console.log({ isAlreadyInState, key, open, willBeClosed, modalStack })
  }, [key, modalStack, open, willBeClosed])

  const updateCloseCb = () => closeCbs[key] = closeCb

  console.log("NEW7")

  useEffect(() => {
    onClose({ closeDuration, key, removeModal, thisModal, updateCloseCb, modalStack, updateModalStack })
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
      updateModalStack(clone)
    }
  }

  const handleCloseModal = () => {
    updateModalStack(modalStack.filter((item) => item.key !== key))
  }

  return { ...thisModal, handleOpenModal, handleCloseModal }
}