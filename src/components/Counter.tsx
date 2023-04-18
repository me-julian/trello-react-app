interface Props {
    countedObj: string
    count: number
}

function Counter({ countedObj, count }: Props) {
    return (
        <span className="counter">
            {countedObj}: {count}
        </span>
    )
}

export default Counter
