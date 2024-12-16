import { useRouter } from "./useRouter";
import { useModals } from "../../context";

export const useModalController = (modalKey: string) => {
    const { navigate } = useRouter();
    const { setWillBeClosed } = useModals();

    const checkHash = () => {
        const currentHash = window.location.hash;
        const isAlreadyInHash = currentHash.split("#").some((item) => item === modalKey);
        return { isAlreadyInHash, currentHash };
    };

    const handleOpenModal = () => {
        const { isAlreadyInHash, currentHash } = checkHash();
        if (isAlreadyInHash) return;
        navigate(currentHash + `#${modalKey}`);
        console.log("in modal controller handle open")

    };

    const handleCloseModal = () => {
        setWillBeClosed(modalKey, true);
        console.log("in modal controller handle close")
    };

    console.log("in modal controller", { modalKey })

    return { handleOpenModal, handleCloseModal };
};