import './css/styles.css'
import './css/reset.css'
import Board from './components/Board'
import {
    useLoadBoard,
    useBoard,
    useLane,
    useLaneAdder,
    useCardAdder,
} from './components/hooks'

function App() {
    const { data, setData, setStale, error, setError } = useLoadBoard()
    const {
        editingBoard,
        handleToggleEditingBoard,
        handleTypingBoard,
        handleEditBoardName,
    } = useBoard(data, setData)

    const boardHandlers = {
        editingBoard,
        onToggleEditing: handleToggleEditingBoard,
        onTyping: handleTypingBoard,
        onEditBoardName: handleEditBoardName,
    }

    const {
        addingLane,
        handleToggleAddingLane,
        handleAddNewLane,
        handleTypingNewLane,
    } = useLaneAdder(data, setStale)

    const addLaneHandlers = {
        adding: addingLane,
        onToggleAdding: handleToggleAddingLane,
        onSubmit: handleAddNewLane,
        onTyping: handleTypingNewLane,
    }

    const {
        addingCard,
        handleAddingCard,
        handleAddNewCard,
        handleTypingNewCard,
    } = useCardAdder(data, setStale)

    const addCardHandlers = {
        adding: addingCard,
        onToggleAdding: handleAddingCard,
        onSubmit: handleAddNewCard,
        onTyping: handleTypingNewCard,
    }

    const { editingLane, handleToggleEditingLane } = useLane(data, setStale)

    const laneHandlers = {
        editingLane,
        onToggleEditing: handleToggleEditingLane,
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
                handlers={boardHandlers}
                addLaneHandlers={addLaneHandlers}
                addCardHandlers={addCardHandlers}
                laneHandlers={laneHandlers}
            />
        </>
    )
}

export default App
