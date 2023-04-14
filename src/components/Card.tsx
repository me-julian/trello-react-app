import { CardHandlerProps, CardType } from './types'
import { DeleteBtn, EditBtn, MoveBtn } from './buttons'

interface Props {
    card: CardType
    laneId: string
    index: number
    topEnd: boolean
    bottomEnd: boolean
    leftEnd: boolean
    rightEnd: boolean
    handlers: CardHandlerProps
}

function Card({
    card: { id, cardName, cardDescr, sequence },
    laneId,
    index,
    topEnd,
    bottomEnd,
    leftEnd,
    rightEnd,
    handlers: {
        editing,
        onToggleEditing,
        onEditCardName,
        onMoveCard,
        onDeleteCard,
    },
}: Props) {
    return (
        <div id={id} className="card round">
            <div className="editing-buttons">
                <MoveBtn
                    iconType={'left'}
                    ids={{ laneId: laneId, cardId: id }}
                    active={leftEnd}
                    onClick={onMoveCard}
                />
                <MoveBtn
                    iconType={'up'}
                    ids={{ laneId: laneId, cardId: id }}
                    active={topEnd}
                    onClick={onMoveCard}
                />
                <div>
                    <EditBtn index={index} onClick={onToggleEditing} />
                    <DeleteBtn
                        ids={{ laneId: laneId, cardId: id }}
                        onClick={onDeleteCard}
                    />
                </div>
                <MoveBtn
                    iconType={'down'}
                    ids={{ laneId: laneId, cardId: id }}
                    active={bottomEnd}
                    onClick={onMoveCard}
                />
                <MoveBtn
                    iconType={'right'}
                    ids={{ laneId: laneId, cardId: id }}
                    active={rightEnd}
                    onClick={onMoveCard}
                />
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
