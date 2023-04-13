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
        onEditLaneName: (e: React.BaseSyntheticEvent) => void
    }
}

function Lanes({ lanes, addCardHandlers, laneHandlers }: Props) {
    return (
        <>
            {lanes.map((lane, index) => (
                <Lane
                    key={lane.id}
                    index={index}
                    lane={lane}
                    handlers={laneHandlers}
                    addCardHandlers={addCardHandlers}
                />
            ))}
        </>
    )
}

export default Lanes
