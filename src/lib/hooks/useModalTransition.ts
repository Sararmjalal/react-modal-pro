import { useEffect } from "react";
import { onClose } from "../../lib";
import { UseModalTransitionProps } from "../types";
import { useModals, useRouter } from "../../context";

export const useModalTransition = ({ key, closeCb, canDismiss, closeDuration }: UseModalTransitionProps) => {
  const { historyState, prevLocation, updatePrevLocation, currentLocation, thisHistory } = useRouter();
  const { modals, setModal, setOpen, setWillBeClosed, removeModal, initialModal, isInitializing, updateInitializing } = useModals();
  const thisModal = modals[key] ?? initialModal;
  const { willBeClosed, open } = thisModal;

  useEffect(() => {
    if (!modals[key]) setModal(key);
  }, []);

  useEffect(() => {
    const currentState = window.history.state || {};
    const isAlreadyInState = currentState.modalStack ? currentState.modalStack.includes(key) : false
    if (isAlreadyInState && !open) {
      setOpen(key, true)
      setWillBeClosed(key, false)
    }
    else if (!isAlreadyInState && open) {
      if (!willBeClosed) setWillBeClosed(key, true)
    }
  }, [key, historyState, open])

  useEffect(() => {
    onClose({ closeDuration, key, removeModal, thisModal, closeCb })
    return () => {
      onClose({ closeDuration, key, removeModal, thisModal, closeCb })
    }
  }, [willBeClosed]);

  useEffect(() => {
    window.isSomeModalOpen = Object.values(modals).some(item => item.open)
    // if (!window.isSomeModalOpen && !isInitializing) {
    //   window.history.back()
    //   updateInitializing(true)
    // }
  }, [modals])

  // useEffect(() => {
  //   console.log({ prevLocation, currentLocation })
  // }, [prevLocation, currentLocation])

  // const handleOpenModal = () => {
  //   const currentState = window.history.state || {};
  //   if (!currentState.modalStack || (Array.isArray(currentState.modalStack) && !currentState.modalStack[0])) {
  //     if (prevLocation !== currentLocation) {
  //       console.log("pushState is happening")
  //       updatePrevLocation(currentLocation)
  //       window.history.pushState(null, "")
  //       updateInitializing(false)
  //     }
  //     // else window.history.back()
  //   }
  //   let timeout
  //   if (timeout) timeout = undefined
  //   else timeout = setTimeout(() => {
  //     const thisState = window.history.state || {};
  //     console.log("replaceState happening", thisState)
  //     requestAnimationFrame(() => {
  //       window.history.replaceState({ modalStack: thisState.modalStack ? [...thisState.modalStack, key] : [key] }, "");
  //     });
  //   }, 100)
  // }

  const handleOpenModal = () => {
    const currentState = window.history.state || {};
    if (!currentState.modalStack || (Array.isArray(currentState.modalStack) && !currentState.modalStack[0])) {
      const currentPathInHistory = thisHistory.reduce((acc, cur) => cur === window.location.pathname ? acc + 1 : acc, 0)
      console.log({ currentPathInHistory, thisHistory, path: window.location.pathname })
      if (currentPathInHistory < 1) window.history.pushState(null, "")
    }
    let timeout
    if (timeout) timeout = undefined
    else timeout = setTimeout(() => {
      const thisState = window.history.state || {};
      console.log("replaceState happening", thisState)
      requestAnimationFrame(() => {
        window.history.replaceState({ modalStack: thisState.modalStack ? [...thisState.modalStack, key] : [key] }, "");
      });
    }, 100)
  }

  const handleCloseModal = () => {
    if (canDismiss && !willBeClosed) setWillBeClosed(key, true);
  };

  return { ...thisModal, handleOpenModal, handleCloseModal };
};