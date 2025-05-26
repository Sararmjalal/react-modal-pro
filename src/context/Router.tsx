import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";

interface RouterContextType {
    path: string;
    navigate: (to: string) => void;
    historyState: Record<string, string>;
}

const RouterContext = createContext<RouterContextType | null>(null);

interface RouterProviderProps {
    children: ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
    const [path, setPath] = useState(window.location.pathname + window.location.hash);
    const [historyState, setHistoryState] = useState(window.history.state || {})

    useEffect(() => {
        console.log({ newHistoryState: historyState })
    }, [historyState])

    useEffect(() => {
        const originalPushState = window.history.pushState;
        window.history.pushState = function (...args) {
            console.log("pushState is happening", ...args)
            originalPushState.apply(window.history, args);
            const newPath = window.location.pathname + window.location.hash;
            setHistoryState(args[0]);
            setPath(newPath);
        };
        const originalReplaceState = window.history.replaceState;
        window.history.replaceState = function (...args) {
            console.log("replaceState is happening", ...args)
            originalReplaceState.apply(window.history, args);
            const newPath = window.location.pathname + window.location.hash;
            setHistoryState(args[0]);
            setPath(newPath);
        };
    }, []);


    const handlePopStateEvent = (event: PopStateEvent) => {
        setHistoryState(event.state)
        setPath(window.location.pathname + window.location.hash)
    }

    const handleBeforeUnloadEvent = () => {
        setHistoryState({})
        setPath(window.location.pathname + window.location.hash)
    }

    useEffect(() => {
        window.addEventListener("popstate", handlePopStateEvent);
        window.addEventListener("beforeunload", handleBeforeUnloadEvent);

        return () => {
            window.removeEventListener("popstate", handlePopStateEvent);
            window.removeEventListener("beforeunload", handleBeforeUnloadEvent);
        };
    }, []);

    const navigate = (to: string) => {
        window.history.pushState({}, "", to);
    };

    return (
        <RouterContext.Provider value={{ path, navigate, historyState }}>
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
