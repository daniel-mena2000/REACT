import { categories } from "../db/categories"
import { useBudget } from "../hooks/useBudget"
export function FilterByCategory() {

    const {dispatch} = useBudget()

    const handleChange = (e:  React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: 'add-filter-category', payload:{id: e.target.value}})
    }

    return(
        <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">🔵 Filtrar Gastos:</label>
                    <select id="category"
                    className="bg-slate-100 p-3 flex-1 rounded"
                    onChange={handleChange}
                    >
                        <option value=''>Todas las Categorias</option>
                        {categories.map(item => (
                            <option value={item.id} key={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>

                </div>
            </form>
        </div>
    )
}
