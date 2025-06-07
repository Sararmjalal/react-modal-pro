import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";

interface RouterContextType {
    historyState: Record<string, string>;
    alreadyPushedLocations: Record<string, boolean>
}

const RouterContext = createContext<RouterContextType | null>(null);

interface RouterProviderProps {
    children: ReactNode;
}

let cause = "back"

const alreadyPushedLocations: Record<string, boolean> = {}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
    const [historyState, setHistoryState] = useState({})

    useEffect(() => {
        const originalReplaceState = window.history.replaceState;
        window.history.replaceState = function (...args) {
            originalReplaceState.apply(window.history, args);
            const isSomeModalOpen = window.isSomeModalOpen
            if (isSomeModalOpen && !args[0]?.modalStack) {
                return
            }
            setHistoryState(args[0]);
        };
        const originalPushState = window.history.pushState;
        window.history.pushState = function (...args) {
            originalPushState.apply(window.history, args);
            setHistoryState({})
        };

        const originalGo = window.history.go;
        window.history.go = function (delta: number) {
            if (delta === 1) {
                cause = "forward"
            }
            originalGo.call(window.history, delta);
        };
    }, []);

    useEffect(() => {
        window.historyState = JSON.parse(JSON.stringify(historyState))
    }, [historyState])

    const handlePopStateEvent = (event: PopStateEvent) => {
        const currentState = window.historyState
        const isSomeModalOpen = window.isSomeModalOpen
        if (isSomeModalOpen) {
            if (cause === "back") {
                window.history.go(1)
                const clone = { ...currentState }
                clone.modalStack = []
                window.history.replaceState({ ...clone }, '')
            }
            setTimeout(() => {
                cause = "back"
            }, 0)
        }
        if (!isSomeModalOpen) {
            const currentPath = window.location.pathname;
            if (alreadyPushedLocations[currentPath]) {
                alreadyPushedLocations[currentPath] = false
                setTimeout(() => {
                    window.history.back();
                }, 0);
            }
        }
    };

    const handleBeforeUnloadEvent = () => {
        window.history.replaceState({}, '')
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
        <RouterContext.Provider value={{ historyState, alreadyPushedLocations }}>
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
