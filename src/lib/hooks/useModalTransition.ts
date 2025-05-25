import { useEffect, useMemo } from "react";
import { UseModalTransitionProps } from "../types";
import { useModals, useRouter } from "../../context";

export const useModalTransition = ({
  key,
  closeCb,
  canDismiss,
  closeDuration,
  preserveOnRoute = true
}: UseModalTransitionProps) => {
  const { navigate, path, state: routerState } = useRouter();
  const { modals, setModal, setOpen, setWillBeClosed, removeModal, initialModal } = useModals();

  const thisModal = modals[key] ?? initialModal;
  const { willBeClosed, open } = thisModal;

  const isModalActive = useMemo(
    () => routerState?.activeModals?.includes(key),
    [routerState, key]
  );

  // Initialize modal entry if not exists
  useEffect(() => {
    if (!modals[key]) setModal(key);
  }, [key, modals, setModal]);

  // Sync with router state changes
  useEffect(() => {
    if (preserveOnRoute) {
      const shouldBeOpen = isModalActive ?? false;
      if (open !== shouldBeOpen) {
        setOpen(key, shouldBeOpen);
      }
    }
  }, [isModalActive, preserveOnRoute, key, open, setOpen]);

  // Handle opening through state
  useEffect(() => {
    if (open && preserveOnRoute && !isModalActive) {
      navigate(path, {
        ...routerState,
        activeModals: [...(routerState?.activeModals || []), key]
      });
    }
  }, [open, preserveOnRoute, isModalActive, navigate, path, routerState, key]);

  // Handle closing animation and state cleanup
  useEffect(() => {
    if (willBeClosed) {
      const timeout = setTimeout(() => {
        if (preserveOnRoute && isModalActive) {
          navigate(path, {
            ...routerState,
            activeModals: (routerState?.activeModals || []).filter((k: string) => k !== key)
          });
        }
        removeModal(key);
        closeCb?.();
      }, closeDuration - 50);

      if (preserveOnRoute) {
        let timeout
        if (timeout) {
          timeout = undefined
        } else {
          timeout = setTimeout(() => {
            window.history.go(-2)
          }, closeDuration + 2000);
        }
      }

      return () => clearTimeout(timeout);
    }
  }, [willBeClosed, preserveOnRoute, isModalActive, navigate, path, routerState, key, closeDuration, closeCb, removeModal]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (!preserveOnRoute) {
        removeModal(key);
        if (isModalActive) {
          navigate(path, {
            ...routerState,
            activeModals: (routerState?.activeModals || []).filter((k: string) => k !== key)
          });
        }
      }
    };
  }, [key, preserveOnRoute, isModalActive, navigate, path, routerState, removeModal]);

  const handleOpenModal = () => {
    if (!open && canDismiss) setOpen(key, true);
  };

  const handleCloseModal = () => {
    if (canDismiss && !willBeClosed) {
      if (preserveOnRoute) return window.history.back()
      setWillBeClosed(key, true)
    };
  };

  return {
    open: preserveOnRoute ? isModalActive ?? open : open,
    willBeClosed,
    handleOpenModal,
    handleCloseModal
  };
};