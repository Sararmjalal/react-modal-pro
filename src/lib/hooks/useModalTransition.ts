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
    onClose({ closeDuration, key, removeModal, modals, closeCb })
    return () => {
      onClose({ closeDuration, key, removeModal, modals, closeCb })
    }
  }, [willBeClosed]);

  useEffect(() => {
    window.isSomeModalOpen = Object.values(modals).some(item => item.open)
  }, [modals])

  useEffect(() => {
    if (isRecentlyClosed) {
      if (closeCb) closeCb()
      setModal(key)
    }
  }, [isRecentlyClosed])


  const handleOpenModal = () => {
    const currentState = window.history.state || {};
    if (!currentState.modalStack || !currentState.modalStack[0]) {
      const currentPath = window.location.pathname
      if (!alreadyPushedLocations[currentPath]) {
        alreadyPushedLocations[currentPath] = true
        window.history.pushState(null, "")
      }
    }
    if (!currentState.modalStack || !currentState.modalStack.includes(key)) {
      let timeout
      if (timeout) timeout = undefined
      else timeout = setTimeout(() => {
        const thisState = window.history.state || {};
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