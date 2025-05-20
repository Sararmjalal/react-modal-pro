export const checkHash = (modalKey: string, path?: string) => {
    const currentHash = path ?? window.location.hash;
    const isAlreadyInHash = currentHash.split("#").some((item) => item === modalKey);
    return { isAlreadyInHash, currentHash };
};