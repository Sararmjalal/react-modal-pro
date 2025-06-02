import { useEffect } from "react";
import { onClose } from "../../lib";
import { UseModalTransitionProps } from "../types";
import { useModals, useRouter } from "../../context";

export const useModalTransition = ({ key, closeCb, canDismiss, closeDuration }: UseModalTransitionProps) => {
  const { historyState, alreadyPushedLocations } = useRouter();
  const { modals, setModal, setOpen, setWillBeClosed, removeModal, initialModal } = useModals();
  const thisModal = modals[key] ?? initialModal;
  const { willBeClosed, open, isRecentlyClosed } = thisModal;

  useEffect(() => {
    if (!modals[key]) setModal(key);
    console.log("hello")
  }, []);

  useEffect(() => {
    const currentState = window.history.state || {};
    const isAlreadyInState = currentState.modalStack ? currentState.modalStack.includes(key) : false
    if (isAlreadyInState && !open) {
      setOpen(key, true)
      setWillBeClosed(key, false)
    }
    else if (!isAlreadyInState && open) {
      if (!willBeClosed) setWillBeClosed(key, true)
    }
  }, [key, historyState, open])

  useEffect(() => {
    console.log("in mount", key, thisModal)
    onClose({ closeDuration, key, removeModal, modals, closeCb })
    return () => {
      console.log("in unmount", key, thisModal)
      onClose({ closeDuration, key, removeModal, modals, closeCb })
    }
  }, [willBeClosed]);

  useEffect(() => {
    window.isSomeModalOpen = Object.values(modals).some(item => item.open)
  }, [modals])

  useEffect(() => {
    if (isRecentlyClosed) {
      console.log("in recently", key)
      if (closeCb) closeCb()
      setModal(key)
    }
  }, [isRecentlyClosed])

  // 
  // console.log("new vvvv")

  const handleOpenModal = () => {
    // console.log("NEW OPENNNN55555")
    const currentState = window.history.state || {};
    if (!currentState.modalStack || !currentState.modalStack[0]) {
      const currentPath = window.location.pathname
      // console.log("in push", { currentPath, alreadyPushedLocations })
      if (!alreadyPushedLocations[currentPath]) {
        // console.log("in push state")
        alreadyPushedLocations[currentPath] = true
        window.history.pushState(null, "")
      }
    }
    if (!currentState.modalStack || !currentState.modalStack.includes(key)) {
      let timeout
      if (timeout) timeout = undefined
      else timeout = setTimeout(() => {
        const thisState = window.history.state || {};
        // console.log("replaceState happening", thisState)
        requestAnimationFrame(() => {
          window.history.replaceState({ modalStack: thisState.modalStack ? [...thisState.modalStack, key] : [key] }, "");
        });
      }, 10)
    }
  }

  const handleCloseModal = () => {
    if (canDismiss && !willBeClosed) setWillBeClosed(key, true);
  };

  return { ...thisModal, handleOpenModal, handleCloseModal };
};