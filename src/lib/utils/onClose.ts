import { onCloseProps } from "../types";

export const onClose = ({ thisModal, closeDuration, removeModal, key, updateCloseCb }: onCloseProps) => {
  const { open, willBeClosed, isRecentlyClosed } = thisModal
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
    let timeout2;
    if (timeout2) timeout = undefined;
    timeout2 = setTimeout(() => {
      updateCloseCb()
    }, closeDuration);
  }
}