
import type { SelectRecipeInfoType } from "@/types";
import type { StateCreator } from "zustand";

export type FavoritesSliceType = {
//Los favoritos seran un array de las recetas
    favorites: SelectRecipeInfoType[],
    handleClickFavorite: (recipe: SelectRecipeInfoType) => void
//El metodo some, devuelve un boolean es importante decirle al type
    favoriteExist: (id: SelectRecipeInfoType['idDrink']) => boolean
    loadFromStorage: () => void
}


//get para acceder al state, o acciones que pertenecen al mismo slice, y obtener sus valores
//some: true si alguno de los elementos de la matriz pasa la prueba, en caso contrario false, en este caso comprobara si algun elemento del array ya tiene el id que le pasen como parametro
export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (set, get) => ({
    favorites: [],

    handleClickFavorite: (recipe) => {
    //Como ya tenemos una accion que valida esto tambien, podemos pasarla igual funcionara
    //if (get().favoriteExist(recipe.idDrink))
        if (get().favorites.some(item => item.idDrink === recipe.idDrink)) {
//Otra forma de obtener el state de favorites es pasar el state en el set para obtener el estado
//Si existe el elemento en el state de favorites, queremos la opcion de eleminarlo de favorites, La idea es que si ya esta el boton cambie el texto de agregar a eliminar, y ese boton tener un doble funcionamiento, y con la accion de "favoriteExist" hacer un boolean para cambiar el texto
            console.log('si existe');
        set((state) => ({
            favorites: [...state.favorites.filter(item => item.idDrink !== recipe.idDrink)]
        }))

        }else{
//Si no existe creamos un array donde obtenemos una copia de el estado de "favorites" con la receta(recipe) que nos pasen como parametro
            console.log('no existe agregando');
            set({
                favorites: [...get().favorites, recipe]
            })
        }
//Empezamos el localstorage cuando se del click en "handleClickFavorite"
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },

    favoriteExist: (id) => {
            return get().favorites.some(item => item.idDrink === id)
        },

    loadFromStorage: () => {
        const storageFavorites = localStorage.getItem('favorites')
    //Si tenemos "favorites" almacenados, entonces los seteamos
        if (storageFavorites) {
            set({
                favorites: JSON.parse(storageFavorites)
            })
        }

    }
})
