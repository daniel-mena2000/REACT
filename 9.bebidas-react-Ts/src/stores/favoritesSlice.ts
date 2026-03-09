
import type { SelectRecipeInfoType } from "@/types";
import type { StateCreator } from "zustand";

export type FavoritesSliceType = {
    favorites: SelectRecipeInfoType[],
    handleClickFavorite: (recipe: SelectRecipeInfoType) => void
    favoriteExist: (id: SelectRecipeInfoType['idDrink']) => boolean
    loadFromStorage: () => void
}


export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (set, get) => ({
    favorites: [],

    handleClickFavorite: (recipe) => {

        if (get().favorites.some(item => item.idDrink === recipe.idDrink)) {

            console.log('si existe');
        set((state) => ({
            favorites: [...state.favorites.filter(item => item.idDrink !== recipe.idDrink)]
        }))

        }else{

            console.log('no existe agregando');
            set({
                favorites: [...get().favorites, recipe]
            })
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },

    favoriteExist: (id) => {
            return get().favorites.some(item => item.idDrink === id)
        },

    loadFromStorage: () => {
        const storageFavorites = localStorage.getItem('favorites')
        if (storageFavorites) {
            set({
                favorites: JSON.parse(storageFavorites)
            })
        }

    }
})
