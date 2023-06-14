import { BoardType } from '../types'
import { useState } from 'react'
import config from '../../../config'

function useCard(data: BoardType | null, stale: boolean, setStale: Function) {
    const [editingCard, setEditingCard] = useState<null | string>(null)

    function handleToggleEditingCard(e: React.BaseSyntheticEvent, id: string) {
        if ('key' in e && e.key === 'Escape') {
            setEditingCard(null)
        } else if (e.type === 'click') {
            setEditingCard(editingCard === id ? null : id)
        }
    }

    async function handleEditCardText(
        e: React.BaseSyntheticEvent,
        ids: { laneId: string; cardId: string },
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
                await postCardText(data?.id, ids.laneId, ids.cardId, {
                    cardName: newName,
                    cardDescr: newDescr,
                })
                setStale(!stale)
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
                `${config.apiAddress}:${config.apiPort}/boards/${boardId}/lanes/${laneId}/cards/${cardId}`,
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
        ids: {
            laneId: string
            cardId: string
            leftLaneId?: string | undefined
            rightLaneId?: string | undefined
        },
        type: string
    ) {
        switch (type) {
            case 'left':
                moveCardToLane(data?.id, ids.laneId, ids.cardId, ids.leftLaneId)
                break
            case 'right':
                moveCardToLane(
                    data?.id,
                    ids.laneId,
                    ids.cardId,
                    ids.rightLaneId
                )
                break
            case 'up':
                moveCardInLane(data?.id, ids.laneId, ids.cardId, -1)
                break
            case 'down':
                moveCardInLane(data?.id, ids.laneId, ids.cardId, 1)
        }
    }

    async function moveCardInLane(
        boardId: string | undefined,
        laneId: string,
        cardId: string,
        sequenceShift: number
    ) {
        const response = await fetch(
            `${config.apiAddress}:${config.apiPort}/boards/${boardId}/lanes/${laneId}/cards/${cardId}`,
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
            console.error('Failed to move card in DB.')
        }
    }

    async function moveCardToLane(
        boardId: string | undefined,
        laneId: string,
        cardId: string,
        destinationLaneId: string | undefined
    ) {
        const response = await fetch(
            `${config.apiAddress}:${config.apiPort}/boards/${boardId}/lanes/${laneId}/cards/${cardId}/move-to-lane/${destinationLaneId}`,
            {
                method: 'PATCH',
            }
        )

        if (response.ok) {
            setStale(!stale)
        } else {
            console.error('Failed to move card in DB.')
        }
    }

    async function handleDeleteCard(
        e: React.BaseSyntheticEvent,
        ids: { laneId: string; cardId: string }
    ) {
        const msg = 'Are you sure you want to delete this card?'
        if (confirm(msg)) {
            const response = await fetch(
                `${config.apiAddress}:${config.apiPort}/boards/${data?.id}/lanes/${ids.laneId}/cards/${ids.cardId}`,
                {
                    method: 'DELETE',
                }
            )

            if (response.ok) {
                setStale(!stale)
            } else {
                console.error('Failed to delete card from DB.')
            }
        }
    }

    return {
        editing: editingCard,
        onToggleEditing: handleToggleEditingCard,
        onEditCardText: handleEditCardText,
        onMoveCard: handleMoveCard,
        onDeleteCard: handleDeleteCard,
    }
}

export default useCard
