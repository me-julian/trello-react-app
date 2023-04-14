import { AddCardHandlerProps } from '../types'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCardForm } from '../hooks'
import { CSSTransition } from 'react-transition-group'

interface Props {
    laneId: string
    handlers: AddCardHandlerProps
}

const AddNewBtn = ({
    laneId,
    handlers: { adding, onToggleAdding, onSubmit },
}: Props) => {
    const [
        tempName,
        setTempName,
        tempDescr,
        setTempDescr,
        formRef,
        descrRef,
        handleAdvanceCursor,
        handleEnterSubmit,
    ] = useCardForm(adding, '', '')

    return (
        <div className="add-new round">
            <FontAwesomeIcon
                className={adding === laneId ? 'turn' : ''}
                icon={faPlus}
                size="sm"
                onClick={(e) => onToggleAdding(e, laneId)}
            />
            <CSSTransition
                nodeRef={formRef}
                in={adding === laneId}
                timeout={200}
                classNames="toggle-add-new"
                unmountOnExit
            >
                <form
                    ref={formRef}
                    onSubmit={(e) => onSubmit(e, laneId)}
                    onKeyDown={(e) => onToggleAdding(e, laneId)}
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
