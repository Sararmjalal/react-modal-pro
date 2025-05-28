import { useEffect } from "react";
import { UseModalTransitionProps } from "../types";
import { useModals, useRouter } from "../../context";

export const useModalTransition = ({ key, closeCb, canDismiss, closeDuration }: UseModalTransitionProps) => {
  const { historyState } = useRouter();
  const { modals, setModal, setOpen, setWillBeClosed, removeModal, initialModal } = useModals();
  const thisModal = modals[key] ?? initialModal;
  const { willBeClosed, open } = thisModal;

  useEffect(() => {
    const currentState = window.history.state || {};
    if (!currentState.modalStack) window.history.pushState(null, "")
  }, [])

  useEffect(() => {
    if (!modals[key]) setModal(key);
  }, [key]);

  useEffect(() => {
    const currentState = window.history.state || {};
    const isAlreadyInState = currentState.modalStack ? currentState.modalStack.includes(key) : false
    if (isAlreadyInState && !open) setOpen(key, true)
    else if (!isAlreadyInState && open) {
      if (!willBeClosed) setWillBeClosed(key, true)
    }
  }, [key, historyState, open])

  useEffect(() => {
    if (open && willBeClosed) {
      const currentState = window.history.state || {};
      const isAlreadyInState = currentState.modalStack ? currentState.modalStack.includes(key) : false
      if (isAlreadyInState) {
        const clone = { ...currentState }
        const newStack = clone.modalStack.filter((item: string) => item !== key)
        clone.modalStack = newStack
        window.history.replaceState({ ...clone }, '')
      }
      let timeout;
      if (timeout) timeout = undefined;
      timeout = setTimeout(() => {
        removeModal(key);
      }, closeDuration - 50);
      if (closeCb) {
        let timeout;
        if (timeout) timeout = undefined;
        timeout = setTimeout(() => closeCb(), closeDuration);
      }
    }
  }, [key, willBeClosed]);

  const handleOpenModal = () => {
    const currentState = window.history.state || {};
    if (!currentState.modalStack || !currentState.modalStack.includes(key)) {
      requestAnimationFrame(() => {
        window.history.replaceState({ modalStack: currentState.modalStack ? [...currentState.modalStack, key] : [key] }, "");
      });
    }
  };

  const handleCloseModal = () => {
    if (canDismiss && !willBeClosed) setWillBeClosed(key, true);
  };

  return { ...thisModal, handleOpenModal, handleCloseModal };
};