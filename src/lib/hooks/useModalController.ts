import { useModals } from "../../context";

export const useModalController = (key: string) => {

  const { modals, setWillBeClosed, initialModal } = useModals();
  const thisModal = modals[key] ?? initialModal

  const handleOpenModal = () => {
    const currentState = window.history.state || {};
    if (!currentState.modalStack || !currentState.modalStack.includes(key)) {
      requestAnimationFrame(() => {
        window.history.replaceState({ modalStack: currentState.modalStack ? [...currentState.modalStack, key] : [key] }, "");
      });
    }
  };

  const handleCloseModal = () => {
    if (!thisModal.willBeClosed) setWillBeClosed(key, true);
  };

  return { open: thisModal.open, willBeClosed: thisModal.willBeClosed, handleOpenModal, handleCloseModal };
};