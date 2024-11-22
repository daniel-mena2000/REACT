
/* 1.Este archivo "types.d.ts" esa "d" es de "definition" y indica que este archivo es para definir
elementos globales y no repetir codigo*/
// Cuando ocupas en ".d" no necesitas exportar lo del archivo
// El metodo anterior el equipo de TS no lo recomienda
// 2.Recomienda crear una carpeta llamada "type" y crear el archivo solo con el ".ts" se puede llamar "index.ts" o "types.ts" e importar el archivo

export type Guitar = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number
}
// Herencia en interfaces
export type CartItem = Guitar & {
    quantity: number;
}

/* Esto nos servira por si en un futuro por ejemplo la base de datos cambia el tipo de dats de number a string por
En este caso en la interface "Guitar" cambiamos el tipo de dato del ID a string ya no tendremos que ir a cada elemento a cambiarle el tipo de dato
ejemplos:*/
// -----------------forma 1----
// export type GuitarID = Pick<Guitar, 'id'>
// -------------forma 2------
// De esta forma solo sacamos el ID
export type GuitarID = Guitar['id'];
// ----------Forma 3----------------
// colocar directamente "Guitar['id']" ejemplo:
/*    function removeFromCart(id: Guitar['id']) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
}
*/


// -------------------------------------- TYPE -----------------------------------------
// export type Guitar = {
//     id: number;
//     name: string;
//     image: string;
//     description: string;
//     price: number
// }
// ---------------------- HERENCIA EN TYPE---------------------------------
// export type CartItem = Guitar &{
//      quantity: number
// }
