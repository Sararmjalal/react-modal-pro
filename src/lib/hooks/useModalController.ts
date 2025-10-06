import { useModals, useRouter } from "../../context";

export const useModalController = (key: string) => {

  const { modals, initialModal, canDismisses } = useModals();
  const { alreadyPushedLocations, modalStack, updateModalStack } = useRouter();
  const thisModal = modals[key] ?? initialModal
  const canDismiss = canDismisses[key]

  const handleOpenModal = () => {
    if (!modalStack[0]) {
      const currentPath = window.location.pathname
      if (!alreadyPushedLocations[currentPath]) {
        alreadyPushedLocations[currentPath] = true
        window.history.pushState(window.history.state, "")
      }
    }
    if (!modalStack.some((item) => item.key === key)) {
      const clone = modalStack ? [...modalStack, { key, canDismiss }] : [{ key, canDismiss }]
      updateModalStack(clone)
    }
  }

  const handleCloseModal = () => {
    updateModalStack(modalStack.filter((item) => item.key !== key))
  }

  return { open: thisModal.open, willBeClosed: thisModal.willBeClosed, handleOpenModal, handleCloseModal };
};