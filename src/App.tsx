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
        handleStartEditingBoard,
        handleTypingBoard,
        handleEditBoardName,
    } = useBoard(data, setData)

    const boardHandlers = {
        editingBoard,
        onStartEditing: handleStartEditingBoard,
        onTyping: handleTypingBoard,
        onEditBoardName: handleEditBoardName,
    }

    const {
        addingLane,
        handleAddingLane,
        handleAddNewLane,
        handleTypingNewLane,
    } = useLaneAdder(data, setStale)

    const addLaneHandlers = {
        adding: addingLane,
        onAdding: handleAddingLane,
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
        onAdding: handleAddingCard,
        onSubmit: handleAddNewCard,
        onTyping: handleTypingNewCard,
    }

    const { editingLane, handleStartEditingLane } = useLane(data, setData)

    const laneHandlers = {
        editingLane,
        onStartEditing: handleStartEditingLane,
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
