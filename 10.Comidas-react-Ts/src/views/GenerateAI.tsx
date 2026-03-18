import { useState } from "react";
import styles from "./GenerateAI.module.css";
import { useAppStore } from "../stores/useAppStore";
//La respuesta me la esta dando en Markdawn y se ve desordenada usaremos la siguiente libreria:  npm install react-markdown y npm install react-markdown remark-gfm, es un plugins para tablas de markdown
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";



export default function GenerateAI() {

const generateRecipe = useAppStore((state) => state.generateRecipe)
const recipe = useAppStore((state) => state.recipe)
const isGenerating = useAppStore((state) => state.isGenerating)



  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

        if (!prompt) {
            console.log('rellena el formulario');

        }else{
            generateRecipe(prompt)
            setPrompt('')
        }
  };

  const [prompt, setPrompt] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setPrompt(e.target.value)

  }

  return (
    <section className={styles.wrapper}>

      <h1 className={styles.title}>
        Generar Receta con IA ✨
      </h1>

      <p className={styles.subtitle}>
        Describe ingredientes, tipo de comida o antojo
      </p>

      <div className={styles.container}>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <div className={styles.relative}>

            <input
              name="prompt"
              id="prompt"
              className={styles.input}
              placeholder="Ej. Dame una receta de arroz blanco 🍚"
              autoComplete="off"
              onChange={handleChange}
              value={prompt}
            />

            <button
              type="submit"
              aria-label="Generar receta"
              className={ `${isGenerating} ? ${styles.button} : ${styles.button}` }
              disabled={isGenerating}
            >
                Generar
            </button>

          </div>
        </form>

            {isGenerating && <p className={styles.generatePrompt}>Generando...</p> }
        <div className={styles.result}>

           <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {recipe}
            </ReactMarkdown>

        </div>
      </div>

    </section>
  );
}
