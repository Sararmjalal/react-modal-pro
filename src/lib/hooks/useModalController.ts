import { useModals } from "../../context";

export const useModalController = (key: string) => {
  const { modals, setWillBeClosed, initialModal, setOpen } = useModals();
  const modalKey = key.replaceAll(" ", "");
  const thisModal = modals[key] ?? initialModal

  const handleOpenModal = () => {
    if (!thisModal.open) setOpen(modalKey, true)
  };

  const handleCloseModal = () => {
    if (!thisModal.willBeClosed) setWillBeClosed(modalKey, true);
  };

  return { open: thisModal.open, willBeClosed: thisModal.willBeClosed, handleOpenModal, handleCloseModal };
};