import { createRecipesSlice, type RecipeSliceType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import {create} from 'zustand'

//usamos ...a para copiar todos los argumentos de create por ejemplo "set", "get" etc, y pasarselo por ejemplo a "...createRecipesSlice()" ya que como tal este no tiene acceso a esos argumentos, Aquí a contiene: a = [set, get, api]
export const useAppStore = create<RecipeSliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a)
})))
