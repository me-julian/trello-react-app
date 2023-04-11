import { LaneType } from './types'
import Lane from './Lane'

interface Props {
    lanes: Array<LaneType>
}

function Lanes({ lanes }: Props) {
    return (
        <>
            {lanes.map((lane) => (
                <Lane key={lane.id} lane={lane} />
            ))}
        </>
    )
}

export default Lanes
