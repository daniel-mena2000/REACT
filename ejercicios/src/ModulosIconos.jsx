import { BsArrowDownUp } from "react-icons/bs";


export function ModuloIconos(){
    return <>
        <button className="datosApi" onClick={()=>{
            fetch("https://jsonplaceholder.typicode.com/posts")
            .then(resp => resp.json())
            .then(datos => console.log(datos))
            .catch(error => console.error(error))
        }}>
         <BsArrowDownUp/> Traer Datos
        </button>    
    </>
}