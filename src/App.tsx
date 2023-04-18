import './css/styles.css'
import './css/reset.css'
import Board from './components/Board'
import {
    useLoadBoard,
    useBoard,
    useLane,
    useLaneAdder,
    useCardAdder,
    useCard,
} from './components/hooks'

function App() {
    const { data, setData, stale, setStale, error, setError } = useLoadBoard()

    const boardHandlers = useBoard(data, setData)

    const addLaneHandlers = useLaneAdder(data, stale, setStale)

    const addCardHandlers = useCardAdder(data, stale, setStale)

    const laneHandlers = useLane(data, stale, setStale)

    const cardHandlers = useCard(data, stale, setStale)

    if (!data) {
        return <h1>Loading...</h1>
    }
    if (error) {
        console.error('Render error')
        return <h1>Error</h1>
    }

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
                cardHandlers={cardHandlers}
            />
        </>
    )
}

export default App
