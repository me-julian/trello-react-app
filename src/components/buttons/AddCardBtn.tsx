import { AddCardHandlerProps } from '../types'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef } from 'react'
import { useTemporaryValue } from '../hooks'
import { CSSTransition } from 'react-transition-group'

interface Props {
    handlers: AddCardHandlerProps
}

const AddNewBtn = ({
    handlers: { adding, onToggleAdding, onSubmit },
}: Props) => {
    const [tempName, setTempName] = useTemporaryValue('', adding)
    const [tempDescr, setTempDescr] = useTemporaryValue('', adding)

    const formRef = useRef(null)

    return (
        <div className="add-new round">
            <FontAwesomeIcon
                className={adding ? 'turn' : ''}
                icon={faPlus}
                size="sm"
                onClick={onToggleAdding}
            />
            <CSSTransition
                nodeRef={formRef}
                in={adding}
                timeout={200}
                classNames="toggle-add-new"
                unmountOnExit
            >
                <form
                    ref={formRef}
                    onSubmit={onSubmit}
                    onKeyDown={onToggleAdding}
                >
                    <label>
                        <input
                            name="card-name"
                            placeholder="Name your card"
                            value={tempName}
                            type="text"
                            autoFocus
                            onChange={(e) => setTempName(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            name="card-descr"
                            placeholder="Add a card description"
                            value={tempDescr}
                            type="text"
                            onChange={(e) => setTempDescr(e.target.value)}
                        />
                    </label>
                </form>
            </CSSTransition>
        </div>
    )
}

export default AddNewBtn
