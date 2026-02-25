<p align="center">
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg" alt="TypeScript" title="TypeScript" width="36" height="36" /></a><a href="https://reactjs.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg" alt="React" title="React" width="36" height="36" /></a><a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
<a href="https://www.w3.org/TR/CSS/#css" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/css3-colored.svg" alt="CSS3" title="CSS3" width="36" height="36" /></a>

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" height="40" alt="npm logo"  />
</p>

---

![](img/clima1.png)

---

![](img/clima2.png)

---

# Características principales:

## 🌤️ Funcionalidad:

- Permite buscar información del clima de ciudades en diferentes países
-  Utiliza la API de OpenWeatherMap para obtener datos meteorológicos
-  Muestra temperatura actual, máxima y mínima

## 🛠️ Stack tecnológico:

-  React 19 + TypeScript para la interfaz
-  Vite como build tool
-  Axios para peticiones HTTP a la API
-  Zod para validación de datos y type safety
-  CSS Modules para estilos

## 📦 Estructura:

-  Formulario de búsqueda por ciudad y país
-  Componente de detalles del clima
-  Spinner de carga durante las peticiones
-  Alertas cuando no se encuentra una ciudad
-  Hook personalizado useWeather que maneja toda la lógica de peticiones y estado.

---

# 🚀 Retos del Proyecto – App de Clima
---
### 🎨 Uso de CSS Modules

- Este proyecto lo empecé usando algo nuevo para mí: CSS Modules
- Me parecieron bastante eficientes porque cada componente tiene su propia hoja de estilos
- Me gustó mucho la separación y organización que se logra

Este proyecto me ayudó a entender mejor cómo mantener estilos encapsulados sin afectar otros componentes.

### 🧠 Implementación de Zod para validación

- Uno de los principales retos fue implementar Zod para validar las respuestas de la API
- TypeScript por sí solo no sabe exactamente cómo vienen las respuestas externas
- Tuve que definir los schemas correctamente para asegurar el tipado
- Fue interesante entender cómo validar y tipar al mismo tiempo
- Consideré usar Valibot, pero decidí dejarlo con Zod

Este punto fue clave porque entendí la diferencia entre confiar solo en TypeScript y validar realmente los datos en runtime.

### 🌐 Consumo de API

- Utilicé Axios para las llamadas HTTP
- No representó un reto grande, ya que ya tenía experiencia previa
- Me enfoqué más en la estructura y validación que en la petición en sí

### 🧩 Conclusión personal

- No fue un proyecto con retos extremadamente complejos
- Me ayudó a reforzar conceptos como validación, tipado seguro y separación de responsabilidades
- Me permitió experimentar con nuevas herramientas como CSS Modules
