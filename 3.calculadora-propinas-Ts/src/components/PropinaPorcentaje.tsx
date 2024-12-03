const tipOptions = [
    {
      id: 'tip-10',
      value: .10,
      label: '10%'
    },
    {
      id: 'tip-20',
      value: .20,
      label: '20%'
    },
    {
      id: 'tip-50',
      value: .50,
      label: '50%'
    },
  ]

  type PropinaPorcentajeProps = {
// Esta propiedad del setTipe la podemos sacar con ayuda de visualStudio colocando el mause sobre "setTipe", tambien podemos importar "Dispatch" que significa "disparar" y tambien "SetSateAction" para modificar el state y Quitar el "React." y hace un poco mas corta la llamada y quedaria: Dispatch<SetStateAction<number>>
    setTipe: React.Dispatch<React.SetStateAction<number>>
  }

export default function PropinaPorcentaje({setTipe}:PropinaPorcentajeProps) {
  return (
    <div>
        <h3 className="font-black text-2xl">
            Propina:
        </h3>
        <form >
            {
                tipOptions.map(itemT => (
                    <div key={itemT.id} className="flex gap-2">
                        <label htmlFor={itemT.id}>{itemT.label}</label>
                        <input type="radio" name="tip" value={itemT.value}
// Como esperamos un numero y e.target.value es un string, nos dara un error y hay que convertirlo a numero con un "+" al inicio
// Hay una propiedad llamada "valueAsNumber" es una forma muy nueva pero solo sirve para inputs de tipo texto, por eso no la usaremos

                        id={itemT.id} onChange={e => setTipe(+e.target.value)}
                        />
                    </div>
                ))
            }

        </form>
    </div>
)
}
