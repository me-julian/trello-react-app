import './css/styles.css'
import './css/reset.css'
import Board from './components/Board'

function App() {
    const board = {
        id: 'b1',
        boardName: 'New Board',
        lanes: [
            {
                id: 'l1',
                laneName: 'Lane 1',
                cards: [
                    {
                        id: 'c1',
                        cardName: 'Card 1',
                        cardDescr: 'Card Descr 1',
                        sequence: 0,
                    },
                    {
                        id: 'c2',
                        cardName: 'Card 2',
                        cardDescr: 'Card Descr 2',
                        sequence: 1,
                    },
                    {
                        id: 'c3',
                        cardName: 'Card 3',
                        cardDescr: 'Card Descr 3',
                        sequence: 2,
                    },
                ],
                sequence: 0,
            },
            {
                id: 'l2',
                laneName: 'Lane 1',
                cards: [],
                sequence: 1,
            },
        ],
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
