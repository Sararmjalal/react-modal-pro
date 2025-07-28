import { useModals, useRouter } from "../../context";

export const useModalController = (key: string) => {

  const { alreadyPushedLocations } = useRouter();
  const { modals, setWillBeClosed, initialModal, canDismisses } = useModals();
  const thisModal = modals[key] ?? initialModal
  const canDismiss = canDismisses[key]

  const handleOpenModal = () => {
    const currentState = window.history.state || {};
    if (!currentState.modalStack || !currentState.modalStack[0]) {
      const currentPath = window.location.pathname
      if (!alreadyPushedLocations[currentPath]) {
        alreadyPushedLocations[currentPath] = true
        window.history.pushState(null, "")
      }
    }
    if (!currentState.modalStack || !currentState.modalStack.some((item: { key: string, canDismiss: boolean }) => item.key === key)) {
      let timeout
      if (timeout) timeout = undefined
      else timeout = setTimeout(() => {
        const thisState = window.history.state || {};
        requestAnimationFrame(() => {
          window.history.replaceState({
            modalStack: thisState.modalStack ?
              [...thisState.modalStack, { key, canDismiss }]
              :
              [{ key, canDismiss }]
          }, "");
        });
      }, 10)
    }
  }
  const handleCloseModal = () => {
    if (!thisModal.willBeClosed) setWillBeClosed(key, true);
  };

  return { open: thisModal.open, willBeClosed: thisModal.willBeClosed, handleOpenModal, handleCloseModal };
};