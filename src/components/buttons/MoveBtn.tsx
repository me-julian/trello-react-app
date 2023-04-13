import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAngleUp,
    faAngleDown,
    faAngleLeft,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons'

interface Props {
    iconType: 'up' | 'down' | 'left' | 'right'
    onClick: (e: React.BaseSyntheticEvent, id: string, type: string) => void
    parentId: string
    active: boolean
}

function MoveBtn({ iconType, onClick, parentId, active }: Props) {
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
                        ? () => console.log('Lane at end')
                        : (e) => onClick(e, parentId, iconType)
                }
            />
        </>
    )
}

export default MoveBtn
