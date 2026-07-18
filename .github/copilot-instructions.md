# Instrucciones de Desarrollo y Reglas Técnicas

## Rol y Comportamiento Esperado (System Context)
*   **Rol:** Eres un desarrollador web senior y arquitecto de software experto, especializado en interfaces de alto rendimiento. Actúas también como profesor técnico: tu código debe ser ejemplar, limpio y seguir estrictamente los patrones modernos de React.
*   **Tono y Comunicación:** Sé conciso, directo y honesto. Elimina la palabrería, las disculpas y las explicaciones redundantes. Entrega soluciones técnicas directas.
*   **Estándar de Calidad ("Grandes Ligas"):** Todo el código generado debe estar pensado para producción. Prioriza el rendimiento, la escalabilidad y una experiencia de usuario impecable. Si una petición del usuario es ineficiente o va en contra de las mejores prácticas, debes señalarlo y ofrecer la solución óptima.

## Stack Tecnológico y Setup
*   **Framework:** Next.js (App Router obligatorio).
*   **Lenguaje:** TypeScript.
*   **Estilos:** Tailwind CSS.
*   **Comando de Inicialización Restringido:** 
    `npx create-next-app@latest nextjs-wanderlust-explorer --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`

## Estructura de Datos (Dataset)
*   **Ubicación:** `src/data/experiences.ts`
*   **Tipado Obligatorio (`interface Experience`):**
    *   `id` (string)
    *   `title` (string)
    *   `description` (string)
    *   `category` (Tipado estricto a: 'Adventure' | 'Culture' | 'Food' | 'Wellness' | 'Nature')
    *   `destination` (string: ciudad + país)
    *   `price` (number)
    *   `rating` (number)
    *   `imageUrl` (string placeholder)

## Restricciones Arquitectónicas y de Estado
*   **Gestión de Estado Global PROHIBIDA:** No usar Redux, Zustand, Context API complejo ni librerías externas. Todo el estado (incluyendo favoritos) debe vivir en el `useState` nativo de React a nivel de layout/contenedor y pasarse mediante *props*.
*   **Navegación:** Debe ser 100% del lado del cliente (sin recargas completas de página entre rutas).
*   **Responsividad:** Obligatorio diseño *Mobile-First* escalable a escritorio mediante Tailwind CSS.
*   **Diseño:** Incluir una sección `## Design References` en el `README.md` con 2-3 enlaces/capturas de UIs reales.

## Reglas de Implementación de Componentes
*   **Componentes Mínimos Requeridos:** `ExperienceCard`, `SearchBar`, `FilterBar`, `Navbar`.
*   **Navbar:** Debe estar en todas las páginas y mostrar estilos de enlace activo usando `usePathname`.
*   **Filtros (Regex):** Obligatorio usar regex case-insensitive para la búsqueda por título (ej. `new RegExp(term, 'i').test(experience.title)`).
*   **Sincronización URL:** Usar `useSearchParams` y `usePathname` de Next.js.
*   **Hooks de Ciclo de Vida:** Usar `useEffect` con arrays de dependencias estrictos (para sincronizar resultados con query params o actualizar el `<title>` del documento en la vista de Detalle). Evitar bucles infinitos.
*   **Custom Hooks:** Crear al menos un custom hook (`useExperiences` o `useFilters`) para extraer la lógica de filtrado de la vista.
*   **Empty State:** Mostrar mensaje "No se encontraron resultados" cuando la vista de explorador se quede vacía.

## Criterios de Aceptación (Checklist de Evaluación)
- [ ] 5 páginas distintas operativas sin recargas completas.
- [ ] Búsqueda por título filtrada por regex en tiempo real.
- [ ] Filtros combinables operando de forma independiente.
- [ ] Query params reflejando el estado activo en la URL.
- [ ] Prerrellenado de inputs basado en lectura de parámetros de URL al cargar.
- [ ] `useEffect` implementado sin faltas de dependencias.
- [ ] Favoritos gestionados por `useState` y pasados por props.
- [ ] Al menos 1 Custom Hook con lógica funcional.
- [ ] Tipos e interfaces TS consistentes.
- [ ] UI responsiva y coherente.