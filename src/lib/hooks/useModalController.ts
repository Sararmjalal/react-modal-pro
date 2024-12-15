import { useModals } from "../../context"
import { useRouter } from "./useRouter";

export const useModalController = (modalKey: string) => {

    const { modals, setWillBeClosed } = useModals()

    const { navigate } = useRouter();

    const checkHash = () => {
        const currentHash = window.location.hash;
        const isAlreadyInHash = currentHash.split("#").some((item) => item === modalKey);
        return { isAlreadyInHash, currentHash };
    };

    const handleOpenModal = () => {
        const { isAlreadyInHash, currentHash } = checkHash();
        if (isAlreadyInHash) return;
        navigate(currentHash + `#${modalKey}`);
    };

    const handleCloseModal = () => {
        setWillBeClosed(modalKey, true);
    };

    const { open } = modals[modalKey]

    return { open, handleOpenModal, handleCloseModal }

}