type CardHandlerProps = {
    editing: null | number
    onToggleEditing: (e: React.BaseSyntheticEvent, index: number) => void
    onEditCardName: (
        e: React.BaseSyntheticEvent,
        ids: { laneId: string; cardId: string },
        currName: string,
        currDescr: string
    ) => void
    onMoveCard: (
        e: React.BaseSyntheticEvent,
        id: string,
        type: string,
        ids: { laneId: string; cardId: string }
    ) => void
    onDeleteCard: (
        e: React.BaseSyntheticEvent,
        ids: { laneId: string; cardId: string }
    ) => void
}

export default CardHandlerProps
