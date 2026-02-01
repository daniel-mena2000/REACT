import type { MenuItem } from "../types/types.ts"
import { OrderActions } from "../reducers/orderReducer.tsx"
type MenuItemProps = {
    item: MenuItem,
    dispatch:  React.Dispatch<OrderActions>
}

export function MenuItem({item,dispatch} : MenuItemProps) {
    return (
        <button onClick={() => dispatch({type: 'addItem', payload: {item}})} className="border-2 border-red-300 hover:bg-red-200 w-full p-3 flex justify-between mb-4">
        <p><i className='bx bx-chevron-right'></i>{item.name}</p>
        <p className="font-black">${item.price}</p>
        </button>
     )
}
