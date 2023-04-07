import type LaneType from './types/Lane'
import type CardType from './types/Card'
import Cards from './Cards'
import { DeleteBtn, EditBtn, MoveBtn } from './buttons'

interface Props {
    lane: LaneType
}

const Lane = ({ lane: { id, laneName, cards, sequence } }: Props) => {
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
            <Cards cards={cards} />
        </div>
    )
}

export default Lane
