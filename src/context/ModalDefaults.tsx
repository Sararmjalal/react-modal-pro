import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalDefaultsContextType {
    canDismiss: boolean;
    openDuration: number;
    closeDuration: number
    sheetClassName: string;
    backdropClassName: string
}

const ModalDefaultsContext = createContext<ModalDefaultsContextType | undefined>(undefined);

interface ModalDefaultsProviderProps {
    children: ReactNode;
}

export const ModalDefaultsProvider: React.FC<ModalDefaultsProviderProps> = (props) => {

    const modalDefaults = {
        openDuration: 300,
        closeDuration: 200,
        sheetClassName: "",
        backdropClassName: "",
        canDismiss: false
    }

    const { openDuration, closeDuration, sheetClassName, backdropClassName, canDismiss } = modalDefaults

    const { children } = props

    return (
        <ModalDefaultsContext.Provider value={{ openDuration, closeDuration, sheetClassName, backdropClassName, canDismiss }}>
            {children}
        </ModalDefaultsContext.Provider>
    );
};

export const useModalDefaults = (): ModalDefaultsContextType => {
    const context = useContext(ModalDefaultsContext);
    if (!context) {
        throw new Error("useModalDefaults must be used within a ModalDefaultsProvider");
    }
    return context;
};