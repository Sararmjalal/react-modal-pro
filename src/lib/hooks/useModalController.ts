import { useModals } from "../../context";

export const useModalController = (key: string) => {
  const { modals, setWillBeClosed, initialModal, setOpen } = useModals();
  const thisModal = modals[key] ?? initialModal

  const handleOpenModal = () => {
    if (!thisModal.open) setOpen(key, true);
  };

  const handleCloseModal = () => {
    if (!thisModal.willBeClosed) setWillBeClosed(key, true)
  };

  return { open: thisModal.open, willBeClosed: thisModal.willBeClosed, handleOpenModal, handleCloseModal };
};