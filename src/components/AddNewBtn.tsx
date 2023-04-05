import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const AddNewBtn = () => {
    const [adding, setAdding] = useState(false)

    function handleAdding() {
        setAdding(!adding)
    }

    return (
        <div id="add-lane-btn" className="add-new round" onClick={handleAdding}>
            <FontAwesomeIcon icon={adding ? faTimes : faPlus} size="sm" />
        </div>
    )
}

export default AddNewBtn
