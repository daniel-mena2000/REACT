import type { MenuItem } from "../types/types.ts"

type MenuItemProps = {
    item: MenuItem,
// Esta sintaxis en muy común cuando pasemos funciones via props, y se ocupa "void" cuando la funcion no retorna nada, y si retorna pues si es necesario pasarle los parametros y que tipo de dato retornan esos parametros
    addItem: (item: MenuItem) => void
}

export function MenuItem({item,addItem} : MenuItemProps) {
    return (
        <button onClick={() => addItem(item)} className="border-2 border-red-300 hover:bg-red-200 w-full p-3 flex justify-between mb-4">
        <p><i className='bx bx-chevron-right'></i>{item.name}</p>
        <p className="font-black">${item.price}</p>
        </button>
     )
}
