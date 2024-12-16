export const checkHash = (modalKey: string) => {
    const currentHash = window.location.hash;
    const isAlreadyInHash = currentHash.split("#").some((item) => item === modalKey);
    return { isAlreadyInHash, currentHash };
};