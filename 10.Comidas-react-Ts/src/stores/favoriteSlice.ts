import type { StateCreator } from "zustand"
import type { RecipeMealsType } from "../types";

export type FavoriteMealsSlice = {
    favorites: RecipeMealsType[],
    handleClickSave: (info: RecipeMealsType) => void
    favoriteExist: (id: RecipeMealsType['idMeal']) => boolean

}

export const createFavoriteMealsSlice: StateCreator<FavoriteMealsSlice> = (set, get) => ({

    favorites: [],

    handleClickSave: (info) => {
        if (get().favorites.some(item => item.idMeal === info.idMeal)) {
            set({
                favorites: [...get().favorites.filter(item => item.idMeal !== info.idMeal)]
            })

        }else{
            set({
                favorites: [...get().favorites, info]
            })
   }},

   favoriteExist: (id) => {
        return get().favorites.some(item => item.idMeal === id)

   }

})
