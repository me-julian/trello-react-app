type LaneHandlerProps = {
    editing: null | string
    onToggleEditing: (e: React.BaseSyntheticEvent, id: string) => void
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
