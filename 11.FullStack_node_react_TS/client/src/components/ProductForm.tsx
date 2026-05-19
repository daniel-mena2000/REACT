import type { ProductType } from "../types"

type ProductFormType = {
    product?: ProductType
}
export function ProductForm({product}: ProductFormType) {
    return(
        <>
            <div className="mb-4">
                    <label className="text-gray-800" htmlFor="name">Nombre Producto:</label>
                    <input
                        id="name"
                        type="text"
                        className="mt-2 block w-full p-3 rounded-md  border border-blue-500/20 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 transition"
                        placeholder="Nombre del Producto.ej. Monitor, Mause, Teclado"
                        name="name"
                        defaultValue={product?.name}
                    />
                </div>

                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="price">Precio:</label>
                        <input
                            id="price"
                            type="number"
                            className="mt-2 block w-full p-3 rounded-md  border border-blue-500/20 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-500 transition"
                            placeholder="Precio Producto. ej. 200, 300"
                            name="price"
                            defaultValue={product?.price}
                    />
                </div>

        </>
    )
}
