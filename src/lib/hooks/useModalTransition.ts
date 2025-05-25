import { useEffect } from "react";
import { UseModalTransitionProps } from "../types";
import { useModals, useRouter } from "../../context";

export const useModalTransition = ({ key, closeCb, canDismiss, closeDuration }: UseModalTransitionProps) => {
  const modalKey = `#${key}`;
  const { navigate, path, setPath } = useRouter();
  const { modals, setModal, setOpen, setWillBeClosed, removeModal, initialModal, } = useModals();
  const thisModal = modals[key] ?? initialModal;
  const { willBeClosed, open } = thisModal;

  useEffect(() => {
    if (!modals[key]) setModal(key);
  }, [key]);

  useEffect(() => {
    const state: Record<string, string> = window.history.state || {};
    if (!state[key] && open) {
      console.log("navigating through", { thisModal, modalKey })
      window.history.pushState({ ...state, [key]: true }, "", window.location.pathname)
      console.log({ historyState: state })
    }
    else if (state[key] && !open) {
      console.log("navigating back", { thisModal, modalKey })
      window.history.back()
      console.log({ historyState: state, state: "after back", thisModal, key })
    }
  }, [open, key])

  const handleOpenModal = () => {
    if (!open) setOpen(key, true)
  };

  const handleCloseModal = () => {
    if (canDismiss && !willBeClosed) setWillBeClosed(key, true)
  };

  const handleEvents = () => {
    console.log("in popstate ", key, thisModal)

    setPath(window.location.pathname + window.location.hash)
  }

  useEffect(() => {
    window.addEventListener("popstate", handleEvents);
    return () => {
      window.removeEventListener("popstate", handleEvents);
    };
  }, []);

  useEffect(() => {
    if (willBeClosed) {
      let timeout;
      if (timeout) timeout = undefined;
      timeout = setTimeout(() => {
        removeModal(key);
        console.log("modal is going to be removed", key)
      }, closeDuration - 50);
      if (closeCb) {
        let timeout
        if (timeout) timeout = undefined
        timeout = setTimeout(() => closeCb(), closeDuration)
      }
    }
  }, [willBeClosed]);



  return { ...thisModal, handleOpenModal, handleCloseModal };
};