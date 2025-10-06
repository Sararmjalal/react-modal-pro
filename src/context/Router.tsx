import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { ModalStackItem } from "../lib/types"

interface RouterContextType {
  alreadyPushedLocations: Record<string, boolean>
  modalStack: ModalStackItem[]
  updateModalStack: (newStack: (prevStack: ModalStackItem[]) => ModalStackItem[]) => void
}

const RouterContext = createContext<RouterContextType | null>(null)

interface RouterProviderProps {
  children: ReactNode
}

const alreadyPushedLocations: Record<string, boolean> = {}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [modalStack, setModalStack] = useState<RouterContextType["modalStack"]>(window.modalStack || [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const originalGo = window.history.go
    const patchHistory = () => {
      Object.defineProperty(window.history, "go", {
        writable: true,
        configurable: true,
        value: (delta: number) => {
          console.log(`history.go called with delta: ${delta}`)
          window.goingForward = delta > 0
          window.isProgrammaticGo = true
          setTimeout(() => {
            window.isProgrammaticGo = false
          }, 50)
          return originalGo.call(window.history, delta)
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
    if (isForward || isProgrammaticGo) {
      window.goingForward = false
      return
    }
    if (!isForward) {
      const modalStack = window.modalStack || []
      const isSomeModalOpen = !!modalStack[0]
      if (isSomeModalOpen) {
        window.history.go(1)
        const clone = [...modalStack]
        if (clone.length) {
          const lastModal = clone[clone.length - 1]
          console.log({ lastModal })
          if (lastModal.canDismiss) {
            clone.pop()
            updateModalStack(() => clone)
          }
        }
      } else {
        updateModalStack(() => [])
        const currentPath = window.location.pathname
        if (alreadyPushedLocations[currentPath]) {
          alreadyPushedLocations[currentPath] = false
          requestAnimationFrame(() => {
            window.history.back()
          })
        }
      }
    } else {
      window.goingForward = false
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
    <RouterContext.Provider value={{ alreadyPushedLocations, modalStack, updateModalStack }}>
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
