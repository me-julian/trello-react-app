import { AddCardHandlerProps } from '../types'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef } from 'react'
import { useTemporaryValue } from '../hooks'
import { CSSTransition } from 'react-transition-group'

interface Props {
    laneId: string
    laneIndex: number
    handlers: AddCardHandlerProps
}

const AddNewBtn = ({
    laneId,
    laneIndex,
    handlers: { adding, onToggleAdding, onSubmit },
}: Props) => {
    const [tempName, setTempName] = useTemporaryValue('', adding)
    const [tempDescr, setTempDescr] = useTemporaryValue('', adding)

    const formRef = useRef<null | HTMLFormElement>(null)
    const descrRef = useRef<null | HTMLInputElement>(null)

    function handleAdvanceCursor(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            descrRef.current?.focus()
        }
    }

    function handleEnterSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            formRef.current?.dispatchEvent(
                new Event('submit', { cancelable: true, bubbles: true })
            )
        }
    }

    return (
        <div className="add-new round">
            <FontAwesomeIcon
                className={adding === laneIndex ? 'turn' : ''}
                icon={faPlus}
                size="sm"
                onClick={(e) => onToggleAdding(e, laneIndex)}
            />
            <CSSTransition
                nodeRef={formRef}
                in={adding === laneIndex}
                timeout={200}
                classNames="toggle-add-new"
                unmountOnExit
            >
                <form
                    ref={formRef}
                    onSubmit={(e) => onSubmit(e, laneId)}
                    onKeyDown={(e) => onToggleAdding(e, laneIndex)}
                >
                    <label>
                        <input
                            name="card-name"
                            placeholder="Name your card"
                            value={tempName}
                            type="text"
                            autoFocus
                            onChange={(e) => setTempName(e.target.value)}
                            onKeyDown={handleAdvanceCursor}
                        />
                    </label>
                    <label>
                        <input
                            ref={descrRef}
                            name="card-descr"
                            placeholder="Add a card description"
                            value={tempDescr}
                            type="text"
                            onChange={(e) => setTempDescr(e.target.value)}
                            onKeyDown={handleEnterSubmit}
                        />
                    </label>
                </form>
            </CSSTransition>
        </div>
    )
}

export default AddNewBtn
