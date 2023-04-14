import { AddCardHandlerProps, CardHandlerProps, CardType } from './types'
import Card from './Card'
import { AddCardBtn } from './buttons'

interface Props {
    cards: Array<CardType>
    leftEnd: boolean
    rightEnd: boolean
    addCardHandlers: AddCardHandlerProps
    cardHandlers: CardHandlerProps
}

function Cards({
    cards,
    leftEnd,
    rightEnd,
    addCardHandlers,
    cardHandlers,
}: Props) {
    return (
        <>
            <div className="card-container round">
                {cards.map((card, index) => (
                    <Card
                        key={card.id}
                        card={card}
                        index={index}
                        topEnd={index === 0}
                        bottomEnd={index === cards.length - 1}
                        leftEnd={leftEnd}
                        rightEnd={rightEnd}
                        handlers={cardHandlers}
                    />
                ))}
            </div>
            <AddCardBtn handlers={addCardHandlers} />
        </>
    )
}

export default Cards
