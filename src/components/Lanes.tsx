import { LaneType } from './types'
import Lane from './Lane'

interface Props {
    lanes: Array<LaneType>
    addCardHandlers: {
        adding: boolean
        onToggleAdding: (e: React.BaseSyntheticEvent) => void
        onTyping: (e: React.ChangeEvent<HTMLInputElement>) => void
        onSubmit: (e: React.BaseSyntheticEvent) => void
    }
    laneHandlers: {
        editingLane: boolean
        onToggleEditing: (e: React.BaseSyntheticEvent) => void
    }
}

function Lanes({ lanes, addCardHandlers, laneHandlers }: Props) {
    return (
        <>
            {lanes.map((lane) => (
                <Lane
                    key={lane.id}
                    lane={lane}
                    handlers={laneHandlers}
                    addCardHandlers={addCardHandlers}
                />
            ))}
        </>
    )
}

export default Lanes
