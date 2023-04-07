import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef, FormEvent } from 'react'
import { CSSTransition } from 'react-transition-group'

interface Props {
    onSubmit: (event: FormEvent) => void
}

const AddNewBtn = ({ onSubmit }: Props) => {
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
                classNames="toggle-add-new"
                unmountOnExit
            >
                <form ref={formRef} onSubmit={onSubmit}>
                    <label>
                        <input
                            name="lane-name"
                            placeholder="Name your lane"
                            type="text"
                            autoFocus
                        />
                    </label>
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
