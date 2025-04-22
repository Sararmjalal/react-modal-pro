import { useEffect } from "react";
import { checkHash } from "../utils/checkHash";
import { UseModalTransitionProps } from "../types";
import { useModals, useRouter } from "../../context";

export const useModalTransition = ({ key, closeCb, canDismiss, closeDuration, preserveOnRoute = true }: UseModalTransitionProps) => {
  const modalKey = `#${key}`;
  const { navigate, path } = useRouter();
  const { modals, setModal, setOpen, setWillBeClosed, removeModal, initialModal } = useModals();

  const thisModal = modals[key] ?? initialModal;
  const { willBeClosed, open } = thisModal;

  useEffect(() => {
    if (!modals[key]) setModal(key);
  }, [key, path]);

  useEffect(() => {
    if (preserveOnRoute) {
      const { isAlreadyInHash } = checkHash(key);
      if (!isAlreadyInHash) {
        setOpen(key, false);
        setWillBeClosed(key, false);
      }
    }
  }, [key, path]);

  useEffect(() => {
    return () => {
      removeModal(key)
    }
  }, [])

  useEffect(() => {
    if (open && preserveOnRoute) {
      const { isAlreadyInHash, currentHash } = checkHash(key);
      if (isAlreadyInHash) return;
      navigate(currentHash + modalKey);
    }
  }, [open, preserveOnRoute])

  useEffect(() => {
    if (willBeClosed) {
      let timeout;
      if (timeout) timeout = undefined;
      timeout = setTimeout(() => {
        if (preserveOnRoute) {
          const { isAlreadyInHash } = checkHash(key)
          if (isAlreadyInHash) window.history.back();
        }
        else removeModal(key);
        if (closeCb) closeCb();
      }, closeDuration - 50);
    }
  }, [key, willBeClosed]);

  const handleOpenModal = () => {
    if (!open) setOpen(key, true);
  };

  const handleCloseModal = () => {
    if (canDismiss && !willBeClosed) setWillBeClosed(key, true);
  };

  return { ...thisModal, handleOpenModal, handleCloseModal };
};