import { CardHandlerProps, CardType } from './types'
import { DeleteBtn, EditBtn, MoveBtn } from './buttons'

interface Props {
    card: CardType
    index: number
    topEnd: boolean
    bottomEnd: boolean
    leftEnd: boolean
    rightEnd: boolean
    handlers: CardHandlerProps
}

function Card({
    card: { id, cardName, cardDescr, sequence },
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
                {/* <MoveBtn iconType={'left'} parentId={id} active={leftEnd} />
                <MoveBtn iconType={'up'} parentId={id} active={topEnd} /> */}
                <div>
                    {/* <EditBtn onClick={onToggleEditing} index={index} />
                    <DeleteBtn onClick={onDeleteCard} parentId={id} /> */}
                </div>
                {/* <MoveBtn iconType={'down'} parentId={id} active={bottomEnd} />
                <MoveBtn iconType={'right'} parentId={id} active={rightEnd} /> */}
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
