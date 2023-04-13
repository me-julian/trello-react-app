import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

interface Props {
    onClick: (e: React.BaseSyntheticEvent, id: string) => void
    parentId: string
}

function DeleteBtn({ onClick, parentId }: Props) {
    return (
        <>
            <FontAwesomeIcon
                icon={faTrashAlt}
                size="sm"
                onClick={(e) => onClick(e, parentId)}
            />
        </>
    )
}

export default DeleteBtn
