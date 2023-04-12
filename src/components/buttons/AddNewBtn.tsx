import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef, FormEvent } from 'react'
import { CSSTransition } from 'react-transition-group'

interface Props {
    handlers: {
        adding: boolean
        onToggleAdding: (e: React.BaseSyntheticEvent) => void
        onTyping: (e: React.ChangeEvent<HTMLInputElement>) => void
        onSubmit: (e: React.BaseSyntheticEvent) => void
    }
}

const AddNewBtn = ({
    handlers: { adding, onToggleAdding, onSubmit, onTyping },
}: Props) => {
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
                    onSubmit={onSubmit}
                    onKeyDown={onToggleAdding}
                >
                    <label>
                        <input
                            name="lane-name"
                            placeholder="Name your lane"
                            type="text"
                            autoFocus
                            onChange={onTyping}
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
