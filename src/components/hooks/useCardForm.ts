import { useRef } from 'react'
import useTemporaryValue from './useTemporaryValue'

function useCardForm(
    activeId: null | string,
    initialName: string,
    initialDescr: string
): [
    string,
    React.Dispatch<React.SetStateAction<string>>,
    string,
    React.Dispatch<React.SetStateAction<string>>,
    React.MutableRefObject<null | HTMLFormElement>,
    React.MutableRefObject<null | HTMLInputElement>,
    (e: React.KeyboardEvent<HTMLInputElement>) => void,
    (e: React.KeyboardEvent<HTMLInputElement>) => void
] {
    const [tempName, setTempName] = useTemporaryValue(initialName, activeId)
    const [tempDescr, setTempDescr] = useTemporaryValue(initialDescr, activeId)

    const formRef = useRef<null | HTMLFormElement>(null)
    const descrRef = useRef<null | HTMLInputElement>(null)

    function handleAdvanceCursor(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            descrRef.current?.focus()
        }
    }

    function handleEnterSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            formRef.current?.dispatchEvent(
                new Event('submit', { cancelable: true, bubbles: true })
            )
        }
    }

    return [
        tempName,
        setTempName,
        tempDescr,
        setTempDescr,
        formRef,
        descrRef,
        handleAdvanceCursor,
        handleEnterSubmit,
    ]
}

export default useCardForm
