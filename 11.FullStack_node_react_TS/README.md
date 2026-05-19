# Tecnologias:
### Frontend (client)
•  React 19 + TypeScript: interfaz y tipado.
•  Vite: entorno de desarrollo/build rápido.
•  React Router DOM: navegación y manejo de loader/action por ruta.
•  Tailwind CSS (+ @tailwindcss/vite): estilos.
•  Valibot: validación/parseo de datos en cliente antes de enviar al backend.
•  react-icons: iconografía.

### Backend (server)
•  Node.js + Express 5 + TypeScript: API REST.
•  Sequelize + sequelize-typescript: ORM para mapear modelos y hacer CRUD.
•  PostgreSQL (pg): base de datos relacional.
•  express-validator: validación de parámetros/body.
•  cors: control de orígenes permitidos.
•  morgan: logging de requests.
•  dotenv: variables de entorno.
•  swagger-jsdoc + swagger-ui-express: documentación de API en /docs.
•  Jest + Supertest + ts-jest: testing de API.

---

# Arquitectura del proyecto

## Frontend (client): app en React + TypeScript + Vite con React Router y Tailwind.

◦  Lista productos
◦  Crea productos
◦  Edita productos
◦  Elimina productos
◦  Cambia disponibilidad (disponible/no disponible)

## Backend (server): API REST en Node.js + Express + TypeScript.

◦  Endpoints CRUD en /api/products (GET, POST, PUT, PATCH, DELETE)
◦  Validación con express-validator
◦  Documentación con Swagger en /docs
◦  Tests con Jest + Supertest
•  Base de datos: PostgreSQL usando Sequelize / sequelize-typescript (modelo Product con name, price, availability).


---

# Características principales

### Gestión de productos (CRUD completo)
•  Listar productos (GET /api/products)
•  Ver un producto por ID (GET /api/products/:id)
•  Crear producto (POST /api/products)
•  Editar producto (PUT /api/products/:id)
•  Eliminar producto (DELETE /api/products/:id)

### En UI esto se traduce en:
•  Pantalla principal con tabla de productos.
•  Formulario de alta.
•  Formulario de edición.
•  Botón de eliminación con confirmación.

### Cambio rápido de disponibilidad
•  Implementa un toggle de disponibilidad con PATCH /api/products/:id.
•  Desde la tabla puedes marcar “Disponible / No disponible” sin salir de la vista.
•  En frontend se usa fetcher.Form de React Router para hacerlo sin navegación completa.

### Validaciones en dos capas
•  Cliente: Valibot verifica estructura/tipos antes de enviar.
•  Servidor: express-validator valida id, name, price, availability para proteger la API.
•  Si algo falla, devuelve errores (ej. ID inválido, producto no encontrado, precio inválido).

### Persistencia real en DB
•  Modelo Product:
◦  name (string)
◦  price (float)
◦  availability (boolean, default true)
•  Sequelize sincroniza y opera sobre PostgreSQL.

### Documentación y pruebas
•  Swagger en /docs para probar/consultar endpoints.
•  Tests con Jest/Supertest para asegurar comportamiento del backend.

---

# Retos enfrentados

Uno de los principales retos de este proyecto Fullstack fue comprender e implementar correctamente la comunicación entre el cliente y el servidor. La aplicación consiste en un sistema de gestión de productos con operaciones CRUD, desarrollado con Node.js, Express, Sequelize y PostgreSQL, mientras que el frontend fue construido con React, TypeScript y React Router.

Durante el desarrollo fue fundamental entender el flujo completo de datos: desde la interacción del usuario con los formularios en el frontend, pasando por las validaciones y procesamiento en el servidor, hasta la persistencia en la base de datos y el retorno de respuestas para actualizar dinámicamente la interfaz según las operaciones GET, POST, PUT, PATCH y DELETE.

Otro reto importante fue la configuración y manejo de CORS. Aunque ya conocía el concepto teóricamente, esta fue una de las primeras veces implementándolo en un entorno real. Se desarrolló una configuración personalizada para permitir o rechazar solicitudes según el origen, utilizando variables de entorno para asegurar las rutas autorizadas y mejorar la seguridad de la API.

La integración de rutas con React Router también representó un desafío significativo. Fue necesario comprender el uso de loaders y actions para manejar tanto la obtención de datos como el envío de formularios desde la configuración de rutas, en lugar de realizar toda la lógica directamente dentro de los componentes. Esto permitió construir una arquitectura más organizada y alineada con el enfoque moderno de React Router.

Además, uno de los aprendizajes más importantes fue entender la capa de servicios implementada en `ProductService.ts`, encargada de centralizar la comunicación entre el frontend y la API. Más allá de realizar simples peticiones fetch, esta capa funciona como un puente tipado y validado entre ambas partes de la aplicación.

Un ejemplo claro fue el manejo del campo `price`, ya que los formularios envían los datos como texto, mientras que la API y los esquemas de validación requieren valores numéricos. Resolver correctamente estas conversiones manteniendo el tipado estricto de TypeScript y las validaciones con Valibot fue uno de los aspectos más valiosos del aprendizaje durante el desarrollo del proyecto.
