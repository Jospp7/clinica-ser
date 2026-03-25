

## Plan: Hero Section Refinements

### Changes to `src/components/sections/Hero.tsx`

**1. Wider, flatter logo bubble**
- Change `.hero__logo-ring` aspect ratio to be more horizontal (e.g. `width: clamp(420px, 48vw, 580px)`, `height: clamp(180px, 18vw, 240px)`)
- Adjust `.hero__logo-center` to match: wider border-radius pill shape, less height
- Update SVG viewBox to match new proportions (e.g. `0 0 580 240`)

**2. Reduce "58 años" weight/size**
- Change `.hero__years-num` font-weight from 900 to 600 and reduce font-size to ~70% (e.g. `clamp(34px, 5vw, 58px)`)
- Reduce `.hero__years-label` proportionally

**3. Fix capitalization**
- Change `"la experiencia"` to `"La experiencia"` in the headline text

**4. Animated orbiting letters (not rotating the whole group)**
- Replace the current SVG `<textPath>` + CSS rotate approach with a React-driven animation using `useEffect` + `requestAnimationFrame`
- Position individual `<text>` elements along an elliptical path, each character placed at calculated (x, y) positions
- Animate by shifting the starting offset over time, so letters appear to travel along the pill-shaped path individually
- Use the text: `PUEBLA — MÉXICO · TRANSFORMANDO VIDAS DESDE 1968 · CLÍNICA DE REHABILITACIÓN DE ADICCIONES ·`

**5. Count-up animation for "58"**
- Add a `useEffect` that counts from 0 to 58 over ~2 seconds using `requestAnimationFrame` with easing
- Display the animated number in the `hero__years-num` span

**6. Additional visual polish**
- Fade-in animation on the headline and CTA button with staggered delays
- Subtle floating animation on the right-side circles (gentle up/down bob)
- Soft glow pulse on the logo bubble

**7. Fix broken image**
- The `DOC_3` URL (`photo-1551190822-a9ce113ac100`) appears to be an invalid/unavailable Unsplash photo
- Replace with a working medical team image URL

**8. Responsive adjustments**
- Update the mobile breakpoint to use the new wider/shorter dimensions for the logo ring

### Technical approach
- All changes in a single file: `Hero.tsx`
- The orbiting text will use a calculated elliptical path function: `x = cx + rx * cos(angle)`, `y = cy + ry * sin(angle)` with character rotation tangent to the path
- Animation state managed via `useRef` + `requestAnimationFrame` for performance (no re-renders)

