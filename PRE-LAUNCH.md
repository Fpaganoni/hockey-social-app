🚀 Pre-Launch Readiness Report: Hockey Social Network

1. Arquitectura y Tipado (TypeScript)
   En general, el uso de TypeScript está bien encaminado con interfaces definidas en types/models/, pero hay algunos "falsos positivos" de seguridad en el tipado que generarán deuda técnica:

Tipados Débiles en Mutaciones: En types/models/user.ts, la interfaz UpdateUserVariables tiene la propiedad trajectories?: any[];. Usar any en una aplicación a punto de salir a producción anula el propósito de TS y puede inducir bugs silenciosos.
Inconsistencia de Valores en Enums: En register-page.tsx (y posiblemente en la base de datos), el rol permite "player" | "club_admin" | "Coach". La capitalización de "Coach" rompe la convención (camelCase/snake_case) del backend, lo que a futuro traerá dolores de cabeza al hacer mapeos o traducciones.
Tipados al Vuelo (Inline): En componentes como ProfileHeader.tsx, vi destructuraciones de GraphQL tipeadas como (f: any). Es vital mapear esto estrictamente contra las interfaces generadas por @graphql-codegen que ya tienes en tus dependencias.
✅ Lo bueno: El esquema de JobOpportunity está muy bien hecho; utililzar tipos literales para el estado ("open" | "closed" | "filled") asegura muchísima robustez en el UI.

2. Performance & SEO (SSR vs SSG)
   Este es el punto más crítico a abordar antes del lanzamiento:
   Páginas clave renderizadas en cliente: Actualmente, la ruta /opportunities/page.tsx tiene la directiva "use client" en la raíz. Esto significa que estás usando Client-Side Rendering (CSR) para la bolsa de trabajo. Google y otros motores de búsqueda tendrán problemas indexando tus vacantes.
   Fix sugerido: Migrar esto a un Server Component. Cargar los jobs del lado del servidor (SSR con fetch) y solo pasar a un cliente ("use client") los pequeños componentes interactivos (como la barra de filtros).
   Ausencia de Meta Tags Dinámicos (Open Graph & Twitter Cards): Al explorar todo el directorio app, no se encontraron implementaciones de la función nativa generateMetadata(). Si un club comparte el link del perfil de un jugador por WhatsApp o LinkedIn, solo se verá un recuadro genérico predeterminado por el layout.tsx. Debes inyectar metadatos dinámicos por perfil y por oferta de trabajo.

3. Core Web Vitals (Imágenes y Renderizado)
   Next/Image no se está usando: En ProfileHeader.tsx importas Image de next/image, pero a la hora de renderizar el cover y el avatar, utilizas etiquetas nativas <img src=...> y componentes de animacion <motion.img>.
   Riesgo: Esto significa que descargas imágenes gigantes o sin comprimir directo al navegador, arruinando drásticamente tu LCP (Largest Contentful Paint).
   Fix sugerido: Usa el tag <Image> nativo de Next.js u optimiza usando motion(Image) integrando framer-motion con el tag de Next. Además, recuerda añadir los dominios de los buckets de imágenes en el archivo next.config.mjs (ej. AWS S3 o Cloudinary) para autorizar optimizaciones en la nube.

4. Flujos de Usuario (UX)
   Registro Genérico vs Especializado: La página register-page.tsx maneja a todos los miembros por igual en un solo formulario. Tienes un registro genérico donde el usuario solo cambia un select para ser "jugador" o "admin de club". Un club debería tener requerimientos muy distintos en el Onboarding (ej: subir el crest del club, locación del estadio) respecto a un jugador (altura, peso, posición, highlights). Es buena idea condicionar los campos o dividir el flujo de registro.
   Filtros de Búsqueda y "Shareability": En opportunities-page.tsx, los filtros aparentan ser manejados por componentes locales de estado (Zustand/useState). Para una experiencia moderna (y buen SEO), los filtros de empleo deberían almacenarse en la URL (/opportunities?location=SP&role=coach). De esta forma, si recargo la página, el filtro sigue activo, y si copio el link y se lo mando a un amigo, él verá mi misma búsqueda.

5. Ruta de Acción a Producción (Must-Haves) To-Do List
   He priorizado esta lista en orden de impacto y urgencia de cara al deployment:

🔴 Refactor de Server Components (SEO):
Remover "use client" del root page de /opportunities y /profile/[id].
Recuperar la data a través de fetch o de tu cliente GraphQL, del lado del servidor, transfiriendo los componentes interactivos a children clients.
🔴 Optimización de Imágenes:
Reemplazar toda etiqueta <img /> por <Image /> de Next.js para Avatares, Covers y Posts.
Configurar los remotePatterns en next.config.mjs.
🟠 Social Media Sharing (Metadatos):
Implementar y exportar la unción asíncrona generateMetadata en las rutas de Perfiles de Jugador y Ofertas de Trabajo.
🟠 Refactorizar Onboarding/Register:
Agregar renderizado condicional en los campos del form según el Rol seleccionado por el usuario, previniendo solicitar Curriculum Url a un Club, por ejemplo. En esto destaco el excelente uso actual del middleware lógico que ya tienes de Zod (zodResolver).
🟡 Manejo de Estado de Filtros a URL:
Cambiar el control de los filtros de estado de vacantes de estado local hacia Query Params utilizando el router de Next (useRouter, useSearchParams).
🟡 Sanitizar TypeScript:
Eliminar los tipos any[] que rondan en UpdateUserVariables e implementar un type/interface rígida para UserTrajectory.
Arreglar las key strings del enum Roles a convención (modificar "Coach" a "coach" a lo ancho de toda la aplicación).
