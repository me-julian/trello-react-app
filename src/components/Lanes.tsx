import { AddCardHandlerProps, LaneHandlerProps, LaneType } from './types'
import Lane from './Lane'

interface Props {
    lanes: Array<LaneType>
    addCardHandlers: AddCardHandlerProps
    laneHandlers: LaneHandlerProps
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
