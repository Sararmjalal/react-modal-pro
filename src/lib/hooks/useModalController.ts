import { useModals, useRouter } from "../../context";

export const useModalController = (key: string) => {

  const { alreadyPushedLocations } = useRouter();
  const { modals, setWillBeClosed, initialModal } = useModals();
  const thisModal = modals[key] ?? initialModal

  const handleOpenModal = () => {
    const currentState = window.history.state || {};
    if (!currentState.modalStack || !currentState.modalStack[0]) {
      const currentPath = window.location.pathname
      if (!alreadyPushedLocations[currentPath]) {
        alreadyPushedLocations[currentPath] = true
        window.history.pushState(null, "")
      }
    }
    if (!currentState.modalStack || !currentState.modalStack.includes(key)) {
      let timeout
      if (timeout) timeout = undefined
      else timeout = setTimeout(() => {
        const thisState = window.history.state || {};
        requestAnimationFrame(() => {
          window.history.replaceState({ modalStack: thisState.modalStack ? [...thisState.modalStack, key] : [key] }, "");
        });
      }, 10)
    }
  }

  const handleCloseModal = () => {
    if (!thisModal.willBeClosed) setWillBeClosed(key, true);
  };

  return { open: thisModal.open, willBeClosed: thisModal.willBeClosed, handleOpenModal, handleCloseModal };
};