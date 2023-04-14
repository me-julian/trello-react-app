import type {
    AddCardHandlerProps,
    CardHandlerProps,
    LaneHandlerProps,
    LaneType,
} from './types'
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
    cardHandlers: CardHandlerProps
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
    cardHandlers,
}: Props) => {
    const [tempName, setTempName] = useTemporaryValue(laneName, editing)

    return (
        <div className="lane round" id={id}>
            <div className="editing-buttons">
                <MoveBtn
                    iconType="left"
                    ids={{ laneId: id }}
                    active={leftEnd}
                    onClick={onMoveLane}
                />
                <div>
                    <EditBtn onClick={onToggleEditing} index={index} />
                    <DeleteBtn onClick={onDeleteLane} ids={{ laneId: id }} />
                </div>
                <MoveBtn
                    iconType="right"
                    ids={{ laneId: id }}
                    active={rightEnd}
                    onClick={onMoveLane}
                />
            </div>
            <div className="lane-head">
                {editing === index ? (
                    <form
                        onSubmit={(e) =>
                            onEditLaneName(e, { laneId: id }, laneName)
                        }
                        onKeyDown={(e) => onToggleEditing(e, index)}
                    >
                        <label>
                            <input
                                name="lane-name"
                                type="text"
                                placeholder={laneName}
                                value={tempName}
                                autoFocus
                                onChange={(e) => setTempName(e.target.value)}
                            />
                        </label>
                    </form>
                ) : (
                    <p>{laneName}</p>
                )}
            </div>

            <Cards
                cards={cards}
                leftEnd={leftEnd}
                rightEnd={rightEnd}
                laneId={id}
                laneIndex={index}
                addCardHandlers={addCardHandlers}
                cardHandlers={cardHandlers}
            />
        </div>
    )
}

export default Lane
