import { useModals } from "../../context";

export const useModalController = (key: string) => {

  const { modals, setWillBeClosed, initialModal } = useModals();
  const thisModal = modals[key] ?? initialModal

  const handleOpenModal = () => {
    console.log("in open modal - controller", key)
    const currentState = window.history.state || {};
    console.log({ currentState }, { key }, { ...currentState, [key]: true })
    if (!currentState[key]) {
      requestAnimationFrame(() => {
        window.history.pushState({ ...currentState, [key]: true, __id: crypto.randomUUID() }, "");
      });
    }
  };

  const handleCloseModal = () => {
    if (!thisModal.willBeClosed) setWillBeClosed(key, true);
  };

  return { open: thisModal.open, willBeClosed: thisModal.willBeClosed, handleOpenModal, handleCloseModal };
};