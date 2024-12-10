import React, { createContext, useContext, useState, ReactNode } from "react";

interface Modal {
    open: boolean;
    willBeClosed: boolean;
    openDuration?: number;
    closeDuration?: number
    sheetClassName?: string;
    backdropClassName?: string
}

interface ModalsContextType {
    modals: Record<string, Modal>;
    setModal: (key: string) => void;
    setOpen: (key: string, open: boolean) => void;
    setWillBeClosed: (key: string, willBeClosed: boolean) => void;
}

const ModalsContext = createContext<ModalsContextType | undefined>(undefined);

interface ModalsProviderProps {
    children: ReactNode;
    openDuration?: number;
    closeDuration?: number
    sheetClassName?: string;
    backdropClassName?: string
}

export const ModalsProvider: React.FC<ModalsProviderProps> = (props) => {

    const { children, openDuration = 300, closeDuration = 200, sheetClassName = "", backdropClassName = "" } = props

    const [modals, setModals] = useState<Record<string, Modal>>({});

    const setModal = (key: string) => {
        setModals((prev) => ({
            ...prev,
            [key]: {
                open: false,
                openDuration,
                closeDuration,
                sheetClassName,
                backdropClassName,
                willBeClosed: false
            },
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

    return (
        <ModalsContext.Provider value={{ modals, setModal, setOpen, setWillBeClosed }}>
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