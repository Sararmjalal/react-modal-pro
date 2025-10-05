import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"

interface RouterContextType {
  historyState: Record<string, string>
  alreadyPushedLocations: Record<string, boolean>
}

const RouterContext = createContext<RouterContextType | null>(null)

interface RouterProviderProps {
  children: ReactNode
}

let navigationState = {
  isProcessing: false,
  pendingAction: null as 'forward' | 'back' | null,
  isHandlingPathNavigation: false
}

const alreadyPushedLocations: Record<string, boolean> = {}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [historyState, setHistoryState] = useState({})

  const replaceStateHandler = (originalReplaceState: typeof history.replaceState, args: any) => {
    originalReplaceState.apply(window.history, args)
    const isSomeModalOpen = (window as any).isSomeModalOpen
    if (isSomeModalOpen && !args[0]?.modalStack) return
    setHistoryState(args[0])
  }

  const pushStateHandler = (originalPushState: typeof history.pushState, args: any) => {
    originalPushState.apply(window.history, args)
    setHistoryState({})
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    const patchHistory = () => {
      if ((window.history.pushState as any).__patched) return
      const originalPushState = window.history.pushState
      const originalReplaceState = window.history.replaceState

      Object.defineProperty(window.history, "pushState", {
        writable: true,
        configurable: true,
        value: (...args: any) => pushStateHandler(originalPushState, args),
      })
      Object.defineProperty(window.history, "replaceState", {
        writable: true,
        configurable: true,
        value: (...args: any) => replaceStateHandler(originalReplaceState, args),
      })
    }

    requestAnimationFrame(() => {
      patchHistory()
    })

  }, [])

  useEffect(() => {
    window.historyState = JSON.parse(JSON.stringify(historyState))
  }, [historyState])

  const handlePopStateEvent = (event: PopStateEvent) => {
    const currentState = event.state || window.history.state || {}
    const isSomeModalOpen = window.isSomeModalOpen
    if (isSomeModalOpen && !navigationState.isProcessing) {
      navigationState.isProcessing = true
      navigationState.pendingAction = 'back'
      window.history.go(1)
      const clone = { ...currentState }
      if (clone.modalStack?.length) {
        const lastModal = clone.modalStack[clone.modalStack.length - 1]
        if (lastModal.canDismiss) {
          clone.modalStack.pop()
          window.history.replaceState({ ...clone }, '')
        }
      }
      requestAnimationFrame(() => {
        navigationState.isProcessing = false
        navigationState.pendingAction = null
      })
    }
    if (!isSomeModalOpen && !navigationState.isHandlingPathNavigation) {
      const currentPath = window.location.pathname
      if (alreadyPushedLocations[currentPath]) {
        alreadyPushedLocations[currentPath] = false
        navigationState.isHandlingPathNavigation = true
        requestAnimationFrame(() => {
          window.history.back()
          requestAnimationFrame(() => {
            navigationState.isHandlingPathNavigation = false
          })
        })
      }
    }
  }


  const handleBeforeUnloadEvent = () => {
    window.history.replaceState({}, '')
  }

  useEffect(() => {
    window.addEventListener("popstate", handlePopStateEvent)
    window.addEventListener("beforeunload", handleBeforeUnloadEvent)
    return () => {
      window.removeEventListener("popstate", handlePopStateEvent)
      window.removeEventListener("beforeunload", handleBeforeUnloadEvent)
    }
  }, [])

  return (
    <RouterContext.Provider value={{ historyState, alreadyPushedLocations }}>
      {children}
    </RouterContext.Provider>
  )
}

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider")
  }
  return context
}
