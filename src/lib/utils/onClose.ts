import { onCloseProps } from "../types";

export const onClose = ({ modals, closeDuration, closeCb, removeModal, key }: onCloseProps) => {
  const { open, willBeClosed, isRecentlyClosed } = modals[key] ?? { open: false, willBeClosed: false }
  if (open && willBeClosed && !isRecentlyClosed) {
    const currentState = window.history.state || {};
    const isAlreadyInState = currentState.modalStack ? currentState.modalStack.includes(key) : false
    if (isAlreadyInState) {
      const clone = { ...currentState }
      const modalIndex = clone.modalStack.findIndex((item: string) => item === key)
      const newStack = clone.modalStack.slice(0, modalIndex)
      clone.modalStack = newStack
      window.history.replaceState({ ...clone }, '')
    }
    let timeout;
    if (timeout) timeout = undefined;
    timeout = setTimeout(() => {
      removeModal(key);
    }, closeDuration - 50);
  }
}