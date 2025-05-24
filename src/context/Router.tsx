import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";

interface RouterContextType {
    path: string;
    navigate: (to: string) => void;
    setPath: React.Dispatch<React.SetStateAction<string>>;
}

const RouterContext = createContext<RouterContextType | null>(null);

interface RouterProviderProps {
    children: ReactNode;
}

const history: any[] = []

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
    const [path, setPath] = useState(window.location.pathname + window.location.hash);

    useEffect(() => {
        const originalPushState = window.history.pushState;
        window.history.pushState = function (...args) {
            history.push({ data: args, from: "pushState" })
            originalPushState.apply(window.history, args);
            const newPath = window.location.pathname + window.location.hash;
            setPath(newPath);
        };
        const originalReplaceState = window.history.replaceState;
        window.history.replaceState = function (...args) {
            history.push({ data: args, from: "replaceState" })
            originalReplaceState.apply(window.history, args);
            const newPath = window.location.pathname + window.location.hash;
            setPath(newPath);
        };
        const originalBack = window.history.back;
        window.history.back = function (...args) {
            history.push({ data: args, from: "back" })
            originalBack.apply(window.history, args)
        }
    }, []);

    const navigate = (to: string) => {
        window.history.pushState({}, "", to);
    };

    const handleEvents = (e: PopStateEvent) => {
        history.push({ data: e, from: "popstate" })
        setPath(window.location.pathname + window.location.hash)
    }

    const handleEvents2 = (e: HashChangeEvent) => {
        history.push({ data: `old: ${e.oldURL}, new: ${e.newURL}`, from: "hashchange" })
        setPath(window.location.pathname + window.location.hash)
    }

    useEffect(() => {
        // window.addEventListener("popstate", handleEvents);
        window.addEventListener("hashchange", handleEvents2);
        // document.addEventListener('click', handleEvents4);
        return () => {
            // window.removeEventListener("popstate", handleEvents);
            window.removeEventListener("hashchange", handleEvents2);
            // document.removeEventListener("click", handleEvents4)
        };
    }, []);



    return (
        <RouterContext.Provider value={{ path, navigate, setPath }}>
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
