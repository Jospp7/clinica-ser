# Rediseño de la sección "Bienvenido a SER"

## Estado actual
`src/components/sections/Nosotros.tsx` ya usa un grid 50/50, pero conserva un encabezado centrado sobre el layout y un fondo blanco en la columna de texto. La imagen ocupa el 50 % del ancho, pero no llega a "sentirse" como el Hero porque falta el contraste de fondo sólido y la imagen no toca el borde de la pantalla con la misma fuerza visual.

## Objetivo
Que la imagen ocupe exactamente la mitad del viewport, con estética y estructura tipo Hero (fondo sólido + imagen full-bleed), sin romper el resto de la landing.

## Opción elegida: B — "Mitad imagen, mitad blanco con acento"
- Layout 50/50 de borde a borde, imagen full-bleed a la derecha ocupando el 50 % del viewport.
- Columna de texto con fondo blanco y una banda vertical decorativa azul marino (`--brand-navy`) a la izquierda para mantener la identidad sin oscurecer la sección.
- Título "Bienvenido a SER" integrado en la columna de texto, alineado a la izquierda, con acento dorado en la segunda línea.
- Tipografía y jerarquía inspiradas en el Hero, pero sobre fondo claro.
- En móvil: imagen arriba, texto abajo.

## Pasos de implementación
1. Reescribir `src/components/sections/Nosotros.tsx` con el layout seleccionado.
2. Ajustar estilos scoped para que la imagen ocupe 50 vw y toque el borde derecho de la pantalla.
3. Preservar animaciones `data-anim` existentes y el orden responsive.
4. Verificar build y vista previa en escritorio y móvil.
