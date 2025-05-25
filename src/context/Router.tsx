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

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
    const [path, setPath] = useState(window.location.pathname + window.location.hash);

    useEffect(() => {
        const originalPushState = window.history.pushState;
        window.history.pushState = function (...args) {
            originalPushState.apply(window.history, args);
            const newPath = window.location.pathname + window.location.hash;
            setPath(newPath);
        };
        const originalReplaceState = window.history.replaceState;
        window.history.replaceState = function (...args) {
            originalReplaceState.apply(window.history, args);
            const newPath = window.location.pathname + window.location.hash;
            setPath(newPath);
        };
    }, []);

    const navigate = (to: string) => {
        window.history.pushState({}, "", to);
    };

    const handleEvents2 = (e: HashChangeEvent) => {
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
