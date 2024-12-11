import { useEffect, useState } from "react"

export const useScrollNearEdges = ({ ref, offset = 100, key }: useScrollNearEdgesProps) => {

    const [isNearEnd, setIsNearEnd] = useState(false)
    const [isNearStart, setIsNearStart] = useState(true)

    useEffect(() => {
        if (!ref || !ref?.current) return
        const handleScroll = () => {
            const element = ref.current
            if (!element) return
            const { scrollTop, scrollHeight, clientHeight } = element
            const distanceFromStart = scrollTop
            const remainingScroll = scrollHeight - (scrollTop + clientHeight)
            setIsNearStart(distanceFromStart <= offset)
            setIsNearEnd(remainingScroll <= offset)
        }

        const element = ref.current
        element.addEventListener("scroll", handleScroll)

        return () => {
            element.removeEventListener("scroll", handleScroll)
        }
    }, [ref, offset, key])

    return { isNearEnd, isNearStart }
}