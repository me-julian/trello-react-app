import Lanes from './Lanes'
import { LaneType } from './types'
import { AddNewBtn } from './buttons'

interface Props {
    id: string
    boardName: string
    lanes: Array<LaneType>
    handlers: {
        editingBoard: boolean
        onToggleEditing: (e: React.BaseSyntheticEvent) => void
        onTyping: (e: React.ChangeEvent<HTMLInputElement>) => void
        onEditBoardName: (e: React.BaseSyntheticEvent) => void
    }
    addLaneHandlers: {
        adding: boolean
        onToggleAdding: (e: React.BaseSyntheticEvent) => void
        onSubmit: (e: React.BaseSyntheticEvent) => void
        onTyping: (e: React.ChangeEvent<HTMLInputElement>) => void
    }
    addCardHandlers: {
        adding: boolean
        onToggleAdding: (e: React.BaseSyntheticEvent) => void
        onTyping: (e: React.ChangeEvent<HTMLInputElement>) => void
        onSubmit: (e: React.BaseSyntheticEvent) => void
    }
    laneHandlers: {
        editingLane: boolean
        onToggleEditing: (e: React.BaseSyntheticEvent) => void
    }
}

function Board({
    id,
    boardName,
    lanes,
    handlers: { editingBoard, onToggleEditing, onTyping, onEditBoardName },
    addLaneHandlers,
    addCardHandlers,
    laneHandlers,
}: Props) {
    return (
        <>
            <header>
                {editingBoard && (
                    <form
                        onSubmit={onEditBoardName}
                        onKeyDown={onToggleEditing}
                    >
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
                {!editingBoard && (
                    <h1 onClick={onToggleEditing}>{boardName}</h1>
                )}
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
