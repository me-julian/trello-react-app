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

        const laneName = e.target['lane-name'].value
        if (laneName.trim() === '') {
            alert('Please add a name for the lane.')
        } else {
            // Post to API
            console.log(laneName)
        }
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
