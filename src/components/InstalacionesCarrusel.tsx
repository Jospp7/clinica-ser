import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IMAGENES = [
  { src: "/images/instalaciones-1.jpg", alt: "Gimnasio equipado de Clínica SER" },
  { src: "/images/instalaciones-2.jpg", alt: "Habitación con camas y escritorio de Clínica SER" },
  { src: "/images/instalaciones-3.jpg", alt: "Área deportiva con cancha de básquetbol de Clínica SER" },
  { src: "/images/instalaciones-4.jpg", alt: "Salón para sesiones grupales de Clínica SER" },
  { src: "/images/instalaciones-5.jpg", alt: "Cama preparada en habitación de Clínica SER" },
  { src: "/images/instalaciones-6.jpg", alt: "Áreas para sesión individual de Clínica SER" },
];

const InstalacionesCarrusel = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((n: number) => {
    setIndex((prev) => (n + IMAGENES.length) % IMAGENES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % IMAGENES.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  const onTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  return (
    <div
      className="ser-carr"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="ser-carr__viewport">
        <div className="ser-carr__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {IMAGENES.map((img) => (
            <div className="ser-carr__slide" key={img.src}>
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="ser-carr__arrow ser-carr__arrow--prev"
          aria-label="Imagen anterior"
          onClick={() => { setPaused(true); go(index - 1); }}
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="ser-carr__arrow ser-carr__arrow--next"
          aria-label="Imagen siguiente"
          onClick={() => { setPaused(true); go(index + 1); }}
        >
          <ChevronRight size={22} aria-hidden="true" />
        </button>
      </div>

      <div className="ser-carr__dots">
        {IMAGENES.map((img, i) => (
          <button
            key={img.src}
            type="button"
            aria-label={`Ir a la imagen ${i + 1}`}
            aria-current={i === index}
            className={`ser-carr__dot${i === index ? " is-active" : ""}`}
            onClick={() => { setPaused(true); go(i); }}
          />
        ))}
      </div>

      <style>{`
        .ser-carr { width: 100%; max-width: 100%; }
        .ser-carr__viewport { position: relative; overflow: hidden; border-radius: 12px; }
        .ser-carr__track { display: flex; transition: transform .5s cubic-bezier(.25,.46,.45,.94); }
        .ser-carr__slide { flex: 0 0 100%; min-width: 100%; }
        .ser-carr__slide img { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }
        .ser-carr__arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 44px; height: 44px; border-radius: 50%; border: none; cursor: pointer;
          background: rgba(255,255,255,.9); color: var(--brand-navy);
          display: flex; align-items: center; justify-content: center;
          transition: background .25s ease, transform .25s ease;
        }
        .ser-carr__arrow:hover { background: var(--brand-gold); transform: translateY(-50%) scale(1.06); }
        .ser-carr__arrow--prev { left: 12px; }
        .ser-carr__arrow--next { right: 12px; }
        .ser-carr__dots { display: flex; justify-content: center; gap: 10px; margin-top: 16px; }
        .ser-carr__dot {
          width: 10px; height: 10px; border-radius: 50%; border: none; padding: 0; cursor: pointer;
          background: rgba(0,48,87,.25); transition: background .25s ease, transform .25s ease;
        }
        .ser-carr__dot.is-active { background: var(--brand-gold); transform: scale(1.25); }
        @media (max-width: 600px) {
          .ser-carr__arrow { width: 36px; height: 36px; }
          .ser-carr__arrow--prev { left: 8px; }
          .ser-carr__arrow--next { right: 8px; }
        }
      `}</style>
    </div>
  );
};

export default InstalacionesCarrusel;