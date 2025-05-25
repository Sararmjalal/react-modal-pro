import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ModalState {
  activeModals: string[];
}

interface BaseRouterState {
  modals: ModalState;
  [key: string]: any;
}

interface RouterContextType<T = unknown> {
  path: string;
  state: T & BaseRouterState;
  navigate: <K extends BaseRouterState>(to: string, state?: K) => void;
}

const RouterContext = createContext<RouterContextType<any> | null>(null);

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [route, setRoute] = useState(() => ({
    path: window.location.pathname,
    state: {
      modals: {
        activeModals: window.history.state?.modals?.activeModals || [],
        ...window.history.state?.modals
      },
      ...window.history.state
    } as BaseRouterState
  }));

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      console.log({ IN_POPSTATE: event.state })
      setRoute({
        path: window.location.pathname,
        state: {
          modals: {
            activeModals: event.state?.modals?.activeModals || [],
            ...event.state?.modals
          },
          ...event.state
        }
      });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const { pushState, replaceState } = window.history;

    const stateHandler = (method: typeof pushState) =>
      (state: unknown, _: string, url?: string | URL | null) => {
        const path = typeof url === 'string' ? url : url?.pathname || window.location.pathname;
        const newState = {
          modals: {
            activeModals: [],
            ...(state && typeof state === 'object' ? (state as any).modals?.activeModals : []),
            ...(state && typeof state === 'object' ? (state as any).modals : {})
          },
          ...(typeof state === 'object' ? state : {})
        };
        method.call(window.history, newState, "", url);
        setRoute({ path, state: newState });
      };

    window.history.pushState = stateHandler(pushState);
    window.history.replaceState = stateHandler(replaceState);

    return () => {
      window.history.pushState = pushState;
      window.history.replaceState = replaceState;
    };
  }, []);

  const navigate = <T extends BaseRouterState>(to: string, state?: T) => {
    const newState = {
      modals: {
        activeModals: [],
        ...(state?.modals?.activeModals || []),
        ...state?.modals
      },
      ...state
    };
    window.history.pushState(newState, "", to);
    setRoute(prev => ({ path: to, state: newState }));
  };

  return (
    <RouterContext.Provider value={{
      path: route.path,
      state: route.state,
      navigate
    }}>
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter<T = unknown>(): RouterContextType<T> {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }
  return context as RouterContextType<T>;
}

interface RouterProviderProps {
  children: ReactNode;
}