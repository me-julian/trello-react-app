import { BoardType } from '../types'
import { useState } from 'react'
import config from '../../../config'

function useLaneAdder(
    boardData: BoardType | null,
    stale: boolean,
    setStale: Function
) {
    const [addingLane, setAddingLane] = useState(false)

    function handleToggleAddingLane(e: React.BaseSyntheticEvent) {
        if ('key' in e && e.key === 'Escape') {
            setAddingLane(!addingLane)
        } else if (e.type === 'click') {
            setAddingLane(!addingLane)
        }
    }

    async function handleAddNewLane(
        e: React.BaseSyntheticEvent,
        active: boolean
    ) {
        e.preventDefault()

        if (!active) {
            return
        }

        const laneName = e.target['lane-name'].value
        if (laneName.trim() === '') {
            alert('Lane must have a name.')
        } else {
            try {
                await postNewLane(boardData?.id, laneName)

                setStale(!stale)
                setAddingLane(false)
            } catch {
                console.error('Failed to add new lane to DB.')
            }
        }
    }

    function postNewLane(
        boardId: string | undefined,
        laneName: string
    ): Promise<Response> {
        return new Promise(async (resolve, reject) => {
            const response = await fetch(
                `${config.apiAddress}:${config.apiPort}/boards/${boardId}/lanes`,
                {
                    method: 'POST',
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
        adding: addingLane,
        onToggleAdding: handleToggleAddingLane,
        onSubmit: handleAddNewLane,
    }
}

export default useLaneAdder
