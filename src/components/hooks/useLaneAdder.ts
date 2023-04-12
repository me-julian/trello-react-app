import { BoardType } from '../types'
import { useState } from 'react'

function useLaneAdder(boardData: BoardType | null, setStale: Function) {
    const [addingLane, setAddingLane] = useState(false)
    const [addInput, setAddInput] = useState('')

    function handleToggleAddingLane(e: React.BaseSyntheticEvent) {
        if ('key' in e && e.key === 'Escape') {
            setAddingLane(!addingLane)
        } else if (e.type === 'click') {
            setAddingLane(!addingLane)
        }
    }

    function handleTypingNewLane(e: React.ChangeEvent<HTMLInputElement>) {
        setAddInput(e.target.value)
    }

    async function handleAddNewLane(e: React.BaseSyntheticEvent) {
        e.preventDefault()

        const laneName = e.target['lane-name'].value
        if (laneName.trim() === '') {
            alert('Lane must have a name.')
        } else {
            try {
                await postNewLane(boardData?.id, laneName)

                setStale(true)
                setAddInput('')
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
                `http://localhost:5000/boards/${boardId}/lanes`,
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
        addingLane,
        handleToggleAddingLane,
        handleTypingNewLane,
        handleAddNewLane,
        postNewLane,
    }
}

export default useLaneAdder
