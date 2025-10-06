import { onCloseProps } from "../types";

export const onClose = ({ thisModal, closeDuration, removeModal, key, updateCloseCb, updateModalStack, modalStack }: onCloseProps) => {
  const { open, willBeClosed } = thisModal
  updateCloseCb()
  if (open && willBeClosed) {
    let timeout;
    if (timeout) timeout = undefined;
    timeout = setTimeout(() => {
      removeModal(key)
      updateModalStack(modalStack.filter((item) => item.key !== key))
    }, closeDuration - 50);
  }
}