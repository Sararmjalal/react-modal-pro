import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface RouterContextType {
    path: string;
    navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

interface RouterProviderProps {
    children: ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
    const [path, setPath] = useState(window.location.pathname + window.location.hash);

    useEffect(() => {
        const updatePath = () => {
            setPath(window.location.pathname + window.location.hash);
        };
        window.addEventListener("popstate", updatePath);
        window.addEventListener("hashchange", updatePath);

        return () => {
            window.removeEventListener("popstate", updatePath);
            window.removeEventListener("hashchange", updatePath);
        };
    }, []);

    const navigate = (to: string) => {
        window.history.pushState({}, "", to);
        setPath(to);
    };

    return (
        <RouterContext.Provider value={{ path, navigate }}>
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
