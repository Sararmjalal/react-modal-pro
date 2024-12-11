"use client";
import { useEffect } from "react";
import { useRouter } from "./useRouter";
import { useModals } from "../../context";

export const useModalTransition = ({
  key,
  closeCb,
}: useModalTransitionProps) => {
  const modalKey = `#${key}`;

  const { navigate, path } = useRouter();
  const {
    modals,
    setModal,
    setOpen,
    setWillBeClosed,
    removeModal,
    initialModal,
  } = useModals();

  const thisModal = modals[key] ?? initialModal;

  const { willBeClosed } = thisModal;

  const checkHash = () => {
    const currentHash = window.location.hash;
    const isAlreadyInHash = currentHash.split("#").some((item) => item === key);
    return { isAlreadyInHash, currentHash };
  };

  useEffect(() => {
    if (!modals[key]) setModal(key);
  }, []);

  useEffect(() => {
    if (thisModal.open) {
      document.body.style.overscrollBehavior = "none";
      return () => {
        document.body.style.overscrollBehavior = "initial";
      };
    }
  }, [thisModal.open]);

  useEffect(() => {
    const { isAlreadyInHash } = checkHash();
    setOpen(key, isAlreadyInHash);
    if (!isAlreadyInHash && willBeClosed) setWillBeClosed(key, false);
  }, [path]);

  useEffect(() => {
    if (willBeClosed) {
      let timeout;
      const { isAlreadyInHash } = checkHash();
      console.log({ isAlreadyInHash });
      if (timeout) timeout = undefined;
      if (isAlreadyInHash) {
        timeout = setTimeout(() => {
          window.history.back();
          if (closeCb) closeCb();
        }, thisModal.closeDuration - 50);
      } else {
        removeModal(key);
      }
    }
  }, [willBeClosed]);

  const handleOpenModal = () => {
    const { isAlreadyInHash, currentHash } = checkHash();
    if (isAlreadyInHash) return;
    navigate(currentHash + modalKey);
  };

  const handleCloseModal = () => {
    if (thisModal.canDismiss) setWillBeClosed(key, true);
  };

  return { ...thisModal, handleOpenModal, handleCloseModal };
};
