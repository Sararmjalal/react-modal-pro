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

  const handleEvents = (e: PopStateEvent) => {
    console.log("popstate occured", e)
    const { currentHash } = checkHash(key);
    console.log({ currentHash })
    if (currentHash) {
      const hashesh = currentHash.replace("#", "").split("#")
      const initialModals = localStorage.getItem("react-modal-pro-modals") && JSON.parse(localStorage.getItem("react-modal-pro-modals")!)
      if (initialModals) {
        const sum = hashesh.reduce((acc, cur) => (initialModals[cur] ? acc + 1 : acc), 0)
        console.log("SUMMMM", sum)
        if (sum) window.history.go(-sum)
      }
      console.log({ hashesh, initialModals })
    }
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
      const { isAlreadyInHash } = checkHash(key)
      if (!preserveOnRoute || (preserveOnRoute && isAlreadyInHash)) {
        let timeout;
        if (timeout) timeout = undefined;
        timeout = setTimeout(() => {
          if (preserveOnRoute) {
            if (!window.lastClickedHref) {
              const { isAlreadyInHash } = checkHash(key)
              if (isAlreadyInHash) window.history.back()
            }
            else {
              window.lastClickedHref = undefined
              removeModal(key)
            }
          }
          else removeModal(key);
        }, closeDuration - 50);
        if (closeCb) {
          let timeout
          if (timeout) timeout = undefined
          timeout = setTimeout(() => closeCb(), closeDuration)
        }
      }
    }
  }, [key, willBeClosed, path]);

  const handleOpenModal = () => {
    if (!open) setOpen(key, true);
  };

  const handleCloseModal = () => {
    if (canDismiss && !willBeClosed) setWillBeClosed(key, true);
  };

  return { ...thisModal, handleOpenModal, handleCloseModal };
};