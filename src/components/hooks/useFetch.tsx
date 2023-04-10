import { useState, useEffect } from 'react'

interface Params {
    url: URL
    options: {
        method: 'POST' | 'GET' | 'PATCH' | 'DELETE'
        headers?: HeadersInit
        body?: BodyInit
    }
    // Reactive values in url for useEffect to track
    ids: Array<string>
}

export default function useFetch<ReturnType>({
    url,
    options,
    ids,
}: Params): ReturnType | null {
    console.log(`Fetching data on url ${url}`)

    const [data, setData] = useState(null)
    useEffect(() => {
        console.log('Use effect')
        let ignore = false

        async function fetchData() {
            const response = await fetch(url, options)

            const data = await response.json()

            if (!ignore) {
                console.log(data)
                setData(data)
            }
        }

        fetchData()

        return () => {
            console.log('ignore')
            ignore = true
        }
    }, [...ids])
    return data
}
