import type { RepositoryType } from "../hooks/types"

type CardProps = {
    repository: RepositoryType
    isFavorite: boolean
}

export function Card({repository, isFavorite}: CardProps) {
    return(
        <div>
            <h1>{repository.name}</h1>
            <button>
                {isFavorite ? 'dislike' : 'Like'}
            </button>
        </div>
    )
}
