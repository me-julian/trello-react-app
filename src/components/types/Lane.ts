import Card from './Card'

type Lane = {
    id: string
    laneName: string
    cards: Array<Card>
    sequence: number
}

export default Lane
