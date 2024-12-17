import { useEffect } from "react";
import { checkHash } from "../utils/checkHash";
import { UseModalTransitionProps } from "../types";
import { useModals, useRouter } from "../../context";

export const useModalTransition = ({ key, closeCb, canDismiss, closeDuration }: UseModalTransitionProps) => {
  const modalKey = `#${key}`;
  const { navigate, path } = useRouter();
  const { modals, setModal, setOpen, setWillBeClosed, removeModal, initialModal } = useModals();

  const thisModal = modals[key] ?? initialModal;
  const { willBeClosed } = thisModal;

  useEffect(() => {
    if (!modals[key]) setModal(key);
  }, [key, path]);

  useEffect(() => {
    const { isAlreadyInHash } = checkHash(key);
    setOpen(key, isAlreadyInHash);
    if (!isAlreadyInHash && willBeClosed) {
      setWillBeClosed(key, false);
    }
  }, [key, path]);

  useEffect(() => {
    if (willBeClosed) {
      let timeout;
      if (timeout) timeout = undefined;
      timeout = setTimeout(() => {
        const { isAlreadyInHash } = checkHash(key)
        if (isAlreadyInHash) window.history.back();
        else removeModal(key);
        if (closeCb) closeCb();
      }, closeDuration - 50);
    }
  }, [key, willBeClosed]);

  const handleOpenModal = () => {
    const { isAlreadyInHash, currentHash } = checkHash(key);
    if (isAlreadyInHash) return;
    navigate(currentHash + modalKey);
  };

  const handleCloseModal = () => {
    if (canDismiss) setWillBeClosed(key, true);
  };

  return { ...thisModal, handleOpenModal, handleCloseModal };
};