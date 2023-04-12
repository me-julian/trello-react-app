import { BoardType } from '../types'
import { BaseSyntheticEvent, useState } from 'react'

function useLane(data: BoardType | null, setStale: Function) {
    const [editingLane, setEditingLane] = useState(false)

    function handleToggleEditingLane(e: BaseSyntheticEvent) {
        if ('key' in e && e.key === 'Escape') {
            setEditingLane(!editingLane)
        } else if (e.type === 'click') {
            setEditingLane(!editingLane)
        }
    }

    return {
        editingLane,
        handleToggleEditingLane,
    }
}

export default useLane
