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

    async function handleEditLaneName(e: React.BaseSyntheticEvent, id: string) {
        e.preventDefault()

        const laneName = e.target['lane-name'].value
        if (laneName.trim() === '') {
            alert('Lane must have a name.')
        } else {
            try {
                await postLaneName(data?.id, id, laneName)
                setStale(true)
                setEditingLane(null)
            } catch {
                console.error('Failed to update lane name in DB.')
            }
        }
    }

    function postLaneName(
        boardId: string | undefined,
        laneId: string | undefined,
        laneName: string
    ): Promise<Response> {
        return new Promise(async (resolve, reject) => {
            const response = await fetch(
                `http://localhost:5000/boards/${boardId}/lanes/${laneId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ laneName: laneName }),
                }
            )

            if (response.ok) {
                resolve(response)
            } else {
                reject(response)
            }
        })
    }

    return {
        editing: editingLane,
        onToggleEditing: handleToggleEditingLane,
        onEditLaneName: handleEditLaneName,
    }
}

export default useLane
