import { useEffect } from "react";
import { onClose } from "../../lib";
import { UseModalTransitionProps } from "../types";
import { useModals, useRouter } from "../../context";

export const useModalTransition = ({ key, closeCb, canDismiss, closeDuration }: UseModalTransitionProps) => {
  const { historyState, alreadyPushedLocations } = useRouter();
  const { modals, setModal, setOpen, setWillBeClosed, removeModal, initialModal, closeCbs } = useModals();
  const thisModal = modals[key] ?? initialModal;
  const { willBeClosed, open } = thisModal;

  useEffect(() => {
    if (!modals[key]) setModal(key, canDismiss);
  }, []);

  useEffect(() => {
    const currentState = window.history.state || {};
    const isAlreadyInState = currentState.modalStack ?
      currentState.modalStack.some((item: { key: string, canDismiss: boolean }) => item.key === key)
      :
      false
    if (isAlreadyInState && !open) {
      setOpen(key, true)
      setWillBeClosed(key, false)
    }
    else if (!isAlreadyInState && open) {
      if (!willBeClosed) setWillBeClosed(key, true)
    }
  }, [key, historyState, open])

  const updateCloseCb = () => {
    closeCbs[key] = closeCb
  }

  useEffect(() => {
    onClose({ closeDuration, key, removeModal, thisModal, updateCloseCb })
    return () => {
      onClose({ closeDuration, key, removeModal, thisModal, updateCloseCb })
    }
  }, [willBeClosed]);

  useEffect(() => {
    window.isSomeModalOpen = Object.values(modals).some(item => item.open)
  }, [modals])

  const handleOpenModal = () => {
    const currentState = window.history.state || {};
    if (!currentState.modalStack || !currentState.modalStack[0]) {
      const currentPath = window.location.pathname
      if (!alreadyPushedLocations[currentPath]) {
        alreadyPushedLocations[currentPath] = true
        window.history.pushState(null, "")
      }
    }
    if (!currentState.modalStack || !currentState.modalStack.some((item: { key: string, canDismiss: boolean }) => item.key === key)) {
      let timeout
      if (timeout) timeout = undefined
      else timeout = setTimeout(() => {
        const thisState = window.history.state || {};
        requestAnimationFrame(() => {
          window.history.replaceState({
            modalStack: thisState.modalStack ?
              [...thisState.modalStack, { key, canDismiss }]
              :
              [{ key, canDismiss }]
          }, "");
        });
      }, 10)
    }
  }

  const handleCloseModal = () => {
    if (canDismiss && !willBeClosed) setWillBeClosed(key, true);
  };

  return { ...thisModal, handleOpenModal, handleCloseModal };
};