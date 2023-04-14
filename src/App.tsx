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
    const { data, setData, setStale, error, setError } = useLoadBoard()

    const boardHandlers = useBoard(data, setData)

    const addLaneHandlers = useLaneAdder(data, setStale)

    const addCardHandlers = useCardAdder(data, setStale)

    const laneHandlers = useLane(data, setStale)

    const cardHandlers = useCard(data, setStale)

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
                cardHandlers={cardHandlers}
            />
        </>
    )
}

export default App
