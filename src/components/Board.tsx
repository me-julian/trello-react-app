import Lane from './Lane'
import AddNewBtn from './AddNewBtn'

interface Props {
    id: string
    boardName: string
    lanes?: Array<Object>
    onEditBoardName: () => void
}

function Board({ id, boardName, lanes, onEditBoardName }: Props) {
    return (
        <>
            <header>
                <h1 data-db-id={id}>{boardName}</h1>
            </header>
            <main>
                {lanes?.map((lane) => (
                    <Lane />
                ))}
                <AddNewBtn />
            </main>
        </>
    )
}

export default Board
