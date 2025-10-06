import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { ModalStackItem } from "../lib/types"

interface RouterContextType {
  alreadyPushedLocations: Record<string, boolean>
  modalStack: ModalStackItem[]
  updateModalStack: (newStack: ModalStackItem[]) => void
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

  const updateModalStack = (newStack: typeof modalStack) => {
    window.modalStack = newStack
    setModalStack(newStack)
  }

  // const handlePopStateEvent = () => {
  //   const isForward = !!window.goingForward
  //   const isProgrammaticGo = !!window.isProgrammaticGo

  //   console.log({ isForward, isProgrammaticGo })

  //   // If it's programmatic forward navigation (your history.go(1)), don't close modals
  //   if (isForward && isProgrammaticGo) {
  //     console.log('Programmatic history.go(1) detected - not closing modals')
  //     return
  //   }
  //   console.log({ isForward })
  //   if (!isForward) {
  //     const modalStack = window.modalStack
  //     console.log({ modalStack })
  //     const isSomeModalOpen = !!modalStack[0]
  //     if (isSomeModalOpen) {
  //       window.history.go(1)
  //       console.log("after go - going forward value", window.goingForward)
  //       const clone = [...modalStack]
  //       if (clone.length) {
  //         const lastModal = clone[clone.length - 1]
  //         if (lastModal.canDismiss) {
  //           clone.pop()
  //           updateModalStack(clone)
  //         }
  //       }
  //     }
  //     else {
  //       updateModalStack([])
  //       const currentPath = window.location.pathname
  //       if (alreadyPushedLocations[currentPath]) {
  //         alreadyPushedLocations[currentPath] = false
  //         requestAnimationFrame(() => {
  //           window.history.back()
  //         })
  //       }
  //     }
  //   }
  //   else requestAnimationFrame(() => {
  //     window.goingForward = false
  //   })
  // }
  const handlePopStateEvent = () => {
    const isForward = !!window.goingForward
    const isProgrammaticGo = !!window.isProgrammaticGo

    console.log('popstate event:', { isForward, isProgrammaticGo })

    // If it's programmatic forward navigation (your history.go(1)), don't close modals
    if (isForward || isProgrammaticGo) {
      console.log('Programmatic history.go(1) detected - skipping modal logic')
      // Reset the goingForward flag since we handled this programmatic navigation
      window.goingForward = false
      return
    }

    // Handle backward navigation (user back button or programmatic back)
    if (!isForward) {
      const modalStack = window.modalStack || []
      console.log('Backward navigation detected:', { modalStack })
      const isSomeModalOpen = !!modalStack[0]

      if (isSomeModalOpen) {
        // Counter the back navigation with forward navigation
        window.history.go(1) // This will trigger another popstate with isProgrammaticGo=true

        // Close the top modal
        const clone = [...modalStack]
        if (clone.length) {
          const lastModal = clone[clone.length - 1]
          if (lastModal.canDismiss) {
            clone.pop()
            updateModalStack(clone)
          }
        }
      } else {
        // No modals open, handle normal navigation
        updateModalStack([])
        const currentPath = window.location.pathname
        if (alreadyPushedLocations[currentPath]) {
          alreadyPushedLocations[currentPath] = false
          requestAnimationFrame(() => {
            window.history.back()
          })
        }
      }
    } else {
      // Forward navigation that's not programmatic (user forward button)
      console.log('User forward navigation detected')
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
