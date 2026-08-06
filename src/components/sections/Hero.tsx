import { useState, useEffect, useRef, useCallback } from "react";
import ContactModal from "../ContactModal";
import { trackCTAClick } from "@/hooks/useTracking";
import { waLink } from "@/lib/site";
import logoSer from "@/assets/logo-ser.png";
import { Phone, MessageCircle } from "lucide-react";

// TODO: temporal — reemplazar con foto real de instalaciones.
const HERO_BG = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80";
const DOC_1 = "/images/equipo.jpg";
// TODO: temporal — reemplazar con foto real del equipo tras la visita.
const DOC_2 = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80";
// TODO: temporal — reemplazar con foto real del equipo tras la visita.
const DOC_3 = "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80";

...

          <div className="hero__circle hero__circle--secondary">
            <img src={DOC_2} alt="Especialista de Clínica SER" loading="eager" />
          </div>
          <div className="hero__circle hero__circle--third">
            <img src={DOC_3} alt="Enfermera de Clínica SER" loading="eager" />
          </div>
          <div className="hero__ellipse hero__ellipse--1" aria-hidden="true" />
          <div className="hero__ellipse hero__ellipse--2" aria-hidden="true" />
          <a
            className="hero__wa-bubble"
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contáctanos por WhatsApp"
            onClick={() => trackCTAClick("WA_HERO_BUBBLE")}
          >
            <MessageCircle size={16} className="hero__wa-icon" />
            <span className="hero__wa-text">Hola, ¿necesitas ayuda?</span>
          </a>
        </div>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} source="hero_button" />

      <style>{`
        .hero-v2 { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; padding: 100px 48px 64px; }
        .hero-v2__bg-wrap { position: absolute; inset: 0; z-index: 1; }
        .hero-v2__overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,46,0.78) 0%, rgba(26,26,46,0.55) 100%); z-index: 2; }
        .hero-v2__bg-img { width: 100%; height: 110%; object-fit: cover; will-change: transform; }

        .hero__container { position: relative; z-index: 10; max-width: 1300px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }

        .hero__left { display: flex; flex-direction: column; align-items: center; opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .hero__left--visible { opacity: 1; transform: translateY(0); }

        .hero__years { display: flex; align-items: baseline; gap: 6px; margin-bottom: 8px; justify-content: center; }
        .hero__years-num { font-family: 'Source Sans 3', sans-serif; font-size: clamp(34px, 5vw, 58px); font-weight: 600; color: white; line-height: 1; letter-spacing: -0.02em; }
        .hero__years-label { font-family: 'Source Sans 3', sans-serif; font-size: clamp(13px, 1.5vw, 18px); font-weight: 300; color: rgba(255,255,255,0.7); }

        /* Pill-shaped logo ring — wider and flatter */
        .hero__logo-ring { position: relative; width: clamp(420px, 48vw, 580px); height: clamp(170px, 18vw, 240px); margin-bottom: 20px; }

        .hero__logo-center {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 68%; height: 65%;
          background: white; border-radius: 120px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 12px 40px rgba(0,0,0,0.15), 0 0 60px rgba(255,255,255,0.06);
          z-index: 2;
          animation: hero-glow 4s ease-in-out infinite;
        }
        @keyframes hero-glow {
          0%, 100% { box-shadow: 0 12px 40px rgba(0,0,0,0.15), 0 0 40px rgba(255,255,255,0.04); }
          50% { box-shadow: 0 12px 40px rgba(0,0,0,0.15), 0 0 80px rgba(255,255,255,0.1); }
        }
        .hero__logo-img { width: 50%; height: auto; }

        .hero__headline {
          font-family: 'Source Sans 3', sans-serif; font-size: clamp(13px, 1.6vw, 17px); font-weight: 400;
          color: rgba(255,255,255,0.85); line-height: 1.4; margin: 0 0 24px; text-align: center;
          animation: hero-fade-up 0.8s ease 0.4s both;
        }
        .hero__ctas { display: flex; gap: 16px; justify-content: center; animation: hero-fade-up 0.8s ease 0.6s both; }
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero__btn--primary { background: white; color: #003057; border: none; padding: 16px 36px; border-radius: 60px; font-family: 'Source Sans 3', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        .hero__btn--primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.2); }

        /* Right side */
        .hero__right { position: relative; height: 500px; opacity: 0; transform: translateX(40px); transition: opacity 1s ease 0.3s, transform 1s ease 0.3s; }
        .hero__right--visible { opacity: 1; transform: translateX(0); }
        .hero__right-backdrop { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; height: 90%; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%); }
        .hero__circle { position: absolute; border-radius: 50%; overflow: hidden; border: 3px solid rgba(255,255,255,0.15); }
        .hero__circle img { width: 100%; height: 100%; object-fit: cover; }
        .hero__circle--main { width: 260px; height: 260px; top: 20px; right: 60px; z-index: 3; animation: hero-bob 6s ease-in-out infinite; }
        .hero__circle--secondary { width: 200px; height: 200px; bottom: 40px; right: 0; z-index: 2; animation: hero-bob 6s ease-in-out 1s infinite; }
        .hero__circle--third { width: 160px; height: 160px; bottom: 80px; right: 240px; z-index: 1; animation: hero-bob 6s ease-in-out 2s infinite; }
        @keyframes hero-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .hero__ellipse { position: absolute; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); }
        .hero__ellipse--1 { width: 340px; height: 340px; top: -10px; right: -20px; }
        .hero__ellipse--2 { width: 200px; height: 200px; bottom: 20px; right: 200px; }
        .hero__wa-bubble { position: absolute; bottom: 10px; right: 10px; background: white; color: #003057; padding: 10px 18px; border-radius: 24px; font-family: 'Source Sans 3', sans-serif; font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.12); z-index: 5; animation: hero-fade-up 0.8s ease 1s both; cursor: pointer; text-decoration: none; }
        .hero__wa-icon { font-size: 16px; }

        @media (max-width: 900px) {
          .hero-v2 { padding: 100px 24px 48px; }
          .hero__container { grid-template-columns: 1fr; }
          .hero__right { display: none; }
          .hero__logo-ring { width: 340px; height: 160px; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
