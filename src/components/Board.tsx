import {
    AddCardHandlerProps,
    AddLaneHandlerProps,
    BoardHandlerProps,
    LaneHandlerProps,
    LaneType,
} from './types'
import Lanes from './Lanes'
import { AddNewBtn } from './buttons'
import { useTemporaryValue } from './hooks'

interface Props {
    id: string
    boardName: string
    lanes: Array<LaneType>
    handlers: BoardHandlerProps
    addLaneHandlers: AddLaneHandlerProps
    addCardHandlers: AddCardHandlerProps
    laneHandlers: LaneHandlerProps
}

function Board({
    id,
    boardName,
    lanes,
    handlers: { editing, onToggleEditing, onEditBoardName },
    addLaneHandlers,
    addCardHandlers,
    laneHandlers,
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
            </header>
            <main id="board" data-db-id={id}>
                <Lanes
                    lanes={lanes}
                    laneHandlers={laneHandlers}
                    addCardHandlers={addCardHandlers}
                />
                <AddNewBtn handlers={addLaneHandlers} />
            </main>
        </>
    )
}

export default Board
