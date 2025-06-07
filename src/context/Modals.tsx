import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface Modal {
    open: boolean;
    willBeClosed: boolean;
    isRecentlyClosed: boolean;
}

interface ModalsContextType {
    initialModal: Modal;
    modals: Record<string, Modal>;
    setModal: (key: string) => void;
    removeModal: (key: string) => void;
    setOpen: (key: string, open: boolean) => void;
    setWillBeClosed: (key: string, willBeClosed: boolean) => void;
    closeCbs: Record<string, (() => void) | undefined>
}

const ModalsContext = createContext<ModalsContextType | undefined>(undefined);

interface ModalsProviderProps {
    children: ReactNode;
}

const closeCbs: ModalsContextType["closeCbs"] = {}

export const ModalsProvider: React.FC<ModalsProviderProps> = ({ children }) => {

    const initialModal = JSON.parse(JSON.stringify({ open: false, willBeClosed: false, isRecentlyClosed: false }))

    const [modals, setModals] = useState<Record<string, Modal>>({});


    const setModal = (key: string) => {
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
        <ModalsContext.Provider value={{ modals, setModal, setOpen, setWillBeClosed, removeModal, initialModal, closeCbs }}>
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