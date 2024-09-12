// FUNCION PARA COLOCAR EL SIGNO DE DOLAR ANTES DE UN NUMERO
export function formatCurrency(quantity: number) {
    return new Intl.NumberFormat('en-US',{
        style: 'currency', currency: 'USD'
    }).format(quantity) //Le pasamos nuestro parametro
}
