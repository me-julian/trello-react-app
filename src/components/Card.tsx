import { CardHandlerProps, CardType } from './types'
import { DeleteBtn, EditBtn, MoveBtn } from './buttons'
import { useCardForm } from './hooks'

interface Props {
    card: CardType
    laneId: string
    topEnd: boolean
    bottomEnd: boolean
    leftEnd: boolean
    rightEnd: boolean
    handlers: CardHandlerProps
}

function Card({
    card: { id, cardName, cardDescr, sequence },
    laneId,
    topEnd,
    bottomEnd,
    leftEnd,
    rightEnd,
    handlers: {
        editing,
        onToggleEditing,
        onEditCardText,
        onMoveCard,
        onDeleteCard,
    },
}: Props) {
    const [
        tempName,
        setTempName,
        tempDescr,
        setTempDescr,
        formRef,
        descrRef,
        handleAdvanceCursor,
        handleEnterSubmit,
    ] = useCardForm(editing, cardName, cardDescr)

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
                    <EditBtn id={id} onClick={onToggleEditing} />
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
            {editing !== id && (
                <>
                    <div className="card-head">
                        <p>{cardName}</p>
                    </div>
                    <div className="card-body">
                        <p>{cardDescr}</p>
                    </div>
                </>
            )}
            {editing === id && (
                <form
                    ref={formRef}
                    onSubmit={(e) =>
                        onEditCardText(
                            e,
                            { laneId: laneId, cardId: id },
                            cardName,
                            cardDescr
                        )
                    }
                    onKeyDown={(e) => onToggleEditing(e, id)}
                >
                    <label>
                        <input
                            name="card-name"
                            placeholder="Name your card"
                            value={tempName}
                            type="text"
                            autoFocus
                            onChange={(e) => setTempName(e.target.value)}
                            onKeyDown={handleAdvanceCursor}
                        />
                    </label>
                    <label>
                        <input
                            ref={descrRef}
                            name="card-descr"
                            placeholder="Add a card description"
                            value={tempDescr}
                            type="text"
                            onChange={(e) => setTempDescr(e.target.value)}
                            onKeyDown={handleEnterSubmit}
                        />
                    </label>
                </form>
            )}
        </div>
    )
}

export default Card
