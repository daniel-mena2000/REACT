import { createRecipesSlice, type RecipeSliceType } from "./recipeSlice";
import { createFavoritesSlice, type FavoritesSliceType } from "./favoritesSlice";

import { devtools } from "zustand/middleware";
import {create} from 'zustand'

//Slice Pattern: La idea es dividir el store en pedazos (slices).
//usamos ...a para copiar todos los argumentos de create por ejemplo "set", "get" etc, y pasarselo por ejemplo a "...createRecipesSlice()" ya que como tal este no tiene acceso a esos argumentos, Aquí a contiene: a = [set, get, api]
export const useAppStore = create<RecipeSliceType & FavoritesSliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
})))
