import { AddCardHandlerProps, CardHandlerProps, CardType } from './types'
import Card from './Card'
import { AddCardBtn } from './buttons'

interface Props {
    cards: Array<CardType>
    leftEnd: boolean
    rightEnd: boolean
    laneId: string
    laneIndex: number
    addCardHandlers: AddCardHandlerProps
    cardHandlers: CardHandlerProps
}

function Cards({
    cards,
    leftEnd,
    rightEnd,
    laneId,
    laneIndex,
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
                        laneId={laneId}
                        index={index}
                        topEnd={index === 0}
                        bottomEnd={index === cards.length - 1}
                        leftEnd={leftEnd}
                        rightEnd={rightEnd}
                        handlers={cardHandlers}
                    />
                ))}
            </div>
            <AddCardBtn
                handlers={addCardHandlers}
                laneId={laneId}
                laneIndex={laneIndex}
            />
        </>
    )
}

export default Cards
