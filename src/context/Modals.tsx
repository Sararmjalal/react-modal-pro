import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface Modal {
  open: boolean;
  willBeClosed: boolean;
  isRecentlyClosed: boolean;
}

interface ModalsContextType {
  initialModal: Modal;
  modals: Record<string, Modal>;
  removeModal: (key: string) => void;
  setOpen: (key: string, open: boolean) => void;
  closeCbs: Record<string, (() => void) | undefined>
  canDismisses: Record<string, boolean | undefined>
  setModal: (key: string, canDismiss?: boolean) => void;
  setWillBeClosed: (key: string, willBeClosed: boolean) => void;
}

const ModalsContext = createContext<ModalsContextType | undefined>(undefined);

interface ModalsProviderProps {
  children: ReactNode;
}

const closeCbs: ModalsContextType["closeCbs"] = {}
const canDismisses: ModalsContextType["canDismisses"] = {}

export const ModalsProvider: React.FC<ModalsProviderProps> = ({ children }) => {

  const initialModal = JSON.parse(JSON.stringify({
    open: false, willBeClosed: false, isRecentlyClosed: false, canDismiss: true
  }))

  const [modals, setModals] = useState<Record<string, Modal>>({});

  const setModal = (key: string, canDismiss?: boolean) => {
    canDismisses[key] = typeof (canDismiss) !== "undefined" ? canDismiss : true
    setModals((prev) => ({
      ...prev,
      [key]: { ...initialModal },
    }));
  };

  const setOpen = (key: string, open: boolean) => {
    setModals((prev) => ({
      ...prev,
      [key]: { ...prev[key], open },
    }));
  };

  const setWillBeClosed = (key: string, willBeClosed: boolean) => {
    setModals((prev) => ({
      ...prev,
      [key]: { ...prev[key], willBeClosed },
    }));
  };

  const removeModal = (key: string) => {
    setModals((prev) => {
      const newModals = { ...prev };
      if (newModals[key]) {
        newModals[key] = { ...initialModal, isRecentlyClosed: true }
      }
      return newModals;
    });
  };

  return (
    <ModalsContext.Provider value={{ modals, setModal, setOpen, setWillBeClosed, removeModal, initialModal, closeCbs, canDismisses }}>
      {children}
    </ModalsContext.Provider>
  );
};

export const useModals = (): ModalsContextType => {
  const context = useContext(ModalsContext);
  if (!context) {
    throw new Error("useModals must be used within a ModalsProvider");
  }
  return context;
};