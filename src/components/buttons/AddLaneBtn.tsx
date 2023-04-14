import { AddLaneHandlerProps } from '../types'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef } from 'react'
import { useTemporaryValue } from '../hooks'
import { CSSTransition } from 'react-transition-group'

interface Props {
    handlers: AddLaneHandlerProps
}

const AddNewBtn = ({
    handlers: { adding, onToggleAdding, onSubmit },
}: Props) => {
    const [tempName, setTempName] = useTemporaryValue('', adding)

    const formRef = useRef(null)

    return (
        <div id="add-lane-btn" className="add-new round">
            <CSSTransition
                nodeRef={formRef}
                in={adding}
                timeout={200}
                classNames="toggle-add-new"
                unmountOnExit
            >
                <form
                    ref={formRef}
                    onSubmit={(e) => onSubmit(e, adding)}
                    onKeyDown={onToggleAdding}
                >
                    <label>
                        <input
                            name="lane-name"
                            placeholder="Name your lane"
                            value={tempName}
                            type="text"
                            autoFocus
                            onChange={(e) => setTempName(e.target.value)}
                        />
                    </label>
                </form>
            </CSSTransition>
            <FontAwesomeIcon
                className={adding ? 'turn' : ''}
                icon={faPlus}
                size="sm"
                onClick={onToggleAdding}
            />
        </div>
    )
}

export default AddNewBtn
