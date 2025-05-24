export const checkHash = (modalKey: string, path?: string) => {
    const currentHash = path ?? window.location.hash;
    const isAlreadyInHash = currentHash.split("#").some((item) => item === modalKey);
    const hashesh = currentHash.replace("#", "").split("#")
    return { isAlreadyInHash, currentHash, hashesh };
};