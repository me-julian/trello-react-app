import {
    AddCardHandlerProps,
    CardHandlerProps,
    LaneHandlerProps,
    LaneType,
} from './types'
import Lane from './Lane'

interface Props {
    lanes: Array<LaneType>
    addCardHandlers: AddCardHandlerProps
    laneHandlers: LaneHandlerProps
    cardHandlers: CardHandlerProps
}

function Lanes({ lanes, addCardHandlers, laneHandlers, cardHandlers }: Props) {
    return (
        <>
            {lanes.map((lane, index) => (
                <Lane
                    key={lane.id}
                    leftEnd={index === 0 ? null : lanes[index - 1].id}
                    rightEnd={
                        index === lanes.length - 1 ? null : lanes[index + 1].id
                    }
                    lane={lane}
                    handlers={laneHandlers}
                    addCardHandlers={addCardHandlers}
                    cardHandlers={cardHandlers}
                />
            ))}
        </>
    )
}

export default Lanes
