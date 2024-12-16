import { useEffect } from "react";
import { checkHash } from "../utils/checkHash";
import { UseModalTransitionProps } from "../types";
import { useModals, useRouter } from "../../context";

export const useModalTransition = ({ key, closeCb, canDismiss, closeDuration }: UseModalTransitionProps) => {
  const modalKey = `#${key}`;
  const { navigate, path, isPushStateOccured, historyRef } = useRouter();
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
  console.log("IN MODAL TRANSITION", key, { historyRef, pathname: window.location.pathname })
  useEffect(() => {
    if (willBeClosed) {
      let timeout;
      const { isAlreadyInHash } = checkHash(key);
      if (timeout) timeout = undefined;
      if (isAlreadyInHash) {
        timeout = setTimeout(() => {
          const { isAlreadyInHash } = checkHash(key)
          if (isAlreadyInHash) {
            window.history.back();
            console.log("GOING BACK - IS IN HASH", { windowHash: window.location.hash, isAlreadyInHash })
          }
          else {
            removeModal(key);
            console.log("BACK DIDNT OCCURE")
          }
          if (closeCb) closeCb();
        }, closeDuration - 50);
      } else {
        removeModal(key);
      }
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