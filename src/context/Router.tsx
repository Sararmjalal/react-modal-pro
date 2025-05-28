import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface RouterContextType {
    historyState: Record<string, string>;
}

const RouterContext = createContext<RouterContextType | null>(null);

interface RouterProviderProps {
    children: ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
    const [historyState, setHistoryState] = useState(window.history.state || {})

    useEffect(() => {
        const originalReplaceState = window.history.replaceState;
        window.history.replaceState = function (...args) {
            setHistoryState(args[0]);
            originalReplaceState.apply(window.history, args);
        };
    }, []);

    const handlePopStateEvent = (event: PopStateEvent) => {
        const currentState = event.state || {}
        const isSomeModalOpen = currentState.modalStack ? !!currentState.modalStack[0] : false
        if (isSomeModalOpen) window.history.forward()
        const clone = { ...currentState }
        clone.modalStack.pop()
        window.history.replaceState({ ...clone }, '')
        setHistoryState(event.state)
    }

    const handleBeforeUnloadEvent = () => {
        setHistoryState({})
        window.history.replaceState(null, '')
    }

    useEffect(() => {
        window.addEventListener("popstate", handlePopStateEvent);
        window.addEventListener("beforeunload", handleBeforeUnloadEvent);
        return () => {
            window.removeEventListener("popstate", handlePopStateEvent);
            window.removeEventListener("beforeunload", handleBeforeUnloadEvent);
        };
    }, []);

    return (
        <RouterContext.Provider value={{ historyState }}>
            {children}
        </RouterContext.Provider>
    );
};

export const useRouter = (): RouterContextType => {
    const context = useContext(RouterContext);
    if (!context) {
        throw new Error("useRouter must be used within a RouterProvider");
    }
    return context;
};
