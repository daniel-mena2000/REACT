

export function Post(){
    return <>
        <button className="datosApi" onClick={()=>{
            fetch("https://jsonplaceholder.typicode.com/posts")
            .then(resp => resp.json())
            .then(datos => console.log(datos))
            .catch(error => console.error(error))
        }}>
        Traer Datos
        </button>    
    </>
}