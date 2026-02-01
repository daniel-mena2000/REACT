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
  import { OrderActions } from "../reducers/orderReducer"

  type PropinaPorcentajeProps = {

    dispatch:  React.Dispatch<OrderActions>

    tip: number
  }

export default function PropinaPorcentaje({dispatch, tip}:PropinaPorcentajeProps) {
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
                        <input type="radio" name="tip" value={itemT.value} checked={itemT.value === tip}
                        id={itemT.id}
                         onChange={e => dispatch({type: 'add-tip', payload: {value: +e.target.value}}) }
                        />
                    </div>
                ))
            }

        </form>
    </div>
)
}
