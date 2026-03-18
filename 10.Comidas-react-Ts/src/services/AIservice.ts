import { openrouter } from "../lib/ai";
//streamText tambien nos ahorra mucho codigo - npm install ai
import { streamText } from "ai";
//En este caso se usara el modelo de : openrouter/free, ya que este usara algun modelo gratis disponible, ya que algunos modelos gratis van desapareciendo y se quedara sin respuesta la app.
//textStream: va retornando datos poco a poco, y es iterable, asi que podemos usar un for async para la respuesta

export default{
    async generateRecipe(prompt: string) {
        const result = streamText({
            model: openrouter('openrouter/free'),
            prompt,
            system: 'Si te pasan ingredientes genera 3 recetas diferentes con esos ingredientes'
        })
        return result.textStream

    }
}
