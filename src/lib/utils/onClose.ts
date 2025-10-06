import { onCloseProps } from "../types";

export const onClose = ({ thisModal, closeDuration, removeModal, key, updateCloseCb, updateModalStack }: onCloseProps) => {
  const { open, willBeClosed } = thisModal
  updateCloseCb()
  if (open && willBeClosed) {
    let timeout;
    if (timeout) timeout = undefined;
    timeout = setTimeout(() => {
      removeModal(key)
      updateModalStack((prev) => prev.filter((item) => item.key !== key))
    }, closeDuration - 50);
  }
}