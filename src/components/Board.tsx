import Lanes from './Lanes'
import { LaneType } from './types'
import AddNewBtn from './buttons/AddNewBtn'
import { useState } from 'react'

interface Props {
    id: string
    boardName: string
    lanes: Array<LaneType>
    boardHandlers: {
        editing: boolean
        onStartEditing: () => void
        onTyping: (e: React.ChangeEvent<HTMLInputElement>) => void
        onEditBoardName: (e: React.BaseSyntheticEvent) => void
    }
}

function Board({
    id,
    boardName,
    lanes,
    boardHandlers: { editing, onStartEditing, onTyping, onEditBoardName },
}: Props) {
    function handleAddNewLane(e: React.BaseSyntheticEvent) {
        // -- Needs to be lifted --
        e.preventDefault()

        // const laneName = e.target['lane-name'].value
        // if (laneName.trim() === '') {
        //     alert('Lane must have a name.')
        // } else {
        //     // Post to API
        //     console.log(laneName)
        // }
    }

    return (
        <>
            <header>
                {editing && (
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
                {!editing && <h1 onClick={onStartEditing}>{boardName}</h1>}
            </header>
            <main id="board" data-db-id={id}>
                <Lanes lanes={lanes} />
                <AddNewBtn onSubmit={handleAddNewLane} />
            </main>
        </>
    )
}

export default Board
