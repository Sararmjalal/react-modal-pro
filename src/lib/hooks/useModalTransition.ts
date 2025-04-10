import { useEffect } from "react";
import { checkHash } from "../utils/checkHash";
import { UseModalTransitionProps } from "../types";
import { useModals, useRouter } from "../../context";
import { useModalRouter } from "./useModalRouter";

export const useModalTransition = ({
  key,
  closeCb,
  canDismiss,
  closeDuration,
  preserveOnRoute = true,
}: UseModalTransitionProps) => {
  const modalKey = `#${key}`;
  const {
    modals,
    setModal,
    setOpen,
    setWillBeClosed,
    removeModal,
    initialModal,
  } = useModals();

  const thisModal = modals[key] ?? initialModal;
  const { willBeClosed, open } = thisModal;

  const { navigate, path, updatePath } = useModalRouter({
    closeDuration,
    preserveOnRoute,
  });

  useEffect(() => {
    if (!modals[key]) setModal(key);
  }, [key, path]);

  useEffect(() => {
    if (open && preserveOnRoute) {
      const { isAlreadyInHash, currentHash } = checkHash(key);
      if (isAlreadyInHash) return;
      navigate(currentHash + modalKey);
      window.history.pushState({ _fake: true }, "", "");
    }
  }, [open, modalKey, preserveOnRoute]);

  useEffect(() => {
    if (willBeClosed) {
      let timeout;
      if (timeout) timeout = undefined;
      timeout = setTimeout(() => {
        if (preserveOnRoute) {
          const { isAlreadyInHash } = checkHash(key);
          if (isAlreadyInHash) window.history.back();
        }
        if (closeCb) closeCb();
        removeModal(key);
        updatePath();
      }, closeDuration - 50);
    }
  }, [key, willBeClosed]);

  const handleOpenModal = () => {
    setOpen(key, true);
  };

  const handleCloseModal = () => {
    if (canDismiss) setWillBeClosed(key, true);
  };

  return { ...thisModal, handleOpenModal, handleCloseModal };
};
