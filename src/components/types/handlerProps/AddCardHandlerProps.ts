type AddCardHandlerProps = {
    adding: null | string
    onToggleAdding: (e: React.BaseSyntheticEvent, laneId: string) => void
    onSubmit: (
        e: React.BaseSyntheticEvent,
        laneId: string,
        active: null | string
    ) => void
}

export default AddCardHandlerProps
