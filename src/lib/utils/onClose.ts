import { onCloseProps } from "../types";

export const onClose = ({ thisModal, closeDuration, removeModal, key, updateCloseCb, updateModalStack, modalStack }: onCloseProps) => {
  const { open, willBeClosed, isRecentlyClosed } = thisModal
  updateCloseCb()
  if (open && willBeClosed && !isRecentlyClosed) {
    let timeout;
    if (timeout) timeout = undefined;
    timeout = setTimeout(() => {
      console.log("closing timeout", key)
      removeModal(key)
      updateModalStack(modalStack.filter((item) => item.key !== key))
    }, closeDuration - 50);

  }
}