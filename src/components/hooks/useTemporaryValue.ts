import { useState, useEffect } from 'react'

function useTemporaryValue(
    initVal: string,
    resetState: any
): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [tempValue, setTempValue] = useState(initVal)

    useEffect(() => {
        setTempValue(initVal)
    }, [resetState])

    return [tempValue, setTempValue]
}

export default useTemporaryValue
