import { createMealsSlice, type MealsSliceType } from "./mealSlice";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createFavoriteMealsSlice, type FavoriteMealsSlice } from "./favoriteSlice";

export const useAppStore = create<MealsSliceType & FavoriteMealsSlice>()(devtools(persist((...a) => ({
    ...createMealsSlice(...a),
    ...createFavoriteMealsSlice(...a)
}), {
    name: 'favorites-storage',
    partialize: (state) => ({ favorites: state.favorites })
})))
