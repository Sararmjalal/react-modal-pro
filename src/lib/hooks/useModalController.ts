import { useModals, useRouter } from "../../context";

export const useModalController = (key: string) => {

  const { modals, setWillBeClosed, initialModal } = useModals();
  const { historyState } = useRouter()
  const thisModal = modals[key] ?? initialModal

  const handleOpenModal = () => {
    const isAlreadyInState = historyState[key]
    if (!isAlreadyInState) {
      window.history[thisModal.preserveOnRoute ? "pushState" : "replaceState"]({ ...historyState, [key]: true }, '', window.location.pathname)
    }
  };

  const handleCloseModal = () => {
    if (!thisModal.willBeClosed) setWillBeClosed(key, true);
  };

  return { open: thisModal.open, willBeClosed: thisModal.willBeClosed, handleOpenModal, handleCloseModal };
};