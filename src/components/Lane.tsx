import type { CardType, LaneType } from './types'
import Cards from './Cards'
import { DeleteBtn, EditBtn, MoveBtn } from './buttons'

interface Props {
    lane: LaneType
    handlers: {
        editingLane: boolean
        onToggleEditing: (e: React.BaseSyntheticEvent) => void
    }
    addCardHandlers: {
        adding: boolean
        onToggleAdding: (e: React.BaseSyntheticEvent) => void
        onTyping: (e: React.ChangeEvent<HTMLInputElement>) => void
        onSubmit: (e: React.BaseSyntheticEvent) => void
    }
}

const Lane = ({
    lane: { id, laneName, cards, sequence },
    handlers: { editingLane, onToggleEditing },
    addCardHandlers,
}: Props) => {
    return (
        <div className="lane round" id={id}>
            <div className="editing-buttons">
                <MoveBtn />
                <div>
                    <EditBtn />
                    <DeleteBtn />
                </div>
                <MoveBtn />
            </div>
            <div className="lane-head">
                <p>{laneName}</p>
            </div>
            <Cards cards={cards} addCardHandlers={addCardHandlers} />
        </div>
    )
}

export default Lane
