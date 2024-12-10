import { useEffect, useState } from "react";

export const useRouter = () => {
    const [path, setPath] = useState(window.location.pathname + window.location.hash);

    useEffect(() => {
        const handlePopState = () => {
            setPath(window.location.pathname)
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const navigate = (to: string) => {
        window.history.pushState({}, '', to);
        setPath(to);
    };

    return { path, navigate };
};