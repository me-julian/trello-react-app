type LaneHandlerProps = {
    editing: null | number
    onToggleEditing: (e: React.BaseSyntheticEvent, index: number) => void
    onEditLaneName: (
        e: React.BaseSyntheticEvent,
        ids: { laneId: string },
        currName: string
    ) => void
    onMoveLane: (
        e: React.BaseSyntheticEvent,
        ids: { laneId: string },
        type: string
    ) => void
    onDeleteLane: (e: React.BaseSyntheticEvent, ids: { laneId: string }) => void
}

export default LaneHandlerProps
