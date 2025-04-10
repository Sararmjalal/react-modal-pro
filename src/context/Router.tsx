import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from "react";

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
  updatePath: () => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

interface RouterProviderProps {
  children: ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [path, setPath] = useState(
    window.location.pathname + window.location.hash
  );

  const updatePath = () =>
    setPath(window.location.pathname + window.location.hash);

  useEffect(() => {
    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      const newPath = window.location.pathname + window.location.hash;
      setPath(newPath);
    };
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
  };

  return (
    <RouterContext.Provider value={{ path, navigate, updatePath }}>
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
