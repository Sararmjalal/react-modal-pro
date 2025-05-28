import { onCloseProps } from "../types";

export const onClose = ({ thisModal, closeDuration, closeCb, removeModal, key }: onCloseProps) => {
  const { open, willBeClosed } = thisModal
  if (open && willBeClosed) {
    const currentState = window.history.state || {};
    const isAlreadyInState = currentState.modalStack ? currentState.modalStack.includes(key) : false
    if (isAlreadyInState) {
      const clone = { ...currentState }
      const newStack = clone.modalStack.filter((item: string) => item !== key)
      clone.modalStack = newStack
      window.history.replaceState({ ...clone }, '')
    }
    let timeout;
    if (timeout) timeout = undefined;
    timeout = setTimeout(() => {
      removeModal(key);
    }, closeDuration - 50);
    if (closeCb) {
      let timeout;
      if (timeout) timeout = undefined;
      timeout = setTimeout(() => closeCb(), closeDuration);
    }
  }
}