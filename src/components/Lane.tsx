import type { LaneType } from './types'
import Cards from './Cards'
import { DeleteBtn, EditBtn, MoveBtn } from './buttons'
import { useTemporaryValue } from './hooks'

interface Props {
    index: number
    lane: LaneType
    handlers: {
        editing: null | number
        onToggleEditing: (e: React.BaseSyntheticEvent, index: number) => void
        onEditLaneName: (e: React.BaseSyntheticEvent) => void
    }
    addCardHandlers: {
        adding: boolean
        onToggleAdding: (e: React.BaseSyntheticEvent) => void
        onSubmit: (e: React.BaseSyntheticEvent) => void
    }
}

const Lane = ({
    index,
    lane: { id, laneName, cards, sequence },
    handlers: { editing, onToggleEditing, onEditLaneName },
    addCardHandlers,
}: Props) => {
    const [tempName, setTempName] = useTemporaryValue(laneName, editing)

    return (
        <div className="lane round" id={id}>
            <div className="editing-buttons">
                <MoveBtn />
                <div>
                    <EditBtn
                        onClick={(e: React.BaseSyntheticEvent) =>
                            onToggleEditing(e, index)
                        }
                    />
                    <DeleteBtn />
                </div>
                <MoveBtn />
            </div>
            <div className="lane-head">
                {editing === index ? (
                    <form
                        onSubmit={onEditLaneName}
                        onKeyDown={(e) => onToggleEditing(e, index)}
                    >
                        <label>
                            <input
                                name="lane-name"
                                type="text"
                                placeholder={laneName}
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                autoFocus
                            />
                        </label>
                    </form>
                ) : (
                    <p>{laneName}</p>
                )}
            </div>

            <Cards cards={cards} addCardHandlers={addCardHandlers} />
        </div>
    )
}

export default Lane
