import { ReactNode } from "react"
import { ModalDefaultsProvider, ModalsProvider } from "../../context"

const ModalProvider = ({ children, ...props }: ModalProviderProps & { children: ReactNode }) => {
    return (
        <ModalDefaultsProvider {...props}>
            <ModalsProvider>
                {children}
            </ModalsProvider>
        </ModalDefaultsProvider>
    )
}

export default ModalProvider