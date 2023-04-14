import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAngleUp,
    faAngleDown,
    faAngleLeft,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons'

interface Props {
    iconType: 'up' | 'down' | 'left' | 'right'
    onClick: Function
    ids: {
        laneId: string
        cardId?: string
        rightLaneId?: string | null
        leftLaneId?: string | null
    }
    active: boolean
}

function MoveBtn({ iconType, onClick, ids, active }: Props) {
    let icon
    switch (iconType) {
        case 'up':
            icon = faAngleUp
            break
        case 'down':
            icon = faAngleDown
            break
        case 'left':
            icon = faAngleLeft
            break
        case 'right':
            icon = faAngleRight
            break
    }

    return (
        <>
            <FontAwesomeIcon
                icon={icon}
                size="sm"
                onClick={
                    active
                        ? () => console.log('Item at end')
                        : (e) => onClick(e, ids, iconType)
                }
            />
        </>
    )
}

export default MoveBtn
