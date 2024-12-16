import { checkHash } from "../utils/checkHash";
import { useModals, useRouter } from "../../context";

export const useModalController = (key: string) => {
    const { navigate } = useRouter();
    const { setWillBeClosed } = useModals();
    const modalKey = key.replaceAll(" ", "");

    const handleOpenModal = () => {
        const { isAlreadyInHash, currentHash } = checkHash(modalKey);
        if (isAlreadyInHash) return;
        navigate(currentHash + `#${modalKey}`);

    };

    const handleCloseModal = () => {
        setWillBeClosed(modalKey, true);
    };

    return { handleOpenModal, handleCloseModal };
};