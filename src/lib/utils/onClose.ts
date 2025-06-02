import { onCloseProps } from "../types";

export const onClose = ({ modals, closeDuration, closeCb, removeModal, key }: onCloseProps) => {
  const { open, willBeClosed, isRecentlyClosed } = modals[key] ?? { open: false, willBeClosed: false }
  // console.log("key in close", key)
  if (open && willBeClosed && !isRecentlyClosed) {
    const currentState = window.history.state || {};
    const isAlreadyInState = currentState.modalStack ? currentState.modalStack.includes(key) : false
    if (isAlreadyInState) {
      const clone = { ...currentState }
      const newStack = clone.modalStack.filter((item: string) => item !== key)
      clone.modalStack = newStack
      // console.log("clone in on close", { ...clone })
      window.history.replaceState({ ...clone }, '')
    }
    let timeout;
    if (timeout) timeout = undefined;
    timeout = setTimeout(() => {
      removeModal(key);
    }, closeDuration - 50);
  }
}