type CardHandlerProps = {
    editing: null | number
    onToggleEditing: (e: React.BaseSyntheticEvent, index: number) => void
    onEditCardName: (
        e: React.BaseSyntheticEvent,
        laneId: string,
        cardId: string,
        currName: string,
        currDescr: string
    ) => void
    onMoveCard: (
        e: React.BaseSyntheticEvent,
        laneId: string,
        cardId: string,
        type: string
    ) => void
    onDeleteCard: (
        e: React.BaseSyntheticEvent,
        laneId: string,
        cardId: string
    ) => void
}

export default CardHandlerProps
