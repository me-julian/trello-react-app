type BoardHandlerProps = {
    editing: boolean
    onToggleEditing: (e: React.BaseSyntheticEvent) => void
    onEditBoardName: (
        e: React.BaseSyntheticEvent,
        id: string,
        currName: string
    ) => void
}

export default BoardHandlerProps
