import Lanes from './Lanes'
import LaneType from './types/Lane'
import AddNewBtn from './buttons/AddNewBtn'

interface Props {
    id: string
    boardName: string
    lanes: Array<LaneType>
    onEditBoardName: () => void
}

function Board({ id, boardName, lanes, onEditBoardName }: Props) {
    function handleAddNewLane(e: React.BaseSyntheticEvent) {
        e.preventDefault()

        // When are hooks recalled, the reactive values.
        // Loading page from big data call, only making small changes
        // and notifying API about it. Unless, say, we change
        // large size things like board id (reactive value, state)
        // to re-render with a new big data call?

        const laneName = e.target['lane-name'].value
    }

    return (
        <>
            <header>
                <h1>{boardName}</h1>
            </header>
            <main id="board" data-db-id={id}>
                <Lanes lanes={lanes} />
                <AddNewBtn onSubmit={handleAddNewLane} />
            </main>
        </>
    )
}

export default Board
