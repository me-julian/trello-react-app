import { CardType } from './types'
import Card from './Card'
import { AddNewBtn } from './buttons'

interface Props {
    cards: Array<CardType>
    addCardHandlers: {
        adding: boolean
        onToggleAdding: (e: React.BaseSyntheticEvent) => void
        onTyping: (e: React.ChangeEvent<HTMLInputElement>) => void
        onSubmit: (e: React.BaseSyntheticEvent) => void
    }
}

function Cards({ cards, addCardHandlers }: Props) {
    return (
        <>
            <div className="card-container round">
                {cards.map((card) => (
                    <Card key={card.id} card={card} />
                ))}
            </div>
            <AddNewBtn handlers={addCardHandlers} />
        </>
    )
}

export default Cards
