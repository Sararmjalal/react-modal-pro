import { ReactNode } from "react"
import { ModalDefaultsProvider, ModalsProvider } from "../../context"
import { ModalProviderProps } from "../types"

const ProModalProvider = ({ children, ...props }: ModalProviderProps & { children: ReactNode }) => {
    return (
        <ModalDefaultsProvider {...props}>
            <ModalsProvider>
                {children}
                <div id="pro-modal-root" />
            </ModalsProvider>
        </ModalDefaultsProvider>
    )
}

export default ProModalProvider