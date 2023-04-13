import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

interface Props {
    onClick: (e: React.BaseSyntheticEvent) => void
}

function EditBtn({ onClick }: Props) {
    // Custom hook to return icon and functs?
    return (
        <>
            <FontAwesomeIcon icon={faEdit} size="sm" onClick={onClick} />
        </>
    )
}

export default EditBtn
