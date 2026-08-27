import { useState, useEffect } from "react";
import ContactModal from "../ContactModal";
import { trackCTAClick } from "@/hooks/useTracking";
import { waLink } from "@/lib/site";
import { Phone, MessageCircle } from "lucide-react";

// TODO: temporal — reemplazar con foto real tras la visita.
const HERO_IMG = "/images/hero-fondo.jpg";

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Fade-in trigger
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-v2">
      <div className="hero__container">
        <div className={`hero__left ${visible ? "hero__left--visible" : ""}`}>
          <h1 className="hero__headline">Más de <span className="hero__headline-accent">58 años</span> recuperando vidas</h1>
          <p className="hero__subtitle">
            En Clínica SER ayudamos a personas y familias a superar las adicciones mediante un tratamiento profesional con psicólogos, médicos y terapeutas especializados.
          </p>

          <div className="hero__ctas">
            <button className="hero__btn hero__btn--primary" onClick={() => { trackCTAClick("AGENDAR_HERO"); setModalOpen(true); }}>
              <Phone size={18} aria-hidden="true" /> Agendar llamada
            </button>
            <a
              className="hero__btn hero__btn--wa"
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escríbenos por WhatsApp"
              onClick={() => trackCTAClick("WA_HERO_BUBBLE")}
            >
              <MessageCircle size={18} aria-hidden="true" /> Escríbenos por WhatsApp
            </a>
          </div>
        </div>

        <div className={`hero__right ${visible ? "hero__right--visible" : ""}`}>
          <img src={HERO_IMG} alt="Apoyo familiar en la recuperación - Clínica SER" loading="eager" className="hero__photo" />
        </div>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} source="hero_button" />

      <style>{`
        .hero-v2 { position: relative; background: #FFFFFF; overflow: hidden; padding-top: 72px; }
        .hero__container { position: relative; z-index: 2; width: 100%; display: grid; grid-template-columns: 50% 50%; align-items: stretch; min-height: clamp(520px, 78vh, 760px); }

        .hero__left { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; background: var(--brand-navy); padding: clamp(48px, 6vw, 80px) clamp(24px, 4vw, 72px); opacity: 0; transform: translateY(24px); transition: opacity .8s ease, transform .8s ease; text-align: center; }
        .hero__left--visible { opacity: 1; transform: translateY(0); }

        .hero__headline { font-family: 'Source Sans 3', sans-serif; font-size: clamp(28px, 3.4vw, 50px); font-weight: 800; color: #FFFFFF; line-height: 1.12; letter-spacing: -.015em; margin: 0 0 12px; text-align: center; max-width: 20ch; animation: hero-fade-up .8s ease .3s both; }
        .hero__headline-accent { color: var(--brand-gold); }
        .hero__subtitle { font-family: 'Source Sans 3', sans-serif; font-size: clamp(16px, 1.45vw, 20px); font-weight: 400; color: rgba(255,255,255,.9); line-height: 1.55; margin: 0 auto 28px; max-width: 42ch; text-align: center; animation: hero-fade-up .8s ease .4s both; }

        .hero__ctas { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; animation: hero-fade-up .8s ease .5s both; }
        @keyframes hero-fade-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .hero__btn { display: inline-flex; align-items: center; gap: 8px; border: none; border-radius: 60px; padding: 15px 30px; font-family: 'Source Sans 3', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none; transition: transform .3s ease, box-shadow .3s ease, background .3s ease; }
        .hero__btn--primary { background: var(--brand-gold); color: var(--brand-navy); box-shadow: 0 6px 22px rgba(217,199,86,.28); }
        .hero__btn--primary:hover { background: var(--brand-gold-dark); transform: translateY(-2px); box-shadow: 0 10px 30px rgba(217,199,86,.32); }
        .hero__btn--wa { background: #25D366; color: #FFFFFF; border: 1px solid #25D366; }
        .hero__btn--wa:hover { background: #1EBE57; color: #FFFFFF; transform: translateY(-2px); }

        .hero__right { position: relative; min-height: clamp(320px, 46vw, 760px); opacity: 0; transform: translateX(28px); transition: opacity 1s ease .25s, transform 1s ease .25s; }
        .hero__right--visible { opacity: 1; transform: translateX(0); }
        .hero__photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 55%; display: block; }

        @media (prefers-reduced-motion: reduce) {
          .hero__left, .hero__right { transition: none; }
          .hero__headline, .hero__ctas { animation: none; }
        }

        @media (max-width: 900px) {
          .hero-v2 { padding-top: 60px; }
          .hero__container { grid-template-columns: 1fr; min-height: 0; }
          .hero__right { order: 1; min-height: 300px; height: 58vw; }
          .hero__left { order: 2; padding: 40px 24px 56px; align-items: center; }
          .hero__headline { max-width: none; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
