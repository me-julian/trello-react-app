type LaneHandlerProps = {
    editing: null | number
    onToggleEditing: (e: React.BaseSyntheticEvent, index: number) => void
    onEditLaneName: (
        e: React.BaseSyntheticEvent,
        id: string,
        currName: string
    ) => void
    onMoveLane: (e: React.BaseSyntheticEvent, id: string, type: string) => void
    onDeleteLane: (e: React.BaseSyntheticEvent, id: string) => void
}

export default LaneHandlerProps
