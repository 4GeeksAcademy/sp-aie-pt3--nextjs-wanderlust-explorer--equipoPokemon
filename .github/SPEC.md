# Plan de Desarrollo de Producto: MVP Wanderlust Explorer

Como arquitecto de soluciones de Wanderlust Labs, el lanzamiento de este MVP no es solo una entrega técnica, sino el primer hito estratégico para consolidarnos en el ecosistema travel-tech. La meta es construir un explorador de experiencias que combine un rendimiento excepcional con una experiencia de usuario (UX) fluida, sentando las bases de una plataforma escalable y profesional.

## 1. Fundamentos del Proyecto y Especificaciones Técnicas

### Análisis de Requerimientos de Producto
Basándonos en las especificaciones de nuestra PM, Lea Moreau, el MVP debe priorizar la navegación instantánea y la persistencia de datos en la URL. Los objetivos técnicos prioritarios son:

*   **Navegación sin recarga:** Implementación de una arquitectura multipágina que retenga la agilidad de una SPA.
*   **Filtros persistentes:** Todo estado de búsqueda debe ser compartible mediante query parameters.
*   **Dataset Local:** Gestión de un catálogo de 100 experiencias diversas generadas sintéticamente.

### Inicialización y Stack Tecnológico
Para garantizar la solidez del proyecto, utilizaremos el CLI oficial de Next.js. El comando de inicialización obligatorio es:

```bash
npx create-next-app@latest nextjs-wanderlust-explorer --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

El ecosistema técnico se fundamenta en:
*   **Next.js (App Router):** Para un enrutamiento basado en el sistema de archivos optimizado.
*   **TypeScript:** Para asegurar un desarrollo libre de errores de tipo y una documentación implícita.
*   **Tailwind CSS:** Para una UI responsiva y consistente mediante un enfoque utility-first.

### Modelado de Datos (Dataset)
El dataset se alojará en `src/data/experiences.ts`. Definiremos la interfaz `Experience` utilizando Union Types para las categorías, garantizando un autocompletado y validación rigurosos:

```typescript
export type Category = 'Adventure' | 'Culture' | 'Food' | 'Wellness' | 'Nature';

export interface Experience {
  id: string; // ID como string para paridad con parámetros de URL
  title: string;
  description: string;
  category: Category;
  destination: string; // Ciudad + País
  price: number;
  rating: number;
  imageUrl: string; // Se recomienda el uso de Unsplash o Lorem Picsum para realismo visual
}
```
Esta base de datos local alimentará toda la lógica de descubrimiento y detalle de la aplicación.

## 2. Arquitectura de Navegación y Enrutamiento Dinámico

Una arquitectura de rutas clara es fundamental para el SEO y la retención del usuario. Cada ruta debe responder a un propósito funcional específico, permitiendo que el motor de descubrimiento sea intuitivo y accesible.

### Mapa de Rutas del MVP
*   `/` **(Home):** Sección hero con CTA hacia el explorador.
*   `/experiences` **(Explorador):** Contenedor principal del listado, barra de búsqueda y filtros.
*   `/experiences/[id]` **(Detalle):** Ruta dinámica para visualizar una experiencia específica.
*   `/favorites` **(Favoritos):** Galería filtrada de experiencias marcadas por el usuario.
*   `/profile` **(Perfil):** Dashboard estático con métricas del usuario (ej. contador de favoritos).

### Lógica de Navegación y Estilo Activo
Utilizaremos el sistema de Next.js para asegurar transiciones fluidas. En la `Navbar`, el hook `usePathname` es obligatorio para implementar la lógica de Active Link Styling, permitiendo que el usuario identifique visualmente su ubicación actual en el sitio mediante clases condicionales de Tailwind.

### Gestión de la Página de Detalle y SEO
En la ruta `/experiences/[id]`, recuperaremos el ID de los parámetros de la URL para filtrar el dataset. Como estándar de calidad, se debe emplear `useEffect` (o metadatos dinámicos si se opta por Server Components) para actualizar la etiqueta `<title>` del documento con el nombre de la experiencia, optimizando la indexación y la experiencia en el navegador.

## 3. Implementación del Motor de Búsqueda y Filtros Compartibles

El concepto de "Deep Linking" es central en este MVP. La URL debe actuar como la fuente de verdad única para el estado del explorador, permitiendo que cualquier búsqueda sea replicable al compartir el enlace.

### Lógica de Filtrado Avanzado
Para la búsqueda por título, implementaremos una comparación mediante expresiones regulares case-insensitive. La lógica técnica para filtrar el array de experiencias debe seguir este patrón:
`new RegExp(term, 'i').test(experience.title)`

Los filtros de Categoría y Destino deben ser independientes. La arquitectura debe permitir que un usuario filtre por "Food" en "Tokio" y, simultáneamente, realice una búsqueda por texto, combinando los tres criterios de forma acumulativa.

### Sincronización con la URL (Query Parameters)
Utilizaremos `useSearchParams` de Next.js para sincronizar los inputs con la URL (ej. `?search=vela&category=Adventure`).

*   **Escritura:** Al interactuar con un filtro, se actualiza la URL.
*   **Lectura (Hidratación):** Al cargar la página, se deben leer los parámetros para prerrellenar los inputs. Esto asegura que la UI sea coherente con los resultados mostrados desde el primer renderizado.

## 4. Gestión de Estado y Composición de Componentes

Siguiendo las directrices de la PM, evitaremos librerías externas de estado global para mantener la simplicidad y el rendimiento.

### Estrategia de "Lifting State Up"
La funcionalidad de favoritos se gestionará mediante un `useState` en el nivel jerárquico común más bajo (usualmente en el layout o un componente contenedor superior).

*   **Prop Drilling:** Aunque este patrón implica pasar props a través de niveles, la profundidad del árbol en este MVP es controlable. Se recomienda pasar el array de IDs favoritos y una función `toggleFavorite` a los componentes `ExperienceCard`.

### Arquitectura de Componentes Modulares
Dividiremos la interfaz en piezas atómicas con responsabilidades únicas:
*   `Navbar`: Enlaces globales y visualización de ruta activa.
*   `ExperienceCard`: Renderizado de datos y botón de favorito (corazón).
*   `SearchBar`: Input controlado para el término de búsqueda.
*   `FilterBar`: Selectores para categorías y destinos.

### Encapsulación con Custom Hooks
Para separar la lógica de negocio de la vista, es obligatorio crear un hook `useExperiences`. Este hook encapsulará la lógica de filtrado por Regex, la gestión de parámetros de URL y retornará los datos listos para renderizar, mejorando la legibilidad de la página `/experiences`.

## 5. Optimización de UI/UX y Criterios de Entrega

La calidad visual debe estar a la altura de un producto profesional de mercado.

### Estrategia Mobile-First e Interfaz
Utilizaremos Tailwind CSS para asegurar que la rejilla (grid) de experiencias pase de 1 columna en móvil a 3 o 4 en escritorio. En el componente de resultados, se debe implementar una renderización condicional para manejar el Estado Vacío: si la búsqueda no devuelve resultados, se mostrará un mensaje claro de "No se encontraron resultados para su búsqueda".

### Calidad Técnica y Documentación
*   **Sincronización:** El uso de `useEffect` para sincronizar los resultados debe incluir `searchParams` en su array de dependencias para evitar bucles infinitos y asegurar actualizaciones precisas.
*   **Referencias de Diseño:** El `README.md` del proyecto debe incluir una sección "Design References" con enlaces a interfaces de referencia como Airbnb o GetYourGuide, documentando la inspiración para nuestra UI.

### Checklist de Calidad Final (Hito de Entrega)
- [ ] Proyecto inicializado con el comando CLI específico.
- [ ] Dataset de 100 experiencias en `src/data/experiences.ts`.
- [ ] Interface `Experience` con Union Types para categorías.
- [ ] 5 rutas funcionales con navegación del lado del cliente.
- [ ] Filtros combinables (Texto, Categoría, Destino) persistentes en URL.
- [ ] Hook `usePathname` para estilos activos en Navbar.
- [ ] Gestión de favoritos mediante `useState` y props.
- [ ] Responsividad total (Móvil/Desktop) con Tailwind CSS.
- [ ] Actualización de `<title>` en rutas dinámicas.

Este plan técnico garantiza la entrega de un MVP de Wanderlust Explorer robusto, profesional y listo para el mercado global.