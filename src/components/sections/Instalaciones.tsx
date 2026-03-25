import { Link } from "react-router-dom";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80", alt: "Fachada SER" },
  { src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80", alt: "Jardines" },
  { src: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80", alt: "Habitaciones" },
];

const Instalaciones = () => {
  return (
    <section className="inst-sec">
      <div className="inst-sec__container">
        <div className="inst-sec__header" data-anim="fade-up">
          <div>
            <span className="inst-sec__tag">NUESTRO ENTORNO</span>
            <h2 className="inst-sec__title">Instalaciones diseñadas para la paz</h2>
          </div>
          <Link to="/instalaciones" className="inst-sec__link">Ver galería completa →</Link>
        </div>

        <div className="inst-sec__grid">
          {IMAGES.map((img, i) => (
            <div key={i} className="inst-sec__card" data-anim="fade-up" data-anim-delay={`${i * 0.15}s`}>
              <img src={img.src} alt={img.alt} className="inst-sec__img" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .inst-sec { padding: clamp(80px, 10vw, 140px) 24px; background: #F8F9FA; }
        .inst-sec__container { max-width: 1200px; margin: 0 auto; }
        .inst-sec__header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px; flex-wrap: wrap; gap: 24px; }
        .inst-sec__tag { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; color: #8AB83A; display: block; margin-bottom: 16px; }
        .inst-sec__title { font-family: 'Inter', sans-serif; font-size: clamp(28px, 3.5vw, 40px); font-weight: 800; color: #1A1A2E; margin: 0; line-height: 1.2; }
        .inst-sec__link { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; color: #1B2A4A; text-decoration: none; transition: color 0.2s; }
        .inst-sec__link:hover { color: #8AB83A; }

        .inst-sec__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .inst-sec__card { border-radius: 20px; overflow: hidden; aspect-ratio: 4/5; position: relative; }
        .inst-sec__img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .inst-sec__card:hover .inst-sec__img { transform: scale(1.05); }

        @media (max-width: 768px) {
          .inst-sec__grid { grid-template-columns: 1fr; }
          .inst-sec__card { aspect-ratio: 16/9; }
        }
      `}</style>
    </section>
  );
};

export default Instalaciones;
