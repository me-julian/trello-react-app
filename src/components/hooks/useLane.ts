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

    async function handleEditLaneName(
        e: React.BaseSyntheticEvent,
        id: string,
        currName: string
    ) {
        e.preventDefault()

        const newName = e.target['lane-name'].value
        if (newName === currName) {
            setEditingLane(null)
        } else if (newName.trim() === '') {
            alert('Lane must have a name.')
        } else {
            try {
                await postLaneName(data?.id, id, newName)
                setStale(true)
                setEditingLane(null)
            } catch {
                console.error('Failed to update lane name in DB.')
            }
        }
    }

    function postLaneName(
        boardId: string | undefined,
        laneId: string,
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

    async function handleMoveLane(
        e: React.BaseSyntheticEvent,
        id: string,
        type: string
    ) {
        let sequenceShift
        switch (type) {
            case 'left':
                sequenceShift = -1
                break
            case 'right':
                sequenceShift = 1
                break
        }

        const response = await fetch(
            `http://localhost:5000/boards/${data?.id}/lanes/${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sequenceShift: sequenceShift }),
            }
        )

        if (response.ok) {
            setStale(true)
        } else {
            console.error('Failed to move lane in DB.')
        }
    }

    async function handleDeleteLane(e: React.BaseSyntheticEvent, id: string) {
        const msg = 'Are you sure you want to delete this lane?'
        if (confirm(msg)) {
            const response = await fetch(
                `http://localhost:5000/boards/${data?.id}/lanes/${id}`,
                {
                    method: 'DELETE',
                }
            )

            if (response.ok) {
                setStale(true)
            } else {
                console.error('Failed to delete lane from DB.')
            }
        }
    }

    return {
        editing: editingLane,
        onToggleEditing: handleToggleEditingLane,
        onEditLaneName: handleEditLaneName,
        onMoveLane: handleMoveLane,
        onDeleteLane: handleDeleteLane,
    }
}

export default useLane
