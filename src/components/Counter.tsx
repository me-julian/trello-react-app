interface Props {
    count: number
}

function Counter({ count }: Props) {
    return <span className="counter">Lanes: {count}</span>
}

export default Counter
