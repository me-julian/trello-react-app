import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const AddNewBtn = () => {
    const [adding, setAdding] = useState(false)

    function handleAdding() {
        setAdding(!adding)
    }

    return (
        <div id="add-lane-btn" className="add-new round">
            <form className={adding ? 'visible' : 'hidden'}>
                <input placeholder="Name your lane" type="text" />
            </form>
            <FontAwesomeIcon
                icon={adding ? faTimes : faPlus}
                size="sm"
                onClick={handleAdding}
            />
        </div>
    )
}

export default AddNewBtn
