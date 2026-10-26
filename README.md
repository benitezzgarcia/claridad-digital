# Claridad Digital

Blog en español con 104 artículos ampliados: los cuatro originales y 100 guías nuevas, 25 por categoría. Cada artículo tiene fotografía, créditos y enlace a su licencia. Incluye categorías indexables, búsqueda sin distinción de tildes, paginación, artículos relacionados de la misma categoría, metadatos, sitemap y robots.

## Desarrollo

Requiere Node.js 22 o 24. Ejecutar `npm ci`, `npm run build` y `npm start`. El contenido nuevo está en `content/`; cada línea base contiene título, introducción, pasos, ejemplo, errores y revisión, separados por `|`. Los archivos `*-ampliacion.txt` añaden dos secciones específicas por artículo; cada sección usa `título~texto`, separada por `|`. `npm run check:content` valida las 100 entradas y sus ampliaciones y genera `src/content/additional-articles.json`. El proceso de construcción también lo ejecuta. Los cuatro originales se amplían en `src/content/legacy-expansions.json`.

Las fotos están en `public/images/articles/`, con procedencia, autor y licencia documentados en `src/content/photo-manifest.json`. Se sirven desde la propia web; la construcción no consulta bancos de imágenes externos. El catálogo de fotos fue revisado tras la selección automática y no debe regenerarse sin una nueva revisión visual.

## Render

El archivo `render.yaml` configura un Web Service gratuito, sin base de datos obligatoria.

- Build: `npm ci && npm run build`
- Start: `npm run start -- --hostname 0.0.0.0 --port $PORT`
- Health check: `/api/health`
- Node: 22
- `NEXT_PUBLIC_SITE_URL`: URL pública definitiva si se utiliza dominio propio. En Render se usa `RENDER_EXTERNAL_URL` si no se configura aquella variable.

El servicio gratuito puede detenerse por inactividad según las condiciones de Render. Valorar un plan continuo cuando el tráfico y los ingresos lo justifiquen; no se contrata ningún servicio de pago automáticamente.

## Contacto y titular

El correo público autorizado es `jbg061108@gmail.com`; se puede sustituir con `NEXT_PUBLIC_CONTACT_EMAIL`. Completar los datos del titular y la información de privacidad según la actividad antes de solicitar monetización. Se retiraron la dirección ficticia y las afirmaciones de disponer de un equipo de expertos no identificado. El contenido nuevo declara asistencia de IA.

El formulario está desactivado por defecto. Para habilitarlo hace falta configurar `DATABASE_URL`, crear la tabla definida en `src/db/schema.ts` y activar `CONTACT_FORM_ENABLED=true`. No basta con añadir una conexión a una base vacía. Sin esta configuración la API devuelve 503 de forma controlada y la página no ofrece un formulario que falle al enviar.

## AdSense

Publicar artículos no activa anuncios ni garantiza aprobación o ingresos. Completar primero:

1. Revisar la calidad, exactitud y utilidad del contenido, y completar contacto y datos del titular.
2. Registrar el sitio y solicitar revisión en la cuenta de AdSense del titular.
3. El identificador autorizado `ca-pub-1344120784875369` está incorporado como valor predeterminado; se puede sustituir con `NEXT_PUBLIC_ADSENSE_CLIENT_ID`. La etiqueta meta y `/ads.txt` se generan con ese valor. En AdSense, elegir el método «Etiqueta meta» y solicitar la verificación tras el despliegue. Esto no activa anuncios.
4. Configurar una CMP certificada para el consentimiento que corresponda a la audiencia; la web no implementa una CMP por el mero hecho de cambiar una variable. Revisar privacidad con los datos y proveedores reales.
5. Tras configurar el consentimiento y contar con aprobación, activar `NEXT_PUBLIC_ADSENSE_ENABLED=true` y `NEXT_PUBLIC_ADSENSE_CMP_READY=true`, habilitar Auto Ads en AdSense y volver a desplegar.

No hay bloques con identificadores inventados ni solicitudes de anuncios mientras no se habilite la configuración. Las dos variables de activación son una barrera de configuración, no una certificación automática de cumplimiento.

Referencias: [sitio preparado para AdSense](https://support.google.com/adsense/answer/7299563?hl=es), [consentimiento y CMP](https://support.google.com/adsense/answer/13554020?hl=es), [Next.js en Render](https://render.com/docs/deploy-nextjs-app).
