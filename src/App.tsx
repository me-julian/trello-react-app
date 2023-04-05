import './css/styles.css'
import './css/reset.css'
import Board from './components/Board'

function App() {
    const board = {
        id: '123e',
        boardName: 'New Board',
        lanes: [],
    }
    const handleEditBoardName = () => {}

    return (
        <Board
            id={board.id}
            boardName={board.boardName}
            lanes={board.lanes}
            onEditBoardName={handleEditBoardName}
        />
    )
}

export default App
