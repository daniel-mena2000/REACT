import type { StateCreator } from "zustand";
import AIservice from "../services/AIservice";

export type AISlice = {
    recipe: string,
    isGenerating: boolean,
    generateRecipe: (prompt: string) => void
}

export const createAISlice: StateCreator<AISlice> = (set) => ({
    recipe: '',
    isGenerating: false,

    generateRecipe: async (prompt) => {
//Reiniciamos para que no se junten las respuestas y se limpie, y isGenerating indicara que se esta generando una respuesta, y queremos que el boton se deshabilite para que no se interrumpa la respuesta.
        set({
            recipe: '',
            isGenerating: true
        })
      const data = await AIservice.generateRecipe(prompt)
//Este for se ejecutara mientras data tenga informacion
      for await (const textPart of data){
        set((state => ({
            recipe: state.recipe + textPart
        })))
      }
//Cuando salga del for quiere decir que ya entrego toda la respuesta y indicamos false, para activar de nuevo el boton
         set({
            isGenerating: false
        })

    }
})
