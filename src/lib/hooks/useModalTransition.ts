import { useEffect } from "react";
import { UseModalTransitionProps } from "../types";
import { useModals, useRouter } from "../../context";

export const useModalTransition = ({ key, closeCb, canDismiss, closeDuration, preserveOnRoute = true }: UseModalTransitionProps) => {
  const { historyState } = useRouter();
  const { modals, setModal, setOpen, setWillBeClosed, removeModal, initialModal } = useModals();
  const thisModal = modals[key] ?? initialModal;
  const { willBeClosed, open } = thisModal;

  useEffect(() => {
    if (!modals[key]) setModal(key, preserveOnRoute);
  }, [key]);

  useEffect(() => {
    const isAlreadyInState = historyState[key]
    if (isAlreadyInState && !open) setOpen(key, true)
    else if (!isAlreadyInState && open) {
      if (!willBeClosed) setWillBeClosed(key, true)
    }
  }, [key, historyState, open])

  useEffect(() => {
    if (willBeClosed) {
      const isAlreadyInState = historyState[key]
      if (isAlreadyInState) {
        if (preserveOnRoute) window.history.back();
        else window.history.replaceState({ ...historyState, [key]: false }, '')
      }
      let timeout;
      if (timeout) timeout = undefined;
      timeout = setTimeout(() => {
        removeModal(key);
        if (closeCb) closeCb();
      }, closeDuration - 50);
      // if (closeCb) {
      //   let timeout
      //   if (timeout) timeout = undefined
      //   timeout = setTimeout(() => closeCb(), closeDuration)
      // }
    }
  }, [key, willBeClosed]);

  const handleOpenModal = () => {
    const isAlreadyInState = historyState[key]
    if (!isAlreadyInState) {
      window.history[preserveOnRoute ? "pushState" : "replaceState"]({ ...historyState, [key]: true }, '')
    }
  };

  const handleCloseModal = () => {
    if (canDismiss && !willBeClosed) setWillBeClosed(key, true);
  };

  return { ...thisModal, handleOpenModal, handleCloseModal };
};