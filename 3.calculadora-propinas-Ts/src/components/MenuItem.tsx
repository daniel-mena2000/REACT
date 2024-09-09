import type { MenuItem } from "../types/types.ts"

type MenuItemProps = {
    item: MenuItem
}

export function MenuItem({item} : MenuItemProps) {
    return (
        <button className="border-2 border-t-orange-700 hover:bg-orange-100 w-full p-3 flex justify-between mb-4">
        <p><i className='bx bx-chevron-right'></i>{item.name}</p>
        <p className="font-black">${item.price}</p>
        </button>
     )
}
