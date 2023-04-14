import { BoardType } from '../types'
import { useState } from 'react'

function useCardAdder(
    boardData: BoardType | null,
    stale: boolean,
    setStale: Function
) {
    const [addingCard, setAddingCard] = useState<null | string>(null)

    function handleAddingCard(e: React.BaseSyntheticEvent, laneId: string) {
        if ('key' in e && e.key === 'Escape') {
            setAddingCard(null)
        } else if (e.type === 'click') {
            setAddingCard(addingCard === laneId ? null : laneId)
        }
    }

    async function handleAddNewCard(
        e: React.BaseSyntheticEvent,
        laneId: string
    ) {
        e.preventDefault()

        console.log('submit')

        const newName = e.target['card-name'].value
        const newDescr = e.target['card-descr'].value
        if (newName.trim() === '') {
            alert('Card must have a name.')
        } else {
            try {
                await postNewCard(boardData?.id, laneId, {
                    cardName: newName,
                    cardDescr: newDescr,
                })
                setStale(!stale)
                setAddingCard(null)
            } catch {
                console.error('Failed to add card to DB.')
            }
        }
    }

    function postNewCard(
        boardId: string | undefined,
        laneId: string,
        cardData: { cardName: string; cardDescr?: string }
    ): Promise<Response> {
        return new Promise(async (resolve, reject) => {
            const response = await fetch(
                `http://localhost:5000/boards/${boardId}/lanes/${laneId}/cards`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cardData),
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
        adding: addingCard,
        onToggleAdding: handleAddingCard,
        onSubmit: handleAddNewCard,
    }
}

export default useCardAdder
