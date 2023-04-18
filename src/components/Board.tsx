import {
    AddCardHandlerProps,
    AddLaneHandlerProps,
    BoardHandlerProps,
    CardHandlerProps,
    LaneHandlerProps,
    LaneType,
} from './types'
import Lanes from './Lanes'
import Counter from './Counter'
import { AddLaneBtn } from './buttons'
import { useTemporaryValue } from './hooks'

interface Props {
    id: string
    boardName: string
    lanes: Array<LaneType>
    handlers: BoardHandlerProps
    addLaneHandlers: AddLaneHandlerProps
    addCardHandlers: AddCardHandlerProps
    laneHandlers: LaneHandlerProps
    cardHandlers: CardHandlerProps
}

function Board({
    id,
    boardName,
    lanes,
    handlers: { editing, onToggleEditing, onEditBoardName },
    addLaneHandlers,
    addCardHandlers,
    laneHandlers,
    cardHandlers,
}: Props) {
    const [tempName, setTempName] = useTemporaryValue(boardName, editing)

    return (
        <>
            <header>
                {editing && (
                    <form
                        onSubmit={(e) => onEditBoardName(e, id, boardName)}
                        onKeyDown={onToggleEditing}
                    >
                        <label>
                            <input
                                name="board-name"
                                type="text"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                autoFocus
                            />
                        </label>
                    </form>
                )}
                {!editing && <h1 onClick={onToggleEditing}>{boardName}</h1>}
                <Counter count={lanes.length} />
            </header>
            <main id="board" data-db-id={id}>
                <Lanes
                    lanes={lanes}
                    laneHandlers={laneHandlers}
                    addCardHandlers={addCardHandlers}
                    cardHandlers={cardHandlers}
                />
                <AddLaneBtn handlers={addLaneHandlers} />
            </main>
        </>
    )
}

export default Board
