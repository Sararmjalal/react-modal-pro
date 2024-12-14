import { ReactNode, useEffect } from "react"
import { ModalDefaultsProvider, ModalsProvider } from "../../context"
import { ModalProviderProps } from "../types"
import "../../assets/styles.css";

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
            <ModalsProvider>
                {children}
            </ModalsProvider>
        </ModalDefaultsProvider>
    )
}

export default ProModalProvider