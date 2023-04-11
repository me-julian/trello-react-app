import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import BoardType from '../types/Board'

export default function useLoadBoard(): {
    data: BoardType | null
    error: null | Error
} {
    const [cookies, setCookie, removeCookie] = useCookies()
    const [data, setData] = useState(null)
    const [error, setError] = useState<null | Error>(null)

    useEffect(() => {
        console.log('Use effect')

        const abortController = new AbortController()

        async function tryGet(url: URL, options: Object) {
            console.log(`Fetching board on url ${url}`)

            try {
                const response = await fetch(url, options)

                if (response.ok) {
                    const data = await response.json()
                    setData(data)
                    setError(null)
                    if (cookies.lastBoardId !== data.id) {
                        setCookie('lastBoardId', data.id, { maxAge: 86400 })
                    }
                } else if (response.status === 404) {
                    console.warn('Board not found in DB')
                    postAndGet()
                }
            } catch (err: any) {
                if (err instanceof DOMException) {
                    console.warn(err)
                } else {
                    console.error(err)
                }
                setError(err)
                setData(null)
            }
        }

        async function postAndGet() {
            console.log('Posting new')

            try {
                const createDefault = await fetch(
                    new URL('http://localhost:5000/boards'),
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            boardName: 'New Default React Board',
                        }),
                        signal: abortController.signal,
                    }
                )

                if (createDefault.ok) {
                    const data = await createDefault.json()
                    console.log('Getting posted')
                    tryGet(
                        new URL(`http://localhost:5000/boards/${data.boardId}`),
                        {
                            options: { method: 'GET' },
                            signal: abortController.signal,
                        }
                    )
                } else {
                    console.error('Failed to create default board!')
                }
            } catch (err: any) {
                if (err instanceof DOMException) {
                    console.warn(err)
                } else {
                    console.error(err)
                }
                setError(err)
                setData(null)
            }
        }

        if (cookies.lastBoardId) {
            console.log('Attempting to get cookied board')

            tryGet(
                new URL(`http://localhost:5000/boards/${cookies.lastBoardId}`),
                {
                    options: { method: 'GET' },
                    signal: abortController.signal,
                }
            )
        } else {
            console.log(`No cookied board, creating default`)
            postAndGet()
        }

        return () => {
            abortController.abort()
        }
    }, [])
    return { data, error }
}
