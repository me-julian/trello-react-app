import { LaneType } from './types'
import Lane from './Lane'

interface Props {
    lanes: Array<LaneType>
    addCardHandlers: {
        adding: boolean
        onToggleAdding: (e: React.BaseSyntheticEvent) => void
        onSubmit: (e: React.BaseSyntheticEvent) => void
    }
    laneHandlers: {
        editing: null | number
        onToggleEditing: (e: React.BaseSyntheticEvent, index: number) => void
        onEditLaneName: (
            e: React.BaseSyntheticEvent,
            id: string,
            currName: string
        ) => void
        onMoveLane: (
            e: React.BaseSyntheticEvent,
            id: string,
            type: string
        ) => void
        onDeleteLane: (e: React.BaseSyntheticEvent, id: string) => void
    }
}

function Lanes({ lanes, addCardHandlers, laneHandlers }: Props) {
    return (
        <>
            {lanes.map((lane, index) => (
                <Lane
                    key={lane.id}
                    index={index}
                    leftEnd={index === 0}
                    rightEnd={index === lanes.length - 1}
                    lane={lane}
                    handlers={laneHandlers}
                    addCardHandlers={addCardHandlers}
                />
            ))}
        </>
    )
}

export default Lanes
