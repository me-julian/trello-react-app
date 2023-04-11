import './css/styles.css'
import './css/reset.css'
import { BoardType } from './components/types'
import Board from './components/Board'
import { useCookies } from 'react-cookie'
import useLoadBoard from './components/hooks/useLoadBoard'

function App() {
    const [cookies, setCookie, removeCookie] = useCookies()

    const { data, error } = useLoadBoard<BoardType>(cookies.lastBoardId, [])

    const handleEditBoardName = () => {}

    if (!data) {
        return <h1>Loading...</h1>
    }
    if (error) {
        console.error('Render error')
        return <h1>Error</h1>
    }

    console.log('render board')
    if (cookies.lastBoardId !== data.id) {
        setCookie('lastBoardId', data.id, { maxAge: 86400 })
    }

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
