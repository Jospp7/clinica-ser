import { useState, useEffect } from "react";
import ContactModal from "../ContactModal";
import { trackCTAClick } from "@/hooks/useTracking";
import logoSer from "@/assets/logo-ser.png";

const HERO_BG = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80";
const DOC_1 = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80";
const DOC_2 = "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80";
const DOC_3 = "https://images.unsplash.com/photo-1551190822-a9ce113ac100?w=600&q=80";

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPos(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero-v2">
      <div className="hero-v2__bg-wrap">
        <div className="hero-v2__overlay" />
        <img src={HERO_BG} alt="Instalaciones Clínica SER" className="hero-v2__bg-img" style={{ transform: `translateY(${scrollPos * 0.3}px)` }} />
      </div>

      <div className="hero__container">
        {/* Left side */}
        <div className="hero__left">
          <div className="hero__years" data-anim="fade-up">
            <span className="hero__years-num">58</span>
            <span className="hero__years-label">años</span>
          </div>

          {/* Oval logo ring with animated text */}
          <div className="hero__logo-ring" data-anim="fade-up" data-anim-delay="0.1s">
            <svg viewBox="0 0 500 340" aria-hidden="true" className="hero__ring-svg">
              <defs>
                <path id="ovalTop" d="M 440,170 A 190,130 0 0,0 60,170" fill="none" />
                <path id="ovalBottom" d="M 60,170 A 190,130 0 0,0 440,170" fill="none" />
              </defs>
              <g className="hero__ring-rotate">
                <text className="hero__ring-text-svg">
                  <textPath href="#ovalTop" startOffset="50%" textAnchor="middle">
                    PUEBLA — MÉXICO  ·  TRANSFORMANDO VIDAS DESDE 1968  ·
                  </textPath>
                </text>
                <text className="hero__ring-text-svg">
                  <textPath href="#ovalBottom" startOffset="50%" textAnchor="middle">
                    CLÍNICA DE REHABILITACIÓN DE ADICCIONES  ·
                  </textPath>
                </text>
              </g>
            </svg>
            <div className="hero__logo-center">
              <img src={logoSer} alt="Clínica SER" className="hero__logo-img" />
            </div>
          </div>

          <p className="hero__headline" data-anim="fade-up" data-anim-delay="0.2s">
            la experiencia de ser líderes<br />en tratamiento de adicciones
          </p>

          <div className="hero__ctas" data-anim="fade-up" data-anim-delay="0.3s">
            <button className="hero__btn hero__btn--primary" onClick={() => { trackCTAClick("AGENDAR_HERO"); setModalOpen(true); }}>
              📞 Agendar llamada
            </button>
          </div>
        </div>

        {/* Right side */}
        <div className="hero__right" data-anim="fade-left">
          <div className="hero__right-backdrop" aria-hidden="true" />
          <div className="hero__circle hero__circle--main">
            <img src={DOC_1} alt="Doctora especialista de Clínica SER" />
          </div>
          <div className="hero__circle hero__circle--secondary">
            <img src={DOC_2} alt="Enfermera de Clínica SER" />
          </div>
          <div className="hero__circle hero__circle--third">
            <img src={DOC_3} alt="Equipo médico en cirugía" />
          </div>
          <div className="hero__ellipse hero__ellipse--1" aria-hidden="true" />
          <div className="hero__ellipse hero__ellipse--2" aria-hidden="true" />
          <div className="hero__wa-bubble" aria-hidden="true">
            <span className="hero__wa-icon">💬</span>
            <span className="hero__wa-text">Hola, ¿necesitas ayuda?</span>
          </div>
        </div>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} source="hero_button" />

      <style>{`
        .hero-v2 { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; padding: 100px 48px 64px; }
        .hero-v2__bg-wrap { position: absolute; inset: 0; z-index: 1; }
        .hero-v2__overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,46,0.78) 0%, rgba(26,26,46,0.55) 100%); z-index: 2; }
        .hero-v2__bg-img { width: 100%; height: 110%; object-fit: cover; will-change: transform; }

        .hero__container { position: relative; z-index: 10; max-width: 1300px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }

        .hero__left { display: flex; flex-direction: column; align-items: center; }

        .hero__years { display: flex; align-items: baseline; gap: 8px; margin-bottom: 8px; justify-content: center; }
        .hero__years-num { font-family: 'Inter', sans-serif; font-size: clamp(50px, 7vw, 84px); font-weight: 900; color: white; line-height: 1; letter-spacing: -0.03em; }
        .hero__years-label { font-family: 'Inter', sans-serif; font-size: clamp(17px, 2vw, 25px); font-weight: 300; color: rgba(255,255,255,0.7); }

        /* Oval logo ring — bigger */
        .hero__logo-ring { position: relative; width: clamp(360px, 42vw, 500px); height: clamp(245px, 29vw, 340px); margin-bottom: 16px; }
        .hero__ring-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
        .hero__ring-text-svg { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500; fill: rgba(255,255,255,0.6); letter-spacing: 0.08em; }

        /* Animate: scale oscillation to simulate text movement along the oval */
        .hero__ring-rotate {
          transform-origin: 250px 170px;
          animation: hero-ring-spin 30s linear infinite;
        }
        @keyframes hero-ring-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .hero__logo-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 62%; height: 55%; background: white; border-radius: 140px; display: flex; align-items: center; justify-content: center; box-shadow: 0 12px 40px rgba(0,0,0,0.15); z-index: 2; }
        .hero__logo-img { width: 55%; height: auto; }

        .hero__headline { font-family: 'Inter', sans-serif; font-size: clamp(15px, 2.1vw, 22px); font-weight: 400; color: rgba(255,255,255,0.85); line-height: 1.4; margin: 0 0 24px; text-align: center; }
        .hero__ctas { display: flex; gap: 16px; justify-content: center; }
        .hero__btn--primary { background: white; color: #1A1A2E; border: none; padding: 16px 36px; border-radius: 60px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        .hero__btn--primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.2); }

        /* Right side */
        .hero__right { position: relative; height: 500px; }
        .hero__right-backdrop { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; height: 90%; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%); }
        .hero__circle { position: absolute; border-radius: 50%; overflow: hidden; border: 3px solid rgba(255,255,255,0.15); }
        .hero__circle img { width: 100%; height: 100%; object-fit: cover; }
        .hero__circle--main { width: 260px; height: 260px; top: 20px; right: 60px; z-index: 3; }
        .hero__circle--secondary { width: 200px; height: 200px; bottom: 40px; right: 0; z-index: 2; }
        .hero__circle--third { width: 160px; height: 160px; bottom: 80px; right: 240px; z-index: 1; }
        .hero__ellipse { position: absolute; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); }
        .hero__ellipse--1 { width: 340px; height: 340px; top: -10px; right: -20px; }
        .hero__ellipse--2 { width: 200px; height: 200px; bottom: 20px; right: 200px; }
        .hero__wa-bubble { position: absolute; bottom: 10px; right: 10px; background: white; color: #1A1A2E; padding: 10px 18px; border-radius: 24px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.12); z-index: 5; }
        .hero__wa-icon { font-size: 16px; }

        @media (max-width: 900px) {
          .hero-v2 { padding: 100px 24px 48px; }
          .hero__container { grid-template-columns: 1fr; }
          .hero__right { display: none; }
          .hero__logo-ring { width: 320px; height: 218px; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
