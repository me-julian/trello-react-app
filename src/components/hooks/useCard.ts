import { BoardType } from '../types'
import { useState } from 'react'

function useCard(data: BoardType | null, setStale: Function) {
    const [editingCard, setEditingCard] = useState<null | number>(null)

    function handleToggleEditingCard(
        e: React.BaseSyntheticEvent,
        index: number
    ) {
        if ('key' in e && e.key === 'Escape') {
            setEditingCard(null)
        } else if (e.type === 'click') {
            setEditingCard(editingCard === index ? null : index)
        }
    }

    async function handleEditCardName(
        e: React.BaseSyntheticEvent,
        laneId: string,
        cardId: string,
        currName: string,
        currDescr: string
    ) {
        e.preventDefault()

        const newName = e.target['card-name'].value
        const newDescr = e.target['card-descr'].value
        if (newName === currName && newDescr === currDescr) {
            setEditingCard(null)
        } else if (newName.trim() === '') {
            alert('Card must have a name.')
        } else {
            try {
                await postCardText(data?.id, laneId, cardId, {
                    cardName: newName,
                    cardDescr: newDescr,
                })
                setStale(true)
                setEditingCard(null)
            } catch {
                console.error('Failed to update card name in DB.')
            }
        }
    }

    function postCardText(
        boardId: string | undefined,
        laneId: string,
        cardId: string,
        cardData: { cardName?: string; cardDescr?: string }
    ): Promise<Response> {
        return new Promise(async (resolve, reject) => {
            const response = await fetch(
                `http://localhost:5000/boards/${boardId}/lanes/${laneId}/cards/${cardId}`,
                {
                    method: 'PATCH',
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

    async function handleMoveCard(
        e: React.BaseSyntheticEvent,
        laneId: string,
        cardId: string,
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
            `http://localhost:5000/boards/${data?.id}/lanes/${laneId}/cards/${cardId}`,
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
            console.error('Failed to move card in DB.')
        }
    }

    async function handleDeleteCard(
        e: React.BaseSyntheticEvent,
        laneId: string,
        cardId: string
    ) {
        const msg = 'Are you sure you want to delete this card?'
        if (confirm(msg)) {
            const response = await fetch(
                `http://localhost:5000/boards/${data?.id}/lanes/${laneId}/cards/${cardId}`,
                {
                    method: 'DELETE',
                }
            )

            if (response.ok) {
                setStale(true)
            } else {
                console.error('Failed to delete card from DB.')
            }
        }
    }

    return {
        editing: editingCard,
        onToggleEditing: handleToggleEditingCard,
        onEditCardName: handleEditCardName,
        onMoveCard: handleMoveCard,
        onDeleteCard: handleDeleteCard,
    }
}

export default useCard
