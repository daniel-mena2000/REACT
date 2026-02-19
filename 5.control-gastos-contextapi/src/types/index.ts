export type Expense = {
    id: string
    expenseName: string
    amount: number
    category: string
    date: Value //La libreria react-date-picker define a date como de tipo Value
}

export type DraftExpense = Omit<Expense, 'id'>

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Category = {
    id: string
    name: string
    icon: string
}
