import {create} from 'zustand'

type favoriteReposState = {
    favoriteReposIds: number[],
    addFavoriteRepo: (id: number) => void,
    removeFavoriteRepo: (id: number) => void
}

//Guardaremos el ID de los repos favoritos
export const useFavoriteReposStore = create<favoriteReposState>(() => ({
    favoriteReposIds: [],

    addFavoriteRepo: (id:number) => {},
    removeFavoriteRepo: (id:number) => {},

}))
