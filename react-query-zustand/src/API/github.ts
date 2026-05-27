import axios from "axios";

//Esto nos servira como base y ya no escribir: https://api.github.com y ya solo la direccion
const api = axios.create({
    baseURL: 'https://api.github.com'
})

export default api
