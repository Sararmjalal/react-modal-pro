import { Fragment, ReactNode, Ref, useRef } from "react"
import DrawerBase from "../../drawer"
import { useModalPro } from "../../../lib"

type ProSheetProps = {
    modalKey?: string;
    canDismiss?: boolean;
    closeCb?: () => void;
    openDuration?: number;
    swipeToOpen?: boolean;
    closeDuration?: number;
    swipeToClose?: boolean;
    swipeThreshold?: number;
    sheetClassName?: string;
    backdropClassName?: string;
    direction?: "top" | "bottom";
    sheetRef: React.RefObject<HTMLElement | undefined>;
    TriggerElement: ReactNode
}

const ProSheet = ({ TriggerElement, direction, ...props }: ProSheetProps) => {

    const DrawerRef = useRef<HTMLDivElement>(undefined)

    const { handleOpenModal, handleCloseModal, currentModalKey, ...modalProps } = useModalPro({
        ...props,
        sidebarDirection: direction
    })

    return (
        <Fragment>
            <div onClick={handleOpenModal}>
                {TriggerElement}
            </div>
            <DrawerBase
                {...modalProps}
                direction={direction}
                key={currentModalKey}
                handleClose={handleCloseModal}
                ref={DrawerRef as Ref<HTMLDivElement | null>}>
                <div style={{ height: "200vh" }}>drawer children</div>
            </DrawerBase >
        </Fragment>
    )
}

export default ProSheet