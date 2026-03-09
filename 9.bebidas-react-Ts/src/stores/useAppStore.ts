import { createRecipesSlice, type RecipeSliceType } from "./recipeSlice";
import { createFavoritesSlice, type FavoritesSliceType } from "./favoritesSlice";

import { devtools } from "zustand/middleware";
import {create} from 'zustand'


export const useAppStore = create<RecipeSliceType & FavoritesSliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
})))
