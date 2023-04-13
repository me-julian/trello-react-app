import type { AddCardHandlerProps, LaneHandlerProps, LaneType } from './types'
import Cards from './Cards'
import { DeleteBtn, EditBtn, MoveBtn } from './buttons'
import { useTemporaryValue } from './hooks'

interface Props {
    index: number
    leftEnd: boolean
    rightEnd: boolean
    lane: LaneType
    handlers: LaneHandlerProps
    addCardHandlers: AddCardHandlerProps
}

const Lane = ({
    index,
    leftEnd,
    rightEnd,
    lane: { id, laneName, cards, sequence },
    handlers: {
        editing,
        onToggleEditing,
        onEditLaneName,
        onMoveLane,
        onDeleteLane,
    },
    addCardHandlers,
}: Props) => {
    const [tempName, setTempName] = useTemporaryValue(laneName, editing)

    return (
        <div className="lane round" id={id}>
            <div className="editing-buttons">
                <MoveBtn
                    iconType="left"
                    onClick={onMoveLane}
                    parentId={id}
                    active={leftEnd}
                />
                <div>
                    <EditBtn onClick={onToggleEditing} index={index} />
                    <DeleteBtn onClick={onDeleteLane} parentId={id} />
                </div>
                <MoveBtn
                    iconType="right"
                    onClick={onMoveLane}
                    parentId={id}
                    active={rightEnd}
                />
            </div>
            <div className="lane-head">
                {editing === index ? (
                    <form
                        onSubmit={(e) => onEditLaneName(e, id, laneName)}
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
