import { useFetchRepositories } from "./hooks/useRepos"
import { Card } from "./components/Card";
import { useFavoriteReposStore } from "./store/favoriteRepos";

function App() {
//useFetchRepositories retorna useQuery y de este podemos sacar distintas funciones que devuelve como la "data" o si aun no tenemos respuesta nos sirve "isLoading".
//data nos da los datos de: '/users/daniel-mena2000/repos' de github si ya tenemos respuesta los recorreremos
    const {data, isLoading} = useFetchRepositories()

    const {favoriteReposIds} = useFavoriteReposStore()

    if (isLoading) return <div>Loading...</div>

    console.log(data);

  return (
    <div>
        {data?.map(item => (
            <Card repository={item} key={item.id}
            isFavorite = {favoriteReposIds.includes(item.id)}
            />


        ))}
    </div>
  )
}

export default App
