import './css/styles.css'
import './css/reset.css'
import Board from './components/Board'
import useLoadBoard from './components/hooks/useLoadBoard'

function App() {
    const { data, error } = useLoadBoard()

    const handleEditBoardName = () => {}

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
                onEditBoardName={handleEditBoardName}
            />
        </>
    )
}

export default App
