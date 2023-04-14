type AddCardHandlerProps = {
    adding: null | number
    onToggleAdding: (e: React.BaseSyntheticEvent, index: number) => void
    onSubmit: (e: React.BaseSyntheticEvent, laneId: string) => void
}

export default AddCardHandlerProps
