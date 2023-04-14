import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

interface Props {
    onClick: (e: React.BaseSyntheticEvent, id: string) => void
    id: string
}

function EditBtn({ onClick, id }: Props) {
    return (
        <>
            <FontAwesomeIcon
                icon={faEdit}
                size="sm"
                onClick={(e: React.BaseSyntheticEvent) => onClick(e, id)}
            />
        </>
    )
}

export default EditBtn
