import { BoardType } from '../types'
import { useState } from 'react'

function useLane(data: BoardType | null, setData: Function) {
    const [editingLane, setEditingLane] = useState(false)

    function handleStartEditingLane() {
        setEditingLane(true)
    }

    return {
        editingLane,
        handleStartEditingLane,
    }
}

export default useLane
