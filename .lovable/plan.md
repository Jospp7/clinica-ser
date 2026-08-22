# Rediseño de la sección "Bienvenido a SER"

## Estado actual
`src/components/sections/Nosotros.tsx` ya usa un grid 50/50, pero conserva un encabezado centrado sobre el layout y un fondo blanco en la columna de texto. La imagen ocupa el 50 % del ancho, pero no llega a "sentirse" como el Hero porque falta el contraste de fondo sólido y la imagen no toca el borde de la pantalla con la misma fuerza visual.

## Objetivo
Que la imagen ocupe exactamente la mitad del viewport, con estética y estructura tipo Hero (fondo sólido + imagen full-bleed), sin romper el resto de la landing.

## Opción A — "Hero invertido" (más literal)
- Eliminar el encabezado centrado actual.
- Layout 50/50 de borde a borde, igual que el Hero.
- Columna de texto con fondo azul marino (`--brand-navy`) y texto blanco/dorado, alineado a la izquierda o centrado verticalmente.
- Columna de imagen al 50 % del viewport, `object-fit: cover`, tocando el borde derecho de la pantalla.
- Título "Bienvenido a SER" se integra dentro de la columna azul, con el acento dorado.
- En móvil: se apila texto arriba / imagen abajo, como el Hero.

## Opción B — "Mitad imagen, mitad blanco con acento"
- Mantener un encabezado mínimo o integrarlo en la columna de texto.
- Layout 50/50, imagen full-bleed a la derecha.
- Columna de texto con fondo blanco y una banda vertical decorativa azul/dorado a la izquierda para mantener la identidad sin oscurecer la sección.
- Tipografía y jerarquía inspiradas en el Hero, pero sobre fondo claro.
- En móvil: imagen arriba, texto abajo.

## Pregunta
¿Cuál de las dos opciones construyo?

## Pasos de implementación (una vez elegida)
1. Reescribir `src/components/sections/Nosotros.tsx` con el layout seleccionado.
2. Ajustar estilos scoped para que la imagen ocupe 50 vw y toque el borde de la pantalla.
3. Preservar animaciones `data-anim` existentes y el orden responsive.
4. Verificar build y vista previa en escritorio y móvil.
