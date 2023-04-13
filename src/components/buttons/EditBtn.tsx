import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

interface Props {
    onClick: (e: React.BaseSyntheticEvent, index: number) => void
    index: number
}

function EditBtn({ onClick, index }: Props) {
    return (
        <>
            <FontAwesomeIcon
                icon={faEdit}
                size="sm"
                onClick={(e: React.BaseSyntheticEvent) => onClick(e, index)}
            />
        </>
    )
}

export default EditBtn
