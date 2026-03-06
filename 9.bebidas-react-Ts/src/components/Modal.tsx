import { useAppStore } from "@/stores/useAppStore"
import type { JSX } from "react"
import {
DialogHeader,
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

//Funcion para agregar los ingredientes con sus respectivas porciones, pero como cada receta no tiene el mismo numero de ingredientes iteraremos dinamicamente para inyectar la info en un "li"
//Si nos colocamos arriba de "renderIngredients" Nos dira el tipo para ingredients: JSX.Element[] y como va a ser un array igual le indicamos que espera un array
//Accedemos dinamicamente con un for que va del 1 al 6, ya que ese es el numero maximo de ingredientes que tenemos, luego TypeScript no sabe si esa propiedad existe. Aquí es donde entra esto: as keyof SelectRecipeInfoType "Confía en mí TypeScript, este string sí es una clave válida del tipo." y valida que seas keys validas del objeto: SelectRecipeInfoType.
//Luego si los ingredient y measure existen entonces los pusheamos, no hay problema en usar push ya que este no es un state
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

    {/* Header */}
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

      <DialogDescription className="text-gray-400 text-center">
        Aquí puedes ver los detalles completos de la receta
      </DialogDescription>

    </div>

    {/* Contenido */}
    <div className="grid md:grid-cols-2 gap-10">

      {/* Ingredientes */}
      <div>

        <DialogTitle className="text-2xl font-bold text-emerald-400 mb-4 border-b border-emerald-500/20 pb-2">
          Ingredientes
        </DialogTitle>

        <div className="space-y-2 text-sm text-gray-300">
          {renderIngredients()}
        </div>

      </div>

      {/* Instrucciones */}
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
