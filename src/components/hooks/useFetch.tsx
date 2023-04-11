import { FetchParams } from '../types'
import { useState, useEffect } from 'react'

export default function useFetch<ReturnType>({
    url,
    options,
    reactives,
}: FetchParams): ReturnType | null {
    console.log(`Fetching data on url ${url}`)

    const [data, setData] = useState(null)
    useEffect(() => {
        console.log('Use effect')
        let ignore = false

        async function fetchData() {
            if (!ignore) {
                const response = await fetch(url, options)
                console.log('awaiting')

                const data = await response.json()
                console.log(data)
                setData(data)
            }
        }

        fetchData()

        return () => {
            console.log('ignore')
            ignore = true
        }
    }, [...reactives])
    return data
}
