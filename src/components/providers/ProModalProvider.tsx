import "../../assets/styles.css"
import { ReactNode, useEffect } from "react"
import { ModalProviderProps } from "../types"
import CloseCbProvider from "./CloseCbProvider"
import { ModalDefaultsProvider, ModalsProvider, RouterProvider } from "../../context"
import { ModalStackItem } from "../../lib/types"

declare global {
  interface Window {
    goingForward?: boolean
    isProgrammaticGo?: boolean
    modalStack: ModalStackItem[]
  }
}

const ProModalProvider = ({ children, ...props }: ModalProviderProps & { children: ReactNode }) => {

  useEffect(() => {
    const portalRoot = document.getElementById("pro-modal-root")
    if (!portalRoot) {
      const thisRoot = document.createElement("div")
      thisRoot.setAttribute("id", "pro-modal-root")
      document.body.append(thisRoot)
    }
  }, [])

  return (
    <ModalDefaultsProvider {...props}>
      <RouterProvider>
        <ModalsProvider>
          <CloseCbProvider>
            {children}
          </CloseCbProvider>
        </ModalsProvider>
      </RouterProvider>
    </ModalDefaultsProvider>
  )
}

export default ProModalProvider