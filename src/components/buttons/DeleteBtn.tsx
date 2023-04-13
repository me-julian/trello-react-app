import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

interface Props {
    onClick: (e: React.BaseSyntheticEvent, id: string) => void
    id: string
}

function DeleteBtn({ onClick, id }: Props) {
    // Custom hook to return icon and functs?
    return (
        <>
            <FontAwesomeIcon
                icon={faTrashAlt}
                size="sm"
                onClick={(e) => onClick(e, id)}
            />
        </>
    )
}

export default DeleteBtn
