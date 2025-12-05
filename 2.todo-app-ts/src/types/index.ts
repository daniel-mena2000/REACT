export type List = {
    nombre: string
    descripcion: string
    id: number
}

export type ListBasic = Pick<List, 'nombre' | 'descripcion'>
