import { useModals } from "../../context"

export const useModalController = (modalKey: string) => {

    const { modals, setWillBeClosed } = useModals()

    const handleCloseModal = () => {
        setWillBeClosed(modalKey, true);
    };

    const { open } = modals[modalKey]

    return { open, handleCloseModal }

}