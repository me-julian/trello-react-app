import { BoardType } from '../types'
import { useState } from 'react'

function useCardAdder(boardData: BoardType | null, setStale: Function) {
    const [addingCard, setAddingCard] = useState(false)
    const [addInput, setAddInput] = useState('')

    function handleAddingCard(e: React.BaseSyntheticEvent) {
        if ('key' in e && e.key === 'Escape') {
            setAddingCard(!addingCard)
        } else if (e.type === 'click') {
            setAddingCard(!addingCard)
        }
    }

    function handleTypingNewCard(e: React.ChangeEvent<HTMLInputElement>) {
        // setAddInput(e.target.value)
    }

    async function handleAddNewCard(e: React.BaseSyntheticEvent) {
        e.preventDefault()

        // const laneName = e.target['lane-name'].value
        // if (laneName.trim() === '') {
        //     alert('Lane must have a name.')
        // } else {
        //     try {
        //         await postNewCard(boardData?.id, laneName)

        //         setStale(true)
        //         setAddInput('')
        //         setAddingCard(false)
        //     } catch {
        //         console.error('Failed to add new lane to DB.')
        //     }
        // }
    }

    function postNewCard(
        boardId: string | undefined,
        laneName: string
    ): Promise<Response> {
        return new Promise(async (resolve, reject) => {
            // const response = await fetch(
            //     `http://localhost:5000/boards/${boardId}/lanes`,
            //     {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({ laneName: laneName }),
            //     }
            // )
            // if (response.ok) {
            //     resolve(response)
            // } else {
            //     reject(response)
            // }
        })
    }

    return {
        addingCard,
        handleAddingCard,
        handleTypingNewCard,
        handleAddNewCard,
        postNewCard,
    }
}

export default useCardAdder
