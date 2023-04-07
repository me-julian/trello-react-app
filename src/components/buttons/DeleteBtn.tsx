import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

function DeleteBtn() {
    // Custom hook to return icon and functs?
    return (
        <>
            <FontAwesomeIcon icon={faTrashAlt} size="sm" />
        </>
    )
}

export default DeleteBtn
