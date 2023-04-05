import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

const AddNewBtn = () => {
    const [adding, setAdding] = useState(false)
    const formRef = useRef(null)

    function handleAdding() {
        setAdding(!adding)
    }

    return (
        <div id="add-lane-btn" className="add-new round">
            <CSSTransition
                nodeRef={formRef}
                in={adding}
                timeout={200}
                classNames="toggle-form"
                unmountOnExit
            >
                <form ref={formRef}>
                    <input placeholder="Name your lane" type="text" autoFocus />
                </form>
            </CSSTransition>
            <FontAwesomeIcon
                className={adding ? 'turn' : ''}
                icon={faPlus}
                size="sm"
                onClick={handleAdding}
            />
        </div>
    )
}

export default AddNewBtn
