import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { checkHash } from "../lib";

interface Modal {
    open: boolean;
    willBeClosed: boolean;
}

interface ModalsContextType {
    initialModal: Modal;
    modals: Record<string, Modal>;
    setModal: (key: string) => void;
    removeModal: (key: string) => void;
    setOpen: (key: string, open: boolean) => void;
    setWillBeClosed: (key: string, willBeClosed: boolean) => void;
}

const ModalsContext = createContext<ModalsContextType | undefined>(undefined);

interface ModalsProviderProps {
    children: ReactNode;
}

export const ModalsProvider: React.FC<ModalsProviderProps> = ({ children }) => {

    const initialModal = JSON.parse(JSON.stringify({ open: false, willBeClosed: false }))

    const getStorageModal = () => {
        if (localStorage.getItem("react-modal-pro-modals"))
            return JSON.parse(localStorage.getItem("react-modal-pro-modals")!)
        return {}
    }
    const [modals, setModals] = useState<Record<string, Modal>>({});

    const setStorageModal = (newModals: Record<string, Modal | undefined>) => {
        const storageModals = getStorageModal()
        localStorage.setItem("react-modal-pro-modals", JSON.stringify({
            ...storageModals && ({
                ...storageModals
            }),
            ...newModals
        }))
    }

    const setModal = (key: string) => {
        setModals((prev) => ({
            ...prev,
            [key]: initialModal,
        }));
        setStorageModal({ [key]: initialModal })
    };

    const setOpen = (key: string, open: boolean) => {
        setModals((prev) => ({
            ...prev,
            [key]: { ...prev[key], open },
        }));
        setStorageModal({ [key]: { ...modals[key], open } })
        localStorage.setItem("react-modal-pro-last-modal", key)
    };

    const setWillBeClosed = (key: string, willBeClosed: boolean) => {
        setModals((prev) => ({
            ...prev,
            [key]: { ...prev[key], willBeClosed },
        }));
        setStorageModal({ [key]: { ...modals[key], willBeClosed }, })
    };

    const removeModal = (key: string) => {
        const newModals = { ...modals }
        newModals[key] = initialModal
        setModals(newModals);
        const { hashesh } = checkHash(key)
        localStorage.setItem("react-modal-pro-modals", JSON.stringify(newModals))
        localStorage.setItem("react-modal-pro-last-modal", hashesh[0] ? hashesh[hashesh.length - 1] : "")
    };

    return (
        <ModalsContext.Provider value={{ modals, setModal, setOpen, setWillBeClosed, removeModal, initialModal }}>
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