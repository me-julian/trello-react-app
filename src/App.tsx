import './css/styles.css'
import './css/reset.css'
import BoardType from './components/types/Board'
import Board from './components/Board'
import useFetch from './components/hooks/useFetch'
import { useState } from 'react'

function App() {
    const [boardId, setBoardId] = useState<string>(
        '4aa271ac-3ec6-4847-9798-100a8cdd68d7'
    )

    const boardData = useFetch<BoardType>({
        url: new URL(`http://localhost:5000/boards/${boardId}`),
        options: { method: 'GET' },
        ids: [boardId],
    })

    const handleEditBoardName = () => {}

    if (!boardData) return <h1>Loading...</h1>

    return (
        <>
            <Board
                id={boardData.id}
                boardName={boardData.boardName}
                lanes={boardData.lanes}
                onEditBoardName={handleEditBoardName}
            />
        </>
    )
}

export default App
