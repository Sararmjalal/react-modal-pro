import React, { createContext, useContext, ReactNode } from "react";

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
    defaultCanDismiss?: boolean;
    defaultOpenDuration?: number;
    defaultCloseDuration?: number
    defaultSheetClassName?: string;
    defaultBackdropClassName?: string
}

export const ModalDefaultsProvider: React.FC<ModalDefaultsProviderProps> = (props) => {

    const { children, defaultBackdropClassName, defaultCanDismiss, defaultCloseDuration, defaultOpenDuration, defaultSheetClassName } = props

    const modalDefaults = {
        canDismiss: defaultCanDismiss ?? true,
        openDuration: defaultOpenDuration ?? 400,
        closeDuration: defaultCloseDuration ?? 300,
        sheetClassName: defaultSheetClassName ?? "",
        backdropClassName: defaultBackdropClassName ?? ""
    }

    const { openDuration, closeDuration, sheetClassName, backdropClassName, canDismiss } = modalDefaults

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