import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

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

  const replaceStateHandler = (originalReplaceState: typeof history.replaceState, args: any) => {
    originalReplaceState.apply(window.history, args);
    const isSomeModalOpen = (window as any).isSomeModalOpen;
    if (isSomeModalOpen && !args[0]?.modalStack) return;
    setHistoryState(args[0]);
  }

  const pushStateHandler = (originalPushState: typeof history.pushState, args: any) => {
    originalPushState.apply(window.history, args);
    setHistoryState({});
  }

  const goHandler = (originalGo: typeof history.go, delta: number) => {
    if (delta === 1) cause = 'forward';
    originalGo.call(window.history, delta);
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      const originalGo = window.history.go
      const originalPushState = window.history.pushState
      const originalReplaceState = window.history.replaceState
      const proto = Object.getPrototypeOf(window.history)
      if (proto && typeof proto.replaceState === 'function') {
        window.history.go = function (delta: number) { goHandler(originalGo, delta) }
        window.history.pushState = function (...args) { pushStateHandler(originalPushState, args) }
        window.history.replaceState = function (...args) { replaceStateHandler(originalReplaceState, args) }
      }
      else {
        Object.defineProperty(window.history, "replaceState", {
          writable: true,
          configurable: true,
          value: (...args: any) => replaceStateHandler(originalReplaceState, args)
        })
        Object.defineProperty(window.history, "pushState", {
          writable: true,
          configurable: true,
          value: (...args: any) => pushStateHandler(originalPushState, args)
        })
        Object.defineProperty(window.history, "go", {
          writable: true,
          configurable: true,
          value: (delta: number) => goHandler(originalGo, delta)
        })
      }
    }
  }, []);

  useEffect(() => {
    window.historyState = JSON.parse(JSON.stringify(historyState))
  }, [historyState])

  const handlePopStateEvent = () => {
    const currentState = window.historyState
    const isSomeModalOpen = window.isSomeModalOpen
    if (isSomeModalOpen) {
      if (cause === "back") {
        window.history.go(1)
        const clone = { ...currentState }
        if (clone.modalStack.length) {
          const lastModal = clone.modalStack[clone.modalStack.length - 1]
          if (lastModal.canDismiss) {
            clone.modalStack.pop()
            window.history.replaceState({ ...clone }, '')
          }
        }
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
