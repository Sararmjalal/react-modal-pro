import { checkHash } from "../utils/checkHash";
import { useModals, useRouter } from "../../context";

export const useModalController = (key: string) => {
    const { navigate } = useRouter();
    const { modals, setWillBeClosed, initialModal } = useModals();
    const modalKey = key.replaceAll(" ", "");
    const thisModal = modals[key] ?? initialModal

    const handleOpenModal = () => {
        const { isAlreadyInHash, currentHash } = checkHash(modalKey);
        if (isAlreadyInHash) return;
        navigate(currentHash + `#${modalKey}`);
    };

    const handleCloseModal = () => {
        setWillBeClosed(modalKey, true);
    };

    return { open: thisModal.open, willBeClosed: thisModal.willBeClosed, handleOpenModal, handleCloseModal };
};