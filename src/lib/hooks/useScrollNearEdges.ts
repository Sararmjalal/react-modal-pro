import { useEffect, useState } from "react"
import { UseScrollNearEdgesProps } from "../types"

export const useScrollNearEdges = ({ ref, offset = 100, key }: UseScrollNearEdgesProps) => {

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