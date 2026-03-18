import { createMealsSlice, type MealsSliceType } from "./mealSlice";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createFavoriteMealsSlice, type FavoriteMealsSlice } from "./favoriteSlice";
import { createAISlice } from "./iaSlice";
import type { AISlice } from "./iaSlice";

export const useAppStore = create<MealsSliceType & FavoriteMealsSlice & AISlice>()(devtools(persist((...a) => ({
    ...createMealsSlice(...a),
    ...createFavoriteMealsSlice(...a),
    ...createAISlice(...a)
}), {
    name: 'favorites-storage',
    partialize: (state) => ({ favorites: state.favorites })
})))
