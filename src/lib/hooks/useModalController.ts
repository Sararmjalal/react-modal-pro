import { useEffect } from "react";
import { useRouter } from "./useRouter";
import { useModals } from "../../context";

export const useModalController = (modalKey: string) => {

    const { modals, setModal, setWillBeClosed, initialModal } = useModals()

    const { navigate } = useRouter();

    const thisModal = modals[modalKey] ?? initialModal;

    useEffect(() => {
        if (!modals[modalKey]) setModal(modalKey);
    }, []);

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

    const { open } = thisModal

    return { open, handleOpenModal, handleCloseModal }

}