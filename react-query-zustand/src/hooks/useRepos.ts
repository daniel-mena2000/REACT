import { useQuery } from "@tanstack/react-query";
import api from "../API/github";
import type { RepositoryType } from "./types";

//Llamaremos a axios desde esta funcion
async function fetchRepos() {
    const {data} = await api.get<RepositoryType[]>('/users/daniel-mena2000/repos')
    return data
}

//👉 “Guarda en cache unos datos llamados `repos`  y usa `fetchRepos` para obtenerlos.”
export function useFetchRepositories(){
    return useQuery({queryKey: ['repos'], queryFn: fetchRepos})
}
