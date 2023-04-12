import type { CardType, LaneType } from './types'
import Cards from './Cards'
import { DeleteBtn, EditBtn, MoveBtn } from './buttons'

interface Props {
    lane: LaneType
    handlers: {
        editingLane: boolean
        onStartEditing: () => void
    }
    addCardHandlers: {
        adding: boolean
        onAdding: () => void
        onTyping: (e: React.ChangeEvent<HTMLInputElement>) => void
        onSubmit: (e: React.BaseSyntheticEvent) => void
    }
}

const Lane = ({
    lane: { id, laneName, cards, sequence },
    handlers: { editingLane, onStartEditing },
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
