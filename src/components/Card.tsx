import CardType from './types/Card'
import { DeleteBtn, EditBtn, MoveBtn } from './buttons'

interface Props {
    card: CardType
}

function Card({ card: { id, cardName, cardDescr, sequence } }: Props) {
    return (
        <div id={id} className="card round">
            <div className="editing-buttons">
                <MoveBtn />
                <MoveBtn />
                <div>
                    <EditBtn />
                    <DeleteBtn />
                </div>
                <MoveBtn />
                <MoveBtn />
            </div>
            <div className="card-head">
                <p>{cardName}</p>
            </div>
            <div className="card-body">
                <p>{cardDescr}</p>
            </div>
        </div>
    )
}

export default Card
