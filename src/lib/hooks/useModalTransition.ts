import { useEffect } from "react";
import { useRouter } from "./useRouter";
import { useModals } from "../../context";
import { UseModalTransitionProps } from "../types";

export const useModalTransition = ({ key, closeCb, canDismiss, closeDuration }: UseModalTransitionProps) => {

  const modalKey = `#${key}`;
  const { navigate, path } = useRouter();
  const { modals, setModal, setOpen, setWillBeClosed, removeModal, initialModal } = useModals();

  const thisModal = modals[key] ?? initialModal;

  const { willBeClosed } = thisModal;

  const checkHash = () => {
    const currentHash = window.location.hash;
    const isAlreadyInHash = currentHash.split("#").some((item) => item === key);
    return { isAlreadyInHash, currentHash };
  };

  useEffect(() => {
    if (!modals[key]) setModal(key);
  }, [key]);

  useEffect(() => {
    const { isAlreadyInHash } = checkHash();
    setOpen(key, isAlreadyInHash);
    if (!isAlreadyInHash && willBeClosed) {
      setWillBeClosed(key, false);
    }
  }, [key, path]);

  useEffect(() => {
    if (willBeClosed) {
      let timeout;
      const { isAlreadyInHash } = checkHash();
      if (timeout) timeout = undefined;
      if (isAlreadyInHash) {
        timeout = setTimeout(() => {
          window.history.back();
          if (closeCb) closeCb();
        }, closeDuration - 50);
      } else {
        removeModal(key);
      }
    }
  }, [key, willBeClosed]);

  const handleOpenModal = () => {
    const { isAlreadyInHash, currentHash } = checkHash();
    if (isAlreadyInHash) return;
    navigate(currentHash + modalKey);
  };

  const handleCloseModal = () => {
    if (canDismiss) setWillBeClosed(key, true);
  };

  return { ...thisModal, handleOpenModal, handleCloseModal };
};
