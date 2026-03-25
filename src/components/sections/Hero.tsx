import { useState, useEffect, useRef } from "react";
import ContactModal from "../ContactModal";
import { trackCTAClick } from "@/hooks/useTracking";
import logoSer from "@/assets/logo-ser.svg";

const HERO_BG = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80";
const DOC_1 = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80";
const DOC_2 = "https://images.unsplash.com/photo-1594824476967-48c8b964dc31?w=600&q=80";

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const circleRef = useRef<SVGSVGElement>(null);

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

      <div className="hero-v2__content">
        {/* Left side */}
        <div className="hero-v2__left">
          <div className="hero-v2__years" data-anim="fade-up">
            <span className="hero-v2__years-num">58</span>
            <span className="hero-v2__years-label">años</span>
          </div>

          {/* Circular text with logo */}
          <div className="hero-v2__circle-wrap" data-anim="fade-up" data-anim-delay="0.1s">
            <div className="hero-v2__logo-blob">
              <img src={logoSer} alt="Logo SER" className="hero-v2__logo-img" />
            </div>
            <svg ref={circleRef} className="hero-v2__circle-text" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <path id="circlePath" d="M150,150 m-120,0 a120,120 0 1,1 240,0 a120,120 0 1,1 -240,0" />
              </defs>
              <text>
                <textPath href="#circlePath" className="hero-v2__rotating-text">
                  TRANSFORMANDO VIDAS DESDE 1968 · CLÍNICA DE REHABILITACIÓN DE ADICCIONES · PUEBLA — MÉXICO · 
                </textPath>
              </text>
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 150 150" to="360 150 150" dur="30s" repeatCount="indefinite" />
            </svg>
          </div>

          <h1 className="hero-v2__title" data-anim="fade-up" data-anim-delay="0.2s">
            la experiencia de ser líderes<br />en tratamiento de adicciones
          </h1>

          <div className="hero-v2__actions" data-anim="fade-up" data-anim-delay="0.3s">
            <button className="hero-v2__btn-call" onClick={() => { trackCTAClick("AGENDAR_HERO"); setModalOpen(true); }}>
              📞 Agendar llamada
            </button>
          </div>
        </div>

        {/* Right side - circular photos */}
        <div className="hero-v2__right" data-anim="fade-left">
          <div className="hero-v2__photo-circle hero-v2__photo-circle--1">
            <img src={DOC_1} alt="Equipo médico" />
          </div>
          <div className="hero-v2__photo-circle hero-v2__photo-circle--2">
            <img src={DOC_2} alt="Equipo médico" />
          </div>
          <div className="hero-v2__circle-outline hero-v2__circle-outline--1" />
          <div className="hero-v2__circle-outline hero-v2__circle-outline--2" />
          <div className="hero-v2__label-tag">Equipo médico</div>
        </div>
      </div>

      {/* Chat bubble */}
      <div className="hero-v2__chat-bubble" data-anim="fade-up" data-anim-delay="0.3s">
        <span className="hero-v2__chat-icon">💬</span>
        <span>Hola, ¿necesitas ayuda?</span>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} source="hero_button" />

      <style>{`
        .hero-v2 { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; padding: 100px 48px 64px; }
        .hero-v2__bg-wrap { position: absolute; inset: 0; z-index: 1; }
        .hero-v2__overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,46,0.75) 0%, rgba(26,26,46,0.55) 100%); z-index: 2; }
        .hero-v2__bg-img { width: 100%; height: 110%; object-fit: cover; will-change: transform; }
        .hero-v2__content { position: relative; z-index: 10; max-width: 1300px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }

        .hero-v2__left { display: flex; flex-direction: column; }
        .hero-v2__years { display: flex; align-items: baseline; gap: 8px; margin-bottom: 24px; }
        .hero-v2__years-num { font-family: 'Inter', sans-serif; font-size: clamp(72px, 10vw, 120px); font-weight: 900; color: white; line-height: 1; letter-spacing: -0.03em; }
        .hero-v2__years-label { font-family: 'Inter', sans-serif; font-size: clamp(24px, 3vw, 36px); font-weight: 300; color: rgba(255,255,255,0.7); }

        .hero-v2__circle-wrap { position: relative; width: clamp(260px, 30vw, 380px); height: clamp(260px, 30vw, 380px); margin-bottom: 32px; }
        .hero-v2__logo-blob { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 55%; height: 55%; background: white; border-radius: 42% 58% 55% 45% / 50% 45% 55% 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 12px 40px rgba(0,0,0,0.15); z-index: 2; }
        .hero-v2__logo-img { width: 70%; height: auto; }
        .hero-v2__circle-text { width: 100%; height: 100%; }
        .hero-v2__rotating-text { font-family: 'Inter', sans-serif; font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.18em; fill: rgba(255,255,255,0.55); }

        .hero-v2__title { font-family: 'Inter', sans-serif; font-size: clamp(22px, 3vw, 32px); font-weight: 400; color: rgba(255,255,255,0.85); line-height: 1.4; margin: 0 0 32px; }
        .hero-v2__actions { display: flex; gap: 16px; }
        .hero-v2__btn-call { background: white; color: #1A1A2E; border: none; padding: 16px 36px; border-radius: 60px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        .hero-v2__btn-call:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.2); }

        .hero-v2__right { position: relative; height: 500px; }
        .hero-v2__photo-circle { position: absolute; border-radius: 50%; overflow: hidden; border: 3px solid rgba(255,255,255,0.15); }
        .hero-v2__photo-circle img { width: 100%; height: 100%; object-fit: cover; }
        .hero-v2__photo-circle--1 { width: 260px; height: 260px; top: 0; right: 0; }
        .hero-v2__photo-circle--2 { width: 300px; height: 300px; bottom: 20px; right: 60px; }
        .hero-v2__circle-outline { position: absolute; border-radius: 50%; border: 1px solid rgba(255,255,255,0.12); }
        .hero-v2__circle-outline--1 { width: 340px; height: 340px; top: -30px; right: -30px; }
        .hero-v2__circle-outline--2 { width: 200px; height: 200px; bottom: 100px; right: 320px; }
        .hero-v2__label-tag { position: absolute; top: 200px; right: -10px; font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(255,255,255,0.6); font-weight: 500; }

        .hero-v2__chat-bubble { position: absolute; top: 120px; right: 48px; z-index: 20; background: white; color: #1A1A2E; padding: 10px 20px; border-radius: 24px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.12); }
        .hero-v2__chat-icon { font-size: 18px; }

        @media (max-width: 900px) {
          .hero-v2 { padding: 100px 24px 48px; }
          .hero-v2__content { grid-template-columns: 1fr; }
          .hero-v2__right { display: none; }
          .hero-v2__chat-bubble { top: 80px; right: 16px; font-size: 12px; padding: 8px 14px; }
          .hero-v2__circle-wrap { width: 240px; height: 240px; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
