<p align="center">
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg" alt="TypeScript" title="TypeScript" width="36" height="36" /></a><a href="https://reactjs.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg" alt="React" title="React" width="36" height="36" /></a><a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/tailwindcss-colored.svg" alt="TailwindCSS" title="TailwindCSS" width="36" height="36" /></a>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" height="40" alt="npm logo"  />
</p>

---
![](img/veterinaria1.png)
![](img/veterinaria2.png)

---
# ------------- 🛠️ Implementación Técnica del Proyecto -------------

## 🏥 1. Gestión de Estado Global con Zustand 🐻
Implementar un sistema de estado centralizado usando Zustand para manejar múltiples acciones (agregar, editar, eliminar pacientes) con middlewares de devtools (integración con Redux DevTools) y persist (persistencia automática), manteniendo el código organizado y tipado con TypeScript.

## 🧩 2. Tipado Estricto con TypeScript
Definir tipos precisos para el estado del store (PatientState), las entidades (RegisterPatientType) y variantes sin ID (DraftPatient usando Omit<>). Particularmente relevante fue la distinción entre un paciente completo (con id generado por UUID) y un borrador del formulario, asegurando que las acciones del store reciban y retornen los tipos correctos.

## 💾 3. Persistencia con LocalStorage
Sincronizar el estado de la aplicación con localStorage mediante el middleware persist de Zustand, almacenando la lista de pacientes bajo la clave patient-store para mantener los registros entre sesiones sin necesidad de lógica manual de hidratación.

## 🔄 4. Lógica de Edición vs Creación
Manejar un mismo formulario para crear y editar pacientes, diferenciando el flujo mediante activeId. Cuando se pulsa "Editar" en un paciente, se establece su ID como activo, un useEffect detecta el cambio y precarga los datos en el formulario con setValue de React Hook Form. Al enviar, se determina si se ejecuta addPatient o updtaePatient según el estado de activeId.

## ✅ 5. Validación de Formularios con React Hook Form
Implementar validaciones declarativas en cada campo del formulario: campos requeridos, longitud máxima de caracteres y validación de formato de email mediante expresiones regulares, mostrando mensajes de error personalizados a través de un componente Error reutilizable.

## 📦 6. Integración de Librerías de Terceros
Configurar e integrar múltiples librerías: React Hook Form para validación de formularios, React Toastify para notificaciones visuales (éxito al crear, info al editar, error al eliminar), UUID para generación de identificadores únicos, y Tailwind CSS v4 para estilizado utilitario con diseño responsive.

## 🗂️ 7. Patrón CRUD Completo
Implementar las cuatro operaciones fundamentales sobre la entidad paciente: Crear (formulario → addPatient → genera UUID), Leer (listado reactivo desde el store), Actualizar (precarga en formulario → updtaePatient → resetea activeId) y Eliminar (deletePatient con filtrado por ID), todo gestionado desde un único store de Zustand.


---

# ---- Retos Técnicos Enfrentados y Aprendisaje ----

1️⃣ Primer proyecto usando Zustand

Este fue mi primer proyecto usando Zustand.
Venía de trabajar con useReducer + Context, así que al inicio fue algo nuevo, pero no se me hizo complicado porque la estructura es parecida en cuanto a centralizar la lógica.

Lo que más me gustó fue no tener que usar un Provider como con Context, y poder acceder al estado directamente desde el store. Sentí que reducía complejidad y hacía el código más limpio.

Más que un reto difícil, fue una experiencia nueva que reforzó mi entendimiento del manejo de estado global.

2️⃣ Validación de formularios con React Hook Form

Otra parte nueva fue trabajar con React Hook Form.
No sé si es mi forma favorita de validar formularios, pero fue interesante.

Me llamó la atención:

Crear mensajes de error directamente con register.

Usar validaciones como required, maxLength y patrones para email.

La facilidad para manejar errores sin tanto estado manual.

Lo que más me sorprendió fue usar setValue para regresar valores al formulario cuando estaba en modo edición. No comprendí completamente cómo funciona internamente, pero entendí el funcionamiento básico y me pareció muy práctico.

También el reset me pareció súper útil para reiniciar el formulario después de enviar la información.

3️⃣ Manejo del modo Crear vs Editar

Uno de los puntos más interesantes fue usar el mismo formulario para crear y editar pacientes.

El flujo fue:

Guardar un activeId.

Detectarlo con un useEffect.

Usar setValue para precargar la información.

Decidir si ejecutar addPatient o updatePatient.

No fue algo que me bloqueara, pero sí fue una parte donde entendí mejor cómo conectar el estado global con el estado del formulario.

4️⃣ Uso de UUID para IDs

Ya había usado uuid en otros proyectos, pero en este lo reforcé más.

Me ayudó a entender mejor la diferencia entre:

Un paciente borrador (sin id).

Un paciente ya registrado (con id generado).

Eso me hizo pensar más en cómo se estructura la información antes y después de guardarla.

5️⃣ Uso de librerías para simplificar desarrollo

Implementé librerías como:

Zustand

React Hook Form

UUID

React Toastify

No fue complejo integrarlas, pero sí me hizo darme cuenta de la importancia de usar herramientas que simplifican el desarrollo y evitan reinventar cosas que ya están bien resueltas.

---

En este proyecto no hubo tantos retos difíciles como bugs complicados.

Más bien fue un proyecto donde:

Reforcé conceptos.

Aprendí herramientas nuevas.

Comparé enfoques (Context vs Zustand).

Gané más criterio para elegir herramientas.

Sentí que muchas cosas que antes me parecían complejas ahora se volvieron más naturales.
