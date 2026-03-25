import { useState, useEffect } from "react";
import ContactModal from "../ContactModal";
import { trackCTAClick } from "@/hooks/useTracking";

const HERO_IMG = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80";

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPos(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero">
      <div className="hero__bg-wrap">
        <div className="hero__overlay" />
        <img src={HERO_IMG} alt="Instalaciones Clínica SER" className="hero__bg-img" style={{ transform: `translateY(${scrollPos * 0.4}px) scale(1.05)` }} />
      </div>

      <div className="hero__content">
        <span className="hero__tag" data-anim="fade-up">DESDE 1967</span>
        <h1 className="hero__title" data-anim="fade-up" data-anim-delay="0.1s">
          Recupera tu vida<br />y el <span className="gradient-text">bienestar</span><br />de tu familia
        </h1>
        <p className="hero__subtitle" data-anim="fade-up" data-anim-delay="0.2s">
          Especialistas en tratamiento de adicciones y salud mental con más de 58 años de experiencia en Puebla.
        </p>
        <div className="hero__actions" data-anim="fade-up" data-anim-delay="0.3s">
          <button className="btn-primary" onClick={() => { trackCTAClick("EVALUACION_HERO"); setModalOpen(true); }}>
            AGENDAR EVALUACIÓN
          </button>
          <a href="tel:+522226884386" className="btn-outline" onClick={() => trackCTAClick("LLAMAR_HERO")}>
            📞 Llamar ahora
          </a>
        </div>
      </div>
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} source="hero_button" />

      <style>{`
        .hero { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; padding: 120px 24px 64px; }
        .hero__bg-wrap { position: absolute; inset: -5% 0 0 0; z-index: 1; }
        .hero__overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,46,0.85) 0%, rgba(26,26,46,0.6) 100%); z-index: 2; }
        .hero__bg-img { width: 100%; height: 105%; object-fit: cover; will-change: transform; }
        .hero__content { position: relative; z-index: 10; max-width: 800px; margin: 0 auto; text-align: center; }
        .hero__tag { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; color: #C8E64A; display: block; margin-bottom: 24px; }
        .hero__title { font-family: 'Inter', sans-serif; font-size: clamp(40px, 6vw, 72px); font-weight: 800; line-height: 1.1; color: white; margin: 0 0 24px; letter-spacing: -0.02em; }
        .hero__subtitle { font-family: 'Inter', sans-serif; font-size: clamp(16px, 2vw, 20px); line-height: 1.6; color: rgba(255,255,255,0.8); margin: 0 auto 40px; max-width: 600px; }
        .hero__actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .btn-primary { background: #C8E64A; color: #1A1A2E; border: none; padding: 16px 36px; border-radius: 60px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.3s ease; letter-spacing: 0.05em; }
        .btn-primary:hover { background: #8AB83A; color: white; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(200,230,74,0.2); }
        .btn-outline { background: transparent; color: white; border: 1px solid rgba(255,255,255,0.3); padding: 16px 36px; border-radius: 60px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; text-decoration: none; display: inline-flex; align-items: center; }
        .btn-outline:hover { background: rgba(255,255,255,0.1); border-color: white; transform: translateY(-2px); }
      `}</style>
    </section>
  );
};

export default Hero;
