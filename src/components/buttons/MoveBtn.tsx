import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAngleLeft,
    faAngleRight,
    faAngleUp,
    faAngleDown,
} from '@fortawesome/free-solid-svg-icons'

function MoveBtn() {
    // Custom hook to return icon and functs?
    return (
        <>
            <FontAwesomeIcon icon={faAngleLeft} size="sm" />
        </>
    )
}

export default MoveBtn
