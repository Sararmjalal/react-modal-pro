import { getCurrentPath } from "../lib"
import { ModalStackItem } from "../lib/types"
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"

interface RouterContextType {
  modalStack: ModalStackItem[]
  pushedLocationsCount: Record<string, number>
  alreadyPushedLocations: Record<string, boolean>
  updateModalStack: (newStack: (prevStack: ModalStackItem[]) => ModalStackItem[]) => void
}

const RouterContext = createContext<RouterContextType | null>(null)

interface RouterProviderProps {
  children: ReactNode
}

const pushedLocationsCount: RouterContextType["pushedLocationsCount"] = {}
const alreadyPushedLocations: RouterContextType["alreadyPushedLocations"] = {}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [modalStack, setModalStack] = useState<RouterContextType["modalStack"]>(window.modalStack || [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const originalGo = window.history.go
    const originalPushState = window.history.pushState
    const patchHistory = () => {
      Object.defineProperty(window.history, "go", {
        writable: true,
        configurable: true,
        value: (delta: number) => {
          window.goingForward = delta > 0
          window.isProgrammaticGo = true
          setTimeout(() => {
            window.isProgrammaticGo = false
          }, 50)
          return originalGo.call(window.history, delta)
        }
      })
      Object.defineProperty(window.history, "pushState", {
        writable: true,
        configurable: true,
        value: (...args: any) => {
          const prevPathname = getCurrentPath()
          if (args[2]) {
            const newPathname = new URL(args[2], window.location.origin)?.pathname
            if (prevPathname !== newPathname && alreadyPushedLocations[newPathname]) {
              alreadyPushedLocations[newPathname] = false;
            }
          }
          return originalPushState.apply(window.history, args)
        }
      })
    }
    requestAnimationFrame(() => {
      patchHistory()
    })
  }, [])

  const updateModalStack = (newStack: (prevStack: typeof modalStack) => typeof modalStack) => {
    setModalStack(prev => {
      const updatedStack = newStack(prev)
      window.modalStack = updatedStack
      return updatedStack
    })
  }

  const handlePopStateEvent = () => {
    const isForward = !!window.goingForward
    const isProgrammaticGo = !!window.isProgrammaticGo
    const isRemovingExtraPush = !!window.isRemovingExtraPush

    if (isForward || isProgrammaticGo) {
      requestAnimationFrame(() => {
        window.goingForward = false
      })
      return
    }
    if (isRemovingExtraPush) {
      requestAnimationFrame(() => {
        window.isRemovingExtraPush = false
      })
      return
    }

    const modalStack = window.modalStack || []
    const isSomeModalOpen = !!modalStack[0]
    if (isSomeModalOpen) {
      window.isProgrammaticGo = true
      window.history.go(1)
      const clone = [...modalStack]
      if (clone.length) {
        const lastModal = clone[clone.length - 1]
        if (lastModal.canDismiss) {
          clone.pop()
          updateModalStack(() => clone)
        }
      }
    }
    else {
      updateModalStack(() => [])
      const currentPath = getCurrentPath()
      if (pushedLocationsCount[currentPath] > 0) {
        pushedLocationsCount[currentPath] = pushedLocationsCount[currentPath] - 1
        alreadyPushedLocations[currentPath] = pushedLocationsCount[currentPath] !== 0
        window.isRemovingExtraPush = true
        window.history.back()
      }
    }
  }

  const handleBeforeUnload = () => setModalStack([])

  useEffect(() => {
    window.addEventListener("popstate", handlePopStateEvent)
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("popstate", handlePopStateEvent)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  return (
    <RouterContext.Provider value={{ alreadyPushedLocations, modalStack, updateModalStack, pushedLocationsCount }}>
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
