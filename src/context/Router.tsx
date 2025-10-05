import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { ModalStackItem } from "../lib/types"

interface RouterContextType {
  alreadyPushedLocations: Record<string, boolean>
  modalStack: ModalStackItem[]
  setModalStack: React.Dispatch<React.SetStateAction<ModalStackItem[]>>
}

const RouterContext = createContext<RouterContextType | null>(null)

interface RouterProviderProps {
  children: ReactNode
}

const alreadyPushedLocations: Record<string, boolean> = {}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [modalStack, setModalStack] = useState<RouterContextType["modalStack"]>([])

  useEffect(() => {
    if (typeof window === "undefined") return
    const originalGo = window.history.go
    const patchHistory = () => {
      Object.defineProperty(window.history, "go", {
        writable: true,
        configurable: true,
        value: (_delta: number) => {
          window.goingForward = _delta > 0
          originalGo.call(window.history, _delta);
        }
      })
    }
    requestAnimationFrame(() => {
      patchHistory()
    })
  }, [])

  const handlePopStateEvent = () => {
    const isForward = !!window.goingForward
    const modalStack = window.modalStack
    if (!isForward) {
      const isSomeModalOpen = !!modalStack[0]
      if (isSomeModalOpen) {
        window.history.go(1)
        const clone = [...modalStack]
        if (clone.length) {
          const lastModal = clone[clone.length - 1]
          if (lastModal.canDismiss) {
            clone.pop()
            window.modalStack = clone
            setModalStack(clone)
          }
        }
      }
      else {
        const currentPath = window.location.pathname
        if (alreadyPushedLocations[currentPath]) {
          alreadyPushedLocations[currentPath] = false
          requestAnimationFrame(() => {
            window.history.back()
          })
        }
      }
    }
    else requestAnimationFrame(() => {
      window.goingForward = false
    })
  }

  useEffect(() => {
    window.addEventListener("popstate", handlePopStateEvent)
    return () => {
      window.removeEventListener("popstate", handlePopStateEvent)
    }
  }, [])

  return (
    <RouterContext.Provider value={{ alreadyPushedLocations, modalStack, setModalStack }}>
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
