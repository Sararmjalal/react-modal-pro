import { useModals, useRouter } from "../../context";

export const useModalController = (key: string) => {

  const { thisHistory } = useRouter();
  const { modals, setWillBeClosed, initialModal, isInitializing, updateInitializing } = useModals();
  const thisModal = modals[key] ?? initialModal

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

  // const handleOpenModal = () => {
  //   const currentState = window.history.state || {};
  //   if (!currentState.modalStack || !currentState.modalStack.includes(key)) {
  //     requestAnimationFrame(() => {
  //       window.history.replaceState({ modalStack: currentState.modalStack ? [...currentState.modalStack, key] : [key] }, "");
  //     });
  //   }
  // }

  const handleCloseModal = () => {
    if (!thisModal.willBeClosed) setWillBeClosed(key, true);
  };

  return { open: thisModal.open, willBeClosed: thisModal.willBeClosed, handleOpenModal, handleCloseModal };
};