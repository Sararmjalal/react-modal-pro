import { useModals, useRouter } from "../../context";

export const useModalController = (key: string) => {
  const { state: routerState } = useRouter();
  const { modals, setWillBeClosed, initialModal, setOpen } = useModals();

  const isActiveInRouter = routerState?.activeModals?.includes(key);
  const thisModal = modals[key] ?? initialModal;

  const handleOpenModal = () => {
    if (!isActiveInRouter) setOpen(key, true);
  };

  const handleCloseModal = () => {
    if (!thisModal.willBeClosed) setWillBeClosed(key, true);
  };

  return {
    open: isActiveInRouter ?? thisModal.open,
    willBeClosed: thisModal.willBeClosed,
    handleOpenModal,
    handleCloseModal
  };
};