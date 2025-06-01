import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface RouterContextType {
    historyState: Record<string, string>;
    prevLocation: string;
    currentLocation: string;
    updatePrevLocation: (Location: string) => void
    thisHistory: string[]
}

const RouterContext = createContext<RouterContextType | null>(null);

interface RouterProviderProps {
    children: ReactNode;
}

const thisHistory: string[] = [window.location.pathname]

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
    const [historyState, setHistoryState] = useState(window.history.state || {})
    const [prevLocation, setPrevLocation] = useState("")
    const [currentLocation, setCcurrentLocation] = useState("")

    const updatePrevLocation = (location: string) => setPrevLocation(location)

    useEffect(() => {
        const originalPushState = window.history.pushState;
        window.history.pushState = function (...args) {
            setHistoryState(args[0]);
            originalPushState.apply(window.history, args);
            // setCcurrentLocation(window.location.pathname);
            thisHistory.push(window.location.pathname);
        };
        const originalReplaceState = window.history.replaceState;
        window.history.replaceState = function (...args) {
            setHistoryState(args[0]);
            originalReplaceState.apply(window.history, args);
        };
    }, []);


    const handlePopStateEvent = (event: PopStateEvent) => {
        const currentState = event.state || {}
        const isSomeModalOpen = window.isSomeModalOpen
        console.log({ currentStateINPOP: currentState, isSomeModalOpen })
        if (isSomeModalOpen) {
            console.log({ "modalIsOPen": thisHistory })
            const clone = { ...currentState }
            if (Array.isArray(clone.modalStack)) {
                const newStack = clone.modalStack.length > 1 ? clone.modalStack.slice(0, clone.modalStack.length - 1) : []
                clone.modalStack = newStack
            }
            console.log({ clone })
            window.history.replaceState({ ...clone }, '')
            setHistoryState({ ...clone })
            console.log("going forward")
            setTimeout(() => {
                console.log("going forward");
                thisHistory.pop()
                window.history.forward();
                console.log("historuy after forwadrd", thisHistory)
            }, 0);
        }
        else if (!isSomeModalOpen && thisHistory[2]) {
            console.log({ "modal not open": thisHistory })
            console.log({ thisHistory })
            if (thisHistory[thisHistory.length - 2] === thisHistory[thisHistory.length - 1]) {
                thisHistory.pop()
                window.history.back()
            }
        }
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
        <RouterContext.Provider value={{ historyState, prevLocation, currentLocation, updatePrevLocation, thisHistory }}>
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
