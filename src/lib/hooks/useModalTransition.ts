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
  console.log({ key, preserveOnRoute, thisModal })
  useEffect(() => {
    if (open && willBeClosed) {
      const currentState = window.history.state || {};
      const isAlreadyInState = currentState[key]
      if (isAlreadyInState) {
        console.log({ isAlreadyInState })
        if (preserveOnRoute) {
          console.log("in if - going back")
          window.history.back();
        }
        else {
          console.log("in else - replaceState")
          const clone = { ...currentState }
          delete clone[key]
          window.history.replaceState({ ...clone }, '')
        }
      }
      let timeout;
      if (timeout) timeout = undefined;
      timeout = setTimeout(() => {
        removeModal(key);
      }, closeDuration - 50);
      if (closeCb) {
        let timeout;
        if (timeout) timeout = undefined;
        timeout = setTimeout(() => {
          closeCb()
        }, closeDuration + 100);
      }
    }
  }, [key, willBeClosed]);

  const handleOpenModal = () => {
    console.log("in open modal - first", key)
    const currentState = window.history.state || {};
    console.log({ currentState }, { key }, { ...currentState, [key]: true })
    if (!currentState[key]) {
      window.history[thisModal.preserveOnRoute ? "pushState" : "replaceState"]({ ...currentState, [key]: true }, '');
    }
  };
  const handleCloseModal = () => {
    if (canDismiss && !willBeClosed) setWillBeClosed(key, true);
  };

  return { ...thisModal, handleOpenModal, handleCloseModal };
};