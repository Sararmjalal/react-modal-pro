import { useEffect, useState } from "react";

export const useRouter = () => {
    const [path, setPath] = useState(window.location.pathname + window.location.hash);

    const updatePath = () => {
        const newPath = window.location.pathname + window.location.hash;
        console.log('Updating path to:', newPath);
        setPath(newPath);
    };

    useEffect(() => {
        const handlePopState = () => {
            console.log('Popstate detected');
            updatePath();
        };
        window.addEventListener('popstate', handlePopState);
        window.addEventListener('hashchange', updatePath);
        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('hashchange', updatePath);
        };
    }, []);

    const navigate = (to: string) => {
        console.log('Navigating to:', to);
        window.history.pushState({}, '', to);
        updatePath();
    };

    return { path, navigate };
};