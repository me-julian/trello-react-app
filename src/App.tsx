import './css/styles.css'
import './css/reset.css'
import Board from './components/Board'
import { useLoadBoard, useBoard } from './components/hooks'

function App() {
    const { data, setData, error, setError } = useLoadBoard()
    const {
        editingBoard,
        handleStartEditing,
        handleTyping,
        handleEditBoardName,
    } = useBoard(data, setData)

    const boardHandlers = {
        editing: editingBoard,
        onStartEditing: handleStartEditing,
        onTyping: handleTyping,
        onEditBoardName: handleEditBoardName,
    }

    if (!data) {
        return <h1>Loading...</h1>
    }
    if (error) {
        console.error('Render error')
        return <h1>Error</h1>
    }

    console.log('render board')
    return (
        <>
            <Board
                id={data.id}
                boardName={data.boardName}
                lanes={data.lanes}
                boardHandlers={boardHandlers}
            />
        </>
    )
}

export default App
