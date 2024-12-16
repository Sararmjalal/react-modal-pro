import { useEffect } from "react";
import { useModals, useRouter } from "../../context";
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
    if (!modals[key]) {
      console.log("in use transition - set modal")
      setModal(key)
    };
    console.log("in use transition - set modal")
  }, [key, path]);

  useEffect(() => {
    const { isAlreadyInHash } = checkHash();
    console.log("in use transition - update open", { open: isAlreadyInHash })
    setOpen(key, isAlreadyInHash);
    if (!isAlreadyInHash && willBeClosed) {
      console.log("in use transition - update will be closed to false",)
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
