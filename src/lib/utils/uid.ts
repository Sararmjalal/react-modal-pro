export const uid = (startKey?: string) => startKey ?
    `${startKey}_${Date.now().toString(36) + Math.random().toString(36).substring(2)}`
    :
    `${Date.now().toString(36) + Math.random().toString(36).substring(2)}`