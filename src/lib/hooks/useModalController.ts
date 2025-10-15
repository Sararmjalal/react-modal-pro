import { useModals, useRouter } from "../../context";
import { getCurrentPath } from "../utils/getCurrentPath";

export const useModalController = (key: string) => {

  const { modals, initialModal, canDismisses } = useModals();
  const { modalStack, updateModalStack, pushIndex, pushStack } = useRouter();
  const thisModal = modals[key] ?? initialModal
  const canDismiss = canDismisses[key]

  const handleOpenModal = () => {
    if (!modalStack[0]) {
      const isAlreadyPushed = pushStack[pushIndex] === getCurrentPath()
      if (!isAlreadyPushed) window.history.pushState(window.history.state, "")
    }
    if (!modalStack.some((item) => item.key === key))
      updateModalStack((prev) => [...prev, { key, canDismiss }])
  }

  const handleCloseModal = () => {
    updateModalStack((prev) => prev.filter((item) => item.key !== key))
  }

  return { open: thisModal.open, willBeClosed: thisModal.willBeClosed, handleOpenModal, handleCloseModal };
};