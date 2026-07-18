# Contexto del Proyecto: Wanderlust Explorer MVP

## Visión Comercial (Wanderlust Labs)
Wanderlust Labs es una startup de travel-tech enfocada en construir una plataforma para descubrir y guardar experiencias únicas alrededor del mundo (ej. tours gastronómicos en Bangkok, rutas de vela por el Adriático). 

Este proyecto representa el MVP (Producto Mínimo Viable) del explorador de experiencias. El objetivo es proporcionar una UI de descubrimiento limpia, fluida y sin recargas de página, que sirva como base para iteraciones futuras.

## Especificaciones de Producto (PM: Lea Moreau)

### Arquitectura de Páginas Requeridas
*   `/` **(Home):** Sección hero con un botón de "Call to Action" que navega a `/experiences`.
*   `/experiences` **(Explorador):** Listado principal de tarjetas de experiencias. Incluye barra de búsqueda y al menos dos filtros (categoría y destino).
*   `/experiences/[id]` **(Detalle):** Vista de información completa de una experiencia individual, obtenida a través de su ID.
*   `/favorites` **(Favoritos):** Galería filtrada de experiencias que el usuario ha marcado con el icono de corazón.
*   `/profile` **(Perfil):** Página estática simulando un perfil de usuario, incluyendo un resumen con el número total de favoritos guardados.

### Lógica de Negocio y Comportamiento
*   **Deep Linking (Filtros en URL):** La búsqueda y los filtros activos deben reflejarse obligatoriamente en la URL como *query parameters* (ej. `/experiences?search=vela&category=adventure&destination=Croatia`). Al cargar un enlace con parámetros, los inputs deben prerrellenarse automáticamente.
*   **Búsqueda y Filtrado:** 
    *   La búsqueda por título debe coincidir con el término buscado.
    *   Los filtros de categoría y destino deben funcionar de forma independiente y combinarse con la búsqueda de texto.
*   **Favoritos:** Gestión local de favoritos. Un usuario puede marcar/desmarcar una tarjeta. No se requiere persistencia en base de datos ni `localStorage` para este MVP.
*   **Datos:** El sistema se alimentará temporalmente de un dataset local de 100 experiencias generadas de forma sintética.