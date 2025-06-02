import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";

interface RouterContextType {
    historyState: Record<string, string>;
    alreadyPushedLocations: Record<string, boolean>
}

const RouterContext = createContext<RouterContextType | null>(null);

interface RouterProviderProps {
    children: ReactNode;
}

const thisHistory: string[] = [window.location.pathname]
const alreadyPushedLocations: Record<string, boolean> = {}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
    const [historyState, setHistoryState] = useState(window.history.state || {})

    useEffect(() => {
        const originalPushState = window.history.pushState;
        window.history.pushState = function (...args) {
            originalPushState.apply(window.history, args);
            setHistoryState(args[0]);
            thisHistory.push(window.location.pathname);
        };
        const originalReplaceState = window.history.replaceState;
        window.history.replaceState = function (...args) {
            originalReplaceState.apply(window.history, args);
            setHistoryState(args[0]);
        };
    }, []);

    const handlePopStateEvent = (event: PopStateEvent) => {
        const currentState = event.state || {}
        const isSomeModalOpen = window.isSomeModalOpen
        console.log({ currentStateINPOP: currentState, isSomeModalOpen })
        if (isSomeModalOpen) {
            const clone = { ...currentState }
            if (Array.isArray(clone.modalStack)) {
                const newStack = clone.modalStack.length > 1 ? clone.modalStack.slice(0, clone.modalStack.length - 1) : []
                clone.modalStack = newStack
            }
            console.log({ clone })
            window.history.replaceState({ ...clone }, '')
            setHistoryState({ ...clone })
            setTimeout(() => {
                console.log("going forward");
                window.history.forward();
            }, 0);
        }
        else if (!isSomeModalOpen) {
            const currentPath = window.location.pathname;
            console.log({ currentPath, alreadyPushedLocations })
            if (alreadyPushedLocations[currentPath]) {
                alreadyPushedLocations[currentPath] = false
                setTimeout(() => {
                    console.log("going backward");
                    window.history.back();
                }, 0);
            }
        }
    };

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
