import { BoardType } from '../types'
import { useState } from 'react'

function useBoard(data: BoardType | null, setData: Function) {
    const [editingBoard, setEditingBoard] = useState(false)

    function handleToggleEditingBoard(e: React.BaseSyntheticEvent) {
        if ('key' in e && e.key === 'Escape') {
            setEditingBoard(!editingBoard)
        } else if (e.type === 'click') {
            setEditingBoard(!editingBoard)
        }
    }

    function handleTypingBoard(e: React.ChangeEvent<HTMLInputElement>) {
        setData({ ...data, boardName: e.target.value })
    }

    async function handleEditBoardName(e: React.BaseSyntheticEvent) {
        e.preventDefault()

        const boardName = e.target['board-name'].value
        if (boardName.trim() === '') {
            alert('Board must have a name.')
        } else {
            try {
                await postBoardName(data?.id, boardName)
                setData({ ...data, boardName: boardName })
                setEditingBoard(false)
            } catch {
                console.error('Failed to update board name in DB.')
            }
        }
    }

    function postBoardName(
        boardId: string | undefined,
        boardName: string
    ): Promise<Response> {
        return new Promise(async (resolve, reject) => {
            const response = await fetch(
                `http://localhost:5000/boards/${boardId}`,
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
        onTyping: handleTypingBoard,
        onEditBoardName: handleEditBoardName,
    }
}

export default useBoard
