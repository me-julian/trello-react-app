import Lanes from './Lanes'
import { LaneType } from './types'
import { AddNewBtn } from './buttons'

interface Props {
    id: string
    boardName: string
    lanes: Array<LaneType>
    handlers: {
        editingBoard: boolean
        onStartEditing: () => void
        onTyping: (e: React.ChangeEvent<HTMLInputElement>) => void
        onEditBoardName: (e: React.BaseSyntheticEvent) => void
    }
    addLaneHandlers: {
        adding: boolean
        onAdding: () => void
        onSubmit: (e: React.BaseSyntheticEvent) => void
        onTyping: (e: React.ChangeEvent<HTMLInputElement>) => void
    }
    addCardHandlers: {
        adding: boolean
        onAdding: () => void
        onTyping: (e: React.ChangeEvent<HTMLInputElement>) => void
        onSubmit: (e: React.BaseSyntheticEvent) => void
    }
    laneHandlers: {
        editingLane: boolean
        onStartEditing: () => void
    }
}

function Board({
    id,
    boardName,
    lanes,
    handlers: { editingBoard, onStartEditing, onTyping, onEditBoardName },
    addLaneHandlers,
    addCardHandlers,
    laneHandlers,
}: Props) {
    return (
        <>
            <header>
                {editingBoard && (
                    <form onSubmit={onEditBoardName}>
                        <label>
                            <input
                                name="board-name"
                                type="text"
                                value={boardName}
                                onChange={onTyping}
                                autoFocus
                            />
                        </label>
                    </form>
                )}
                {!editingBoard && <h1 onClick={onStartEditing}>{boardName}</h1>}
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
