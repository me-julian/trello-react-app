import { LaneType } from './types'
import Lane from './Lane'

interface Props {
    lanes: Array<LaneType>
    addCardHandlers: {
        adding: boolean
        onAdding: () => void
        onTyping: (e: React.ChangeEvent<HTMLInputElement>) => void
        onSubmit: (e: React.BaseSyntheticEvent) => void
    }
    laneHandlers: {
        editingLane: boolean
        onStartEditing: () => void
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
