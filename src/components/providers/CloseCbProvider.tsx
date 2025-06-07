import "../../assets/styles.css";
import { useModals } from "../../context"
import { ReactNode, useEffect, useRef, useState } from "react"

const isCloseCbCalled: Record<string, boolean> = {}

const CloseCbProvider = ({ children }: { children: ReactNode }) => {

  const { modals, setModal, closeCbs } = useModals();
  const [queue, setQueue] = useState<string[]>([]);
  const isProcessingRef = useRef(false);

  useEffect(() => {
    const removed = Object.entries(modals).filter(([key, value]) => value.isRecentlyClosed);
    if (removed.length > 0) {
      setQueue(prev => [...prev, ...removed.map(([key]) => key)]);
    }
  }, [modals]);

  useEffect(() => {
    if (isProcessingRef.current || queue.length === 0) return;

    isProcessingRef.current = true;

    const processNext = async () => {
      const key = queue[queue.length - 1];
      await setModalAsync(key);
      setQueue(prev => prev.filter(item => item !== key));
      if (!isCloseCbCalled[key]) {
        if (closeCbs[key]) closeCbs[key]()
        isCloseCbCalled[key] = true
      }
      else {
        isCloseCbCalled[key] = false
      }
      isProcessingRef.current = false;
    };

    processNext();
  }, [queue]);

  const setModalAsync = async (key: string) => {
    return new Promise(resolve => {
      setModal(key);
      setTimeout(resolve, 10);
    });
  };

  return children
}

export default CloseCbProvider