import { useModals, useRouter } from "../../context";

export const useModalController = (key: string) => {

  const { alreadyPushedLocations } = useRouter();
  const { modals, setWillBeClosed, initialModal } = useModals();
  const thisModal = modals[key] ?? initialModal

  const handleOpenModal = () => {
    const currentState = window.history.state || {};
    if (!currentState.modalStack || !currentState.modalStack[0]) {
      const currentPath = window.location.pathname
      console.log("in push", { currentPath, alreadyPushedLocations })
      if (!alreadyPushedLocations[currentPath]) {
        console.log("in push state")
        alreadyPushedLocations[currentPath] = true
        window.history.pushState(null, "")
      }
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
    if (!thisModal.willBeClosed) setWillBeClosed(key, true);
  };

  return { open: thisModal.open, willBeClosed: thisModal.willBeClosed, handleOpenModal, handleCloseModal };
};