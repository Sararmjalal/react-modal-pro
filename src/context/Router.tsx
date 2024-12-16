import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";

interface RouterContextType {
    path: string;
    navigate: (to: string) => void;
    isPushStateOccured: boolean;
    historyRef: string[]
}

const RouterContext = createContext<RouterContextType | null>(null);

interface RouterProviderProps {
    children: ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
    const [path, setPath] = useState(window.location.pathname + window.location.hash);
    const isPushStateOccured = useRef(false)
    const historyRef = useRef<string[]>([])

    const handleEvents = () => setPath(window.location.pathname + window.location.hash)

    useEffect(() => {
        const originalPushState = window.history.pushState;
        window.history.pushState = function (...args) {
            console.log("push state in going to run")
            isPushStateOccured.current = true
            console.log("AFTER TRUE", { isPushStateOccured })
            originalPushState.apply(window.history, args);
            const newPath = window.location.pathname + window.location.hash;
            historyRef.current = [...historyRef.current, newPath]
            console.log("HISTORY IS UPDATING", { historyRef, newPath })
            setPath(newPath);
        };
    }, []);

    useEffect(() => {
        window.addEventListener("popstate", handleEvents);
        window.addEventListener("hashchange", handleEvents);

        return () => {
            window.removeEventListener("", handleEvents);
            window.removeEventListener("hashchange", handleEvents);
        };
    }, []);

    const navigate = (to: string) => {
        window.history.pushState({}, "", to);
        isPushStateOccured.current = false
        console.log("AFTER FALSE", { isPushStateOccured })
        console.log("push state is updating to false")
    };

    return (
        <RouterContext.Provider value={{ path, navigate, isPushStateOccured: isPushStateOccured.current, historyRef: historyRef.current }}>
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
