import { useEffect } from "react";
import { useModals } from "../../context"
import { useRouter } from "./useRouter";

export const useModalController = (modalKey: string) => {

    const { modals, setModal, setWillBeClosed, setOpen, initialModal } = useModals()

    const { path, navigate } = useRouter();

    const thisModal = modals[modalKey] ?? initialModal;

    useEffect(() => {
        if (!modals[modalKey]) setModal(modalKey);
    }, []);

    useEffect(() => {
        const { isAlreadyInHash } = checkHash();
        if (isAlreadyInHash) setOpen(modalKey, true);
    }, [modalKey, path]);

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