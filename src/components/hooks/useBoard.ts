import { BoardType } from '../types'
import { useState } from 'react'
import config from '../../../config'

function useBoard(data: BoardType | null, setData: Function) {
    const [editingBoard, setEditingBoard] = useState(false)

    function handleToggleEditingBoard(e: React.BaseSyntheticEvent) {
        if ('key' in e && e.key === 'Escape') {
            setEditingBoard(!editingBoard)
        } else if (e.type === 'click') {
            setEditingBoard(!editingBoard)
        }
    }

    async function handleEditBoardName(
        e: React.BaseSyntheticEvent,
        id: string,
        currName: string
    ) {
        e.preventDefault()

        const newName = e.target['board-name'].value
        if (newName === currName) {
            setEditingBoard(false)
        } else if (newName.trim() === '') {
            alert('Board must have a name.')
        } else {
            try {
                await postBoardName(id, newName)
                setData({ ...data, boardName: newName })
                setEditingBoard(false)
            } catch {
                console.error('Failed to update board name in DB.')
            }
        }
    }

    function postBoardName(
        boardId: string,
        boardName: string
    ): Promise<Response> {
        return new Promise(async (resolve, reject) => {
            const response = await fetch(
                `${config.apiAddress}:${config.apiPort}/boards/${boardId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ boardName: boardName }),
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
        editing: editingBoard,
        onToggleEditing: handleToggleEditingBoard,
        onEditBoardName: handleEditBoardName,
    }
}

export default useBoard
