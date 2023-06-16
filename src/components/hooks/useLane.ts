import { BoardType, LaneType } from '../types'
import { useState } from 'react'

function useLane(data: BoardType | null, stale: boolean, setStale: Function) {
    const [editingLane, setEditingLane] = useState<null | string>(null)

    function handleToggleEditingLane(e: React.BaseSyntheticEvent, id: string) {
        if ('key' in e && e.key === 'Escape') {
            setEditingLane(null)
        } else if (e.type === 'click') {
            setEditingLane(editingLane === id ? null : id)
        }
    }

    async function handleEditLaneName(
        e: React.BaseSyntheticEvent,
        ids: { laneId: string },
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
                await postLaneName(data!.id, ids.laneId, newName)
                setStale(!stale)
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
                `${__API_ADDRESS__}:${__API_PORT__}/boards/${boardId}/lanes/${laneId}`,
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
        ids: { laneId: string },
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
            `${__API_ADDRESS__}:${__API_PORT__}/boards/${data!.id}/lanes/${
                ids.laneId
            }`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sequenceShift: sequenceShift }),
            }
        )

        if (response.ok) {
            setStale(!stale)
        } else {
            console.error('Failed to move lane in DB.')
        }
    }

    async function handleDeleteLane(
        e: React.BaseSyntheticEvent,
        ids: { laneId: string }
    ) {
        const msg = 'Are you sure you want to delete this lane?'
        if (confirm(msg)) {
            const lanes = data!.lanes
            const lane = lanes.find((lane) => lane.id === ids.laneId)
            const cards = lane?.cards
            if (lanes.length > 1 && cards!.length > 0) {
                const transferMsg =
                    'Would you like to move the cards to another lane before deleting?'
                if (confirm(transferMsg)) {
                    selectDestinationLane(data!, lanes, lane!)
                } else {
                    deleteLaneRequest(data!.id, ids.laneId)
                }
            } else {
                deleteLaneRequest(data!.id, ids.laneId)
            }
        }
    }

    async function deleteLaneRequest(boardId: string, laneId: string) {
        const response = await fetch(
            `${__API_ADDRESS__}:${__API_PORT__}/boards/${boardId}/lanes/${laneId}`,
            {
                method: 'DELETE',
            }
        )

        if (response.ok) {
            setStale(!stale)
        } else {
            console.error('Failed to delete lane from DB.')
        }
    }

    function selectDestinationLane(
        data: BoardType,
        lanes: Array<LaneType>,
        laneToDelete: LaneType
    ) {
        const selectLane = prompt(
            "Enter a number for the lane you'd like to move the cards to (left-to-right)."
        )

        const selectedLane = lanes[parseInt(selectLane!) - 1]
        if (selectedLane) {
            if (selectedLane === laneToDelete) {
                alert(
                    "Please select a lane other than the one you're deleting."
                )
            } else {
                deleteAndTransfer(data.id, laneToDelete.id, selectedLane.id)
            }
        } else {
            alert(
                `No lane for "${selectLane}". If you'd like to move the cards to the leftmost lane, enter "1", and so on.`
            )
        }
    }

    async function deleteAndTransfer(
        boardId: string,
        laneId: string,
        destinationLaneId: string
    ) {
        const response = await fetch(
            `${__API_ADDRESS__}:${__API_PORT__}/boards/${boardId}/lanes/${laneId}/delete-and-transfer/${destinationLaneId}`,
            {
                method: 'PATCH',
            }
        )

        if (response.ok) {
            setStale(!stale)
        } else {
            console.error('Failed to delete lane from DB.')
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
