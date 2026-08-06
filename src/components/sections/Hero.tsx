import { useState, useEffect, useRef } from "react";
import ContactModal from "../ContactModal";
import { trackCTAClick } from "@/hooks/useTracking";
import { waLink } from "@/lib/site";
import { Phone, MessageCircle } from "lucide-react";

// Imagen protagonista del hero — foto real ya existente en el repo.
const HERO_IMG = "/images/equipo.jpg";

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [countVal, setCountVal] = useState(0);
  const countRafRef = useRef<number>(0);
  const [visible, setVisible] = useState(false);

  // Count-up animation 0 → 58
  useEffect(() => {
    const duration = 2000;
    const target = 58;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // ease-out cubic
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setCountVal(Math.round(ease(progress) * target));
      if (progress < 1) countRafRef.current = requestAnimationFrame(tick);
    };
    countRafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(countRafRef.current);
  }, []);

  // Fade-in trigger
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-v2">
      <div className="hero__container">
        <div className={`hero__left ${visible ? "hero__left--visible" : ""}`}>
          <div className="hero__years">
            <span className="hero__years-num">{countVal}</span>
            <span className="hero__years-label">años</span>
          </div>

          <h1 className="hero__headline">
            La experiencia de ser líderes<br />en tratamiento de adicciones en Puebla
          </h1>

          <div className="hero__ctas">
            <button className="hero__btn hero__btn--primary" onClick={() => { trackCTAClick("AGENDAR_HERO"); setModalOpen(true); }}>
              <Phone size={18} aria-hidden="true" /> Agendar llamada
            </button>
            <a
              className="hero__btn hero__btn--wa"
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contáctanos por WhatsApp"
              onClick={() => trackCTAClick("WA_HERO_BUBBLE")}
            >
              <MessageCircle size={18} aria-hidden="true" /> Hola, ¿necesitas ayuda?
            </a>
          </div>
        </div>

        <div className={`hero__right ${visible ? "hero__right--visible" : ""}`}>
          <img src={HERO_IMG} alt="Equipo médico de Clínica SER" loading="eager" className="hero__photo" />
        </div>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} source="hero_button" />

      <style>{`
        .hero-v2 { position: relative; background: #FFFFFF; overflow: hidden; }
        .hero__container { position: relative; z-index: 2; width: 100%; display: grid; grid-template-columns: 40% 60%; align-items: stretch; min-height: clamp(520px, 78vh, 760px); }

        .hero__left { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 8px; background: #F5F5F5; padding: clamp(96px, 10vw, 140px) clamp(24px, 4vw, 72px) clamp(48px, 6vw, 80px); opacity: 0; transform: translateY(24px); transition: opacity .8s ease, transform .8s ease; }
        .hero__left--visible { opacity: 1; transform: translateY(0); }

        .hero__years { display: flex; align-items: baseline; gap: 8px; margin-bottom: 4px; }
        .hero__years-num { font-family: 'Source Sans 3', sans-serif; font-size: clamp(38px, 4.4vw, 64px); font-weight: 700; color: var(--brand-navy); line-height: 1; letter-spacing: -.02em; }
        .hero__years-label { font-family: 'Source Sans 3', sans-serif; font-size: clamp(14px, 1.5vw, 20px); font-weight: 400; color: rgba(0,48,87,.72); }

        .hero__headline { font-family: 'Source Sans 3', sans-serif; font-size: clamp(28px, 3.4vw, 50px); font-weight: 800; color: var(--brand-navy); line-height: 1.12; letter-spacing: -.015em; margin: 0 0 28px; text-align: left; max-width: 20ch; animation: hero-fade-up .8s ease .3s both; }

        .hero__ctas { display: flex; flex-wrap: wrap; gap: 12px; animation: hero-fade-up .8s ease .5s both; }
        @keyframes hero-fade-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .hero__btn { display: inline-flex; align-items: center; gap: 8px; border: none; border-radius: 60px; padding: 15px 30px; font-family: 'Source Sans 3', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none; transition: transform .3s ease, box-shadow .3s ease, background .3s ease; }
        .hero__btn--primary { background: var(--brand-navy); color: #FFFFFF; box-shadow: 0 6px 22px rgba(0,48,87,.22); }
        .hero__btn--primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,48,87,.28); }
        .hero__btn--wa { background: var(--brand-gold); color: var(--brand-navy); box-shadow: 0 6px 22px rgba(217,199,86,.28); }
        .hero__btn--wa:hover { background: var(--brand-gold-dark); color: var(--brand-navy); transform: translateY(-2px); }

        .hero__right { position: relative; min-height: clamp(320px, 46vw, 760px); opacity: 0; transform: translateX(28px); transition: opacity 1s ease .25s, transform 1s ease .25s; }
        .hero__right--visible { opacity: 1; transform: translateX(0); }
        .hero__photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 22%; display: block; }

        @media (prefers-reduced-motion: reduce) {
          .hero__left, .hero__right { transition: none; }
          .hero__headline, .hero__ctas { animation: none; }
        }

        @media (max-width: 900px) {
          .hero__container { grid-template-columns: 1fr; min-height: 0; }
          .hero__right { order: 1; min-height: 300px; height: 58vw; }
          .hero__left { order: 2; padding: 40px 24px 56px; align-items: flex-start; }
          .hero__headline { max-width: none; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
