import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

interface Props {
    onClick: Function
    ids: { laneId: string; cardId?: string }
}

function DeleteBtn({ onClick, ids }: Props) {
    return (
        <>
            <FontAwesomeIcon
                icon={faTrashAlt}
                size="sm"
                onClick={(e) => onClick(e, ids)}
            />
        </>
    )
}

export default DeleteBtn
