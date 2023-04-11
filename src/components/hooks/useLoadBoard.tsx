import { useState, useEffect } from 'react'

export default function useLoadBoard<ReturnType>(
    cookiedId: string,
    reactives: Array<string>
): {
    data: ReturnType | null
    error: null | Error
} {
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
                } else if (response.status === 404) {
                    console.warn('Board not found, creating new.')
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

        if (cookiedId) {
            const url = new URL(`http://localhost:5000/boards/${cookiedId}`)
            console.log('Attempting to get cookied board')

            tryGet(url, {
                options: { method: 'GET' },
                signal: abortController.signal,
            })
        } else {
            console.log(`No cookied board, creating default`)
            postAndGet()
        }

        return () => {
            console.log('Abort fetch')
            abortController.abort()
        }
    }, [...reactives])
    return { data, error }
}
