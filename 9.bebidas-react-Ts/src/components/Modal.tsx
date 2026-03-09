import { useAppStore } from "@/stores/useAppStore"
import type { JSX } from "react"
import { Heart, HeartCrack  } from "lucide-react"
import {toast}  from 'react-toastify'


import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import type { SelectRecipeInfoType } from "@/types"

export default function Modal() {

    const modal = useAppStore((state) => state.modal)
    const modalChange = useAppStore((state) => state.modalChange)
    const selectRecipeInfo = useAppStore((state) => state.selectRecipeInfo)
    const handleClickFavorite = useAppStore((state) => state.handleClickFavorite)
    const favoriteExist = useAppStore((state) => state.favoriteExist)

    const renderIngredients = () => {
        const ingredients : JSX.Element[] = []

        for (let index = 1; index < 6; index++) {
            const ingredient = selectRecipeInfo[`strIngredient${index}` as keyof SelectRecipeInfoType];
            const measure = selectRecipeInfo[`strMeasure${index}` as keyof SelectRecipeInfoType];

            if (ingredient && measure) {
                ingredients.push(
                    <li key={index} className="text-lg font-normal m-5">
                        {ingredient} - {measure}
                    </li>
                )
            }
        }

        return ingredients
    }

    favoriteExist(selectRecipeInfo.idDrink)






  return (
    <>

<Dialog open={modal} onOpenChange={modalChange}>
  <DialogContent
    className="
      sm:max-w-4xl
      max-h-[85vh]
      overflow-y-auto
      bg-[#1a1a1a]
      border border-emerald-500/30
      rounded-xl
      shadow-2xl
      p-8
      text-gray-200
    "
  >

    <div className="flex flex-col items-center gap-4 mb-8">

      <DialogTitle className="text-4xl font-bold text-emerald-400 text-center">
        {selectRecipeInfo.strDrink}
      </DialogTitle>

      <img
        src={selectRecipeInfo.strDrinkThumb}
        alt={`Imagen de ${selectRecipeInfo.strDrink}`}
        className="
          w-80
          rounded-lg
          shadow-lg
          border border-emerald-500/20
        "
      />
        <div className="flex justify-end">
                <button
                    className="
                        flex items-center justify-center
                        gap-2
                        bg-[#1a1a1a]
                        text-emerald-400
                        border border-emerald-500
                        px-5 py-2
                        rounded-lg
                        font-semibold
                        transition-all
                        duration-200
                        hover:bg-emerald-500
                        hover:text-black"
                onClick={() => {
                const exists = favoriteExist(selectRecipeInfo.idDrink)

                handleClickFavorite(selectRecipeInfo)
                modalChange(false)

                if(exists){
                toast.error('Eliminado de favoritos')
                }else{
                toast.success('Agregado a favoritos')
                }


                }}
                >

                 {favoriteExist(selectRecipeInfo.idDrink) ?
                  (
                    <>
                        <HeartCrack className="text-rose-600"  size={25} />
                        <p>Eliminar de favoritos</p>

                    </> )
                     :
                     (
                        <>
                           <Heart className="text-rose-600" size={25} />
                            <p>Agregar a favoritos</p>
                        </>
                        )}
                </button>
                </div>

      <DialogDescription className="text-gray-400 text-center">
        Aquí puedes ver los detalles completos de la receta
      </DialogDescription>

    </div>

    <div className="grid md:grid-cols-2 gap-10">

      <div>

        <DialogTitle className="text-2xl font-bold text-emerald-400 mb-4 border-b border-emerald-500/20 pb-2">
          Ingredientes
        </DialogTitle>

        <div className="space-y-2 text-sm text-gray-300">
          {renderIngredients()}
        </div>

      </div>

      <div>

        <DialogTitle className="text-2xl font-bold text-emerald-400 mb-4 border-b border-emerald-500/20 pb-2">
          Instrucciones
        </DialogTitle>

        <DialogDescription className="text-gray-300 leading-relaxed text-base">
          {selectRecipeInfo.strInstructions}
        </DialogDescription>

      </div>
    </div>



  </DialogContent>
</Dialog>

    </>
  )
}
