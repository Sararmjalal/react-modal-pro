import { useEffect } from "react";
import { checkHash } from "../utils/checkHash";
import { UseModalTransitionProps } from "../types";
import { useModals, useRouter } from "../../context";

export const useModalTransition = ({ key, closeCb, canDismiss, closeDuration, preserveOnRoute = true }: UseModalTransitionProps) => {
  const modalKey = `#${key}`;
  const { navigate, path, setPath } = useRouter();
  const { modals, setModal, setOpen, setWillBeClosed, removeModal, initialModal } = useModals();
  const thisModal = modals[key] ?? initialModal;
  const { willBeClosed, open } = thisModal;

  useEffect(() => {
    if (!modals[key]) setModal(key);
  }, [key, path]);

  useEffect(() => {
    if (open && preserveOnRoute) {
      const { isAlreadyInHash, currentHash } = checkHash(key);
      if (isAlreadyInHash) return;
      navigate(currentHash + modalKey);
    }
  }, [open, preserveOnRoute])

  const handleEvents = () => {
    const storageModals = localStorage.getItem("react-modal-pro-modals")
      && JSON.parse(localStorage.getItem("react-modal-pro-modals")!)
    const { hashesh } = checkHash(key);
    if (window.lastClickedHref) {
      if (hashesh[0] && storageModals) {
        const sum = hashesh.reduce((acc, cur) => (storageModals[cur] ? acc + 1 : acc), 0)
        if (sum) window.history.go(-sum)
      }
      window.lastClickedHref = undefined
    }
    const lastModalKey = localStorage.getItem("react-modal-pro-last-modal")
    if (lastModalKey) setWillBeClosed(lastModalKey, true)
    setPath(window.location.pathname + window.location.hash)
  }

  useEffect(() => {
    window.addEventListener("popstate", handleEvents);
    return () => {
      window.removeEventListener("popstate", handleEvents);
    };
  }, []);

  useEffect(() => {
    if (!modals[key]) setModal(key);
  }, [key]);

  useEffect(() => {
    if (willBeClosed) {
      let timeout;
      if (timeout) timeout = undefined;
      timeout = setTimeout(() => {
        const lastModalKey = localStorage.getItem("react-modal-pro-last-modal")
        if (lastModalKey) removeModal(lastModalKey);
      }, closeDuration - 50);
      if (closeCb) {
        let timeout
        if (timeout) timeout = undefined
        timeout = setTimeout(() => closeCb(), closeDuration)
      }
    }
  }, [key, willBeClosed, path]);

  const handleOpenModal = () => {
    if (!open) setOpen(key, true);
  };

  const handleCloseModal = () => {
    if (canDismiss && !willBeClosed) window.history.back()
  };

  return { ...thisModal, handleOpenModal, handleCloseModal };
};