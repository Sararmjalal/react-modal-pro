import { useModals } from "../../context";

export const useModalController = (key: string) => {
  const { modals, setWillBeClosed, initialModal, setOpen } = useModals();
  const modalKey = key.replaceAll(" ", "");
  const thisModal = modals[key] ?? initialModal

  const handleOpenModal = () => {
    setOpen(modalKey, true)
  };

  const handleCloseModal = () => {
    setWillBeClosed(modalKey, true);
  };

  return { open: thisModal.open, willBeClosed: thisModal.willBeClosed, handleOpenModal, handleCloseModal };
};