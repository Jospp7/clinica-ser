# Mejoras: logo, guías y métricas de admin

## 1. Visibilidad y tamaño del logo

- **Navbar**: el logo PNG tiene tinta oscura y la barra es azul translúcida (`rgba(15,25,60,.45)`), por lo que se pierde. Se añadirá una "píldora" clara detrás del logo (fondo blanco suave + borde sutil + radio) para que el contraste sea correcto en scroll y sin scroll, y se subirá la altura de 48px a ~64px (con reducción a ~48px en móvil para no romper la barra de 64px, que crecerá a ~76px en desktop).
- **Login de admin**: el logo pasa de 48px a ~96px de alto, centrado, con más aire debajo.
- **Sidebar admin**: hoy usa `filter: brightness(10)` (lo blanquea por completo). Se sustituye por el logo real sobre fondo claro y altura ~40px para que se lea la marca.

## 2. Navegación: sección "Guías"

- Nueva página `/guias` (índice) con dos tarjetas grandes: **Guía de Ingreso** (`/guia-ingreso`) y **Guía de Intervención** (`/guia-intervencion`), cada una con un resumen corto tomado del contenido ya existente de esas páginas (sin inventar texto nuevo) y su CTA.
- Ruta añadida en `App.tsx`.
- En la navbar se agrega el enlace **GUÍAS** hacia `/guias` (también en el menú desplegable móvil). Se mantiene el estilo actual de los links.
- Enlace también desde el footer (bloque de mapa del sitio) y estado activo cuando la ruta empiece por `/guia`.
- SEO: metadatos y `Seo` component como en el resto de páginas; se añade `/guias` al `sitemap.xml`.

## 3. Métricas del panel de admin

### Por qué cambian los números al alt+tab
El registro de visitas (`usePageView`) sólo está montado en la página de inicio y se dispara en cada montaje del componente, sin deduplicar por sesión ni por ruta. Cada vez que se vuelve a montar (cambios de ruta, HMR, re-render tras volver a la pestaña) se inserta otro evento, así que los totales suben solos y no reflejan visitantes reales. Además el resto de páginas no registra nada.

### Corrección de la captura de datos
- Mover el tracking de pageview a un hook global montado una sola vez en el layout público, que escuche cambios de ruta de React Router en vez de montajes de componentes.
- Deduplicar: ignorar un evento repetido de la misma ruta + misma sesión dentro de una ventana corta (p. ej. 30s), y no registrar rutas `/admin`.
- Añadir a cada evento datos útiles ya disponibles en el navegador: `referrer`, tipo de dispositivo (móvil/tablet/escritorio) y si la sesión es nueva o recurrente, guardados en `metadata`.
- Registrar dos eventos nuevos: `form_submit` (envío de contacto exitoso, desde ContactModal y Footer) y `scroll_depth` al 75% de la página, para medir interés real.

### Métricas nuevas (las que importan para una clínica)
Para un sitio cuyo objetivo es que la gente llame, escriba por WhatsApp o deje sus datos, el panel mostrará:

**Tarjetas superiores (con comparación vs. periodo anterior)**
1. Visitantes únicos (sesiones), no pageviews.
2. Contactos recibidos (formulario).
3. Clics de contacto directo (llamadas + WhatsApp sumados).
4. Tasa de conversión = (contactos + clics de contacto) / visitantes únicos.

**Bloques de detalle**
- Tendencia diaria de visitantes y de conversiones en el mismo gráfico.
- Desglose de canal de contacto: teléfono vs. WhatsApp vs. formulario.
- Páginas que más contactos generan (no sólo las más vistas).
- Origen del tráfico por `referrer` agrupado (Google, redes, directo, otros).
- Dispositivos (móvil / escritorio).
- Estado del embudo de contactos: nuevo / contactado / cerrado, con tiempo desde el último contacto sin atender.
- Top CTAs por clics (se conserva, pero mostrando etiquetas legibles en español).

**Controles**
- Selector de periodo: hoy / 7 días / 30 días / 90 días, aplicado a todo el panel.
- Todas las tarjetas indican cuando no hay datos suficientes en vez de mostrar 0 sin contexto.

**Se retira** del panel: "Visitas totales" acumuladas históricas y "Posts publicados" como métrica destacada (pasa a un dato secundario), por no ser accionables.

## Detalles técnicos

- Las consultas por día se hacen hoy con un `count` por cada día (30 llamadas en serie). Se reemplazan por una sola consulta del rango y agregación en el cliente, lo que además elimina la lentitud actual del panel.
- Se reutiliza la tabla `page_events` existente; no hacen falta tablas nuevas. Los nuevos datos viajan en la columna `metadata` (jsonb) que ya existe.
- Nada del sitio público cambia visualmente salvo el logo de la navbar y el nuevo enlace "Guías".
