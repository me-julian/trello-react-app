type CardHandlerProps = {
    editing: null | string
    onToggleEditing: (e: React.BaseSyntheticEvent, id: string) => void
    onEditCardText: (
        e: React.BaseSyntheticEvent,
        ids: { laneId: string; cardId: string },
        currName: string,
        currDescr: string
    ) => void
    onMoveCard: (
        e: React.BaseSyntheticEvent,
        ids: {
            laneId: string
            cardId: string
            leftLaneId?: string | undefined
            rightLaneId?: string | undefined
        },
        type: string
    ) => void
    onDeleteCard: (
        e: React.BaseSyntheticEvent,
        ids: { laneId: string; cardId: string }
    ) => void
}

export default CardHandlerProps
