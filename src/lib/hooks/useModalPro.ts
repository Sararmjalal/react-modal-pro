import { uid } from "../utils/uid"
import { useSwiper } from "./useSwiper"
import { useModalTransition } from "./useModalTransition"
import { useScrollNearEdges } from "./useScrollNearEdges"

type useModalProProps = {
    modalKey?: string
    canDismiss?: boolean
    openDuration?: number
    swipeToOpen?: boolean
    closeDuration?: number
    swipeToClose?: boolean
    swipeThreshold?: number
    sheetClassName?: string
    backdropClassName?: string
    sheetRef: React.RefObject<HTMLElement>
    sidebarDirection: "left" | "right" | "top" | "bottom"
}

export const useModalPro = (props: useModalProProps) => {

    const { modalKey, swipeThreshold, swipeToClose = false, swipeToOpen = false, sidebarDirection, backdropClassName,
        sheetClassName, canDismiss, openDuration, closeDuration, sheetRef } = props

    const currentModalKey = modalKey ?? uid("modal")

    const { open, willBeClosed, handleOpenModal, handleCloseModal, backdropClassName: defaultBackdropClassName,
        canDismiss: defaultCanDismiss, closeDuration: defaultCloseDuration, openDuration: defaultOpenDuration,
        sheetClassName: defaultSheetClassName } = useModalTransition({
            key: currentModalKey
        })

    const { isNearStart, isNearEnd } = useScrollNearEdges({
        ref: open ? sheetRef : undefined
    })

    const swipeEnabled = swipeToOpen ? true : swipeToClose && sidebarDirection === "top" ? isNearStart : isNearEnd

    const swipeDirection = (sidebarDirection === "left" || sidebarDirection === "right") ? "horizontal" : "vertical"

    const swipeFunctions = {
        onSwipeTop: () => {
            if (sidebarDirection === "top" && swipeToClose) return handleCloseModal()
            if (sidebarDirection === "bottom" && swipeToOpen) return handleOpenModal()
        },
        onSwipeDown: () => {
            if (sidebarDirection === "top" && swipeToOpen) return handleOpenModal()
            if (sidebarDirection === "bottom" && swipeToClose) return handleCloseModal()
        },
        onSwipeLeft: () => {
            if (sidebarDirection === "left" && swipeToOpen) return handleOpenModal()
            if (sidebarDirection === "right" && swipeToClose) return handleCloseModal()
        },
        onSwipeRight: () => {
            if (sidebarDirection === "right" && swipeToOpen) return handleOpenModal()
            if (sidebarDirection === "left" && swipeToClose) return handleCloseModal()
        }
    }

    useSwiper({
        ...swipeFunctions,
        enabled: swipeEnabled,
        threshold: swipeThreshold,
        direction: swipeDirection
    })

    return {
        currentModalKey, backdropClassName: backdropClassName ?? defaultBackdropClassName, canDismiss: canDismiss ?? defaultCanDismiss,
        closeDuration: closeDuration ?? defaultCloseDuration, openDuration: openDuration ?? defaultOpenDuration,
        sheetClassName: sheetClassName ?? defaultSheetClassName, handleOpenModal, handleCloseModal, open, willBeClosed
    }

}