import { BoardType } from '../types'
import { BaseSyntheticEvent, useState } from 'react'

function useLane(data: BoardType | null, setStale: Function) {
    const [editingLane, setEditingLane] = useState<null | number>(null)

    function handleToggleEditingLane(e: BaseSyntheticEvent, index: number) {
        if ('key' in e && e.key === 'Escape') {
            setEditingLane(null)
        } else if (e.type === 'click') {
            setEditingLane(editingLane === index ? null : index)
        }
    }

    function handleEditLaneName(e: React.BaseSyntheticEvent) {
        e.preventDefault()
    }

    return {
        editing: editingLane,
        onToggleEditing: handleToggleEditingLane,
        onEditLaneName: handleEditLaneName,
    }
}

export default useLane
