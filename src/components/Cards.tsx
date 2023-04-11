import { CardType } from './types'
import Card from './Card'
import { AddNewBtn } from './buttons'

interface Props {
    cards: Array<CardType>
}

function Cards({ cards }: Props) {
    return (
        <>
            <div className="card-container round">
                {cards.map((card) => (
                    <Card key={card.id} card={card} />
                ))}
            </div>
            <AddNewBtn
                onSubmit={() => {
                    return null
                }}
            />
        </>
    )
}

export default Cards
