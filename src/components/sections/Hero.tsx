import { useState, useEffect, useRef, useCallback } from "react";
import ContactModal from "../ContactModal";
import { trackCTAClick } from "@/hooks/useTracking";
import logoSer from "@/assets/logo-ser.png";
import { Phone, MessageCircle } from "lucide-react";

const HERO_BG = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80";
const DOC_1 = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80";
const DOC_2 = "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80";
const DOC_3 = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80";

const ORBIT_TEXT = "PUEBLA — MÉXICO  ·  TRANSFORMANDO VIDAS DESDE 1968  ·  CLÍNICA DE REHABILITACIÓN DE ADICCIONES  ·  ";

// Pill-shaped path: flat top/bottom with rounded ends
function getPillPoint(t: number, cx: number, cy: number, rx: number, ry: number) {
  // t is 0..1 around the perimeter of a stadium/pill shape
  const straightLen = (rx - ry) * 2; // horizontal straight segments
  const curveLen = Math.PI * ry; // each semicircle
  const totalPerimeter = straightLen * 2 + curveLen * 2;
  
  let dist = (t % 1) * totalPerimeter;
  
  // Top straight (left to right)
  if (dist < straightLen) {
    const frac = dist / straightLen;
    return { x: cx - (rx - ry) + frac * straightLen, y: cy - ry, angle: 0 };
  }
  dist -= straightLen;
  
  // Right semicircle (top to bottom)
  if (dist < curveLen) {
    const a = -Math.PI / 2 + (dist / curveLen) * Math.PI;
    return {
      x: cx + (rx - ry) + ry * Math.cos(a),
      y: cy + ry * Math.sin(a),
      angle: (a + Math.PI / 2) * (180 / Math.PI),
    };
  }
  dist -= curveLen;
  
  // Bottom straight (right to left)
  if (dist < straightLen) {
    const frac = dist / straightLen;
    return { x: cx + (rx - ry) - frac * straightLen, y: cy + ry, angle: 180 };
  }
  dist -= straightLen;
  
  // Left semicircle (bottom to top)
  const a = Math.PI / 2 + (dist / curveLen) * Math.PI;
  return {
    x: cx - (rx - ry) + ry * Math.cos(a),
    y: cy + ry * Math.sin(a),
    angle: (a + Math.PI / 2) * (180 / Math.PI),
  };
}

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [countVal, setCountVal] = useState(0);
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number>(0);
  const countRafRef = useRef<number>(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollPos(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Orbiting text offset animation
  useEffect(() => {
    let last = performance.now();
    const speed = 0.015; // units per ms (full loop = 1.0)
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setOffset(prev => (prev + speed * dt / 1000) % 1);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Fade-in trigger
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // SVG dimensions for pill
  const svgW = 580, svgH = 240;
  const cx = svgW / 2, cy = svgH / 2;
  const rx = 270, ry = 100; // wide pill

  const chars = ORBIT_TEXT.split("");
  const charSpacing = 1 / chars.length;

  return (
    <section className="hero-v2">
      <div className="hero-v2__bg-wrap">
        <div className="hero-v2__overlay" />
        <img src={HERO_BG} alt="Instalaciones de Clínica SER, rehabilitación de adicciones en Puebla" className="hero-v2__bg-img" style={{ transform: `translateY(${scrollPos * 0.3}px)` }} />
      </div>

      <div className="hero__container">
        <div className={`hero__left ${visible ? 'hero__left--visible' : ''}`}>
          <div className="hero__years">
            <span className="hero__years-num">{countVal}</span>
            <span className="hero__years-label">años</span>
          </div>

          <div className="hero__logo-ring">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
              {chars.map((char, i) => {
                const t = (offset + i * charSpacing) % 1;
                const pt = getPillPoint(t, cx, cy, rx, ry);
                return (
                  <text
                    key={i}
                    x={pt.x}
                    y={pt.y}
                    fill="white"
                    fontSize="11.5"
                    fontFamily="inherit"
                    fontWeight="500"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${pt.angle}, ${pt.x}, ${pt.y})`}
                    opacity={0.7}
                  >
                    {char}
                  </text>
                );
              })}
            </svg>
            <div className="hero__logo-center">
              <img src={logoSer} alt="Clínica SER" className="hero__logo-img" />
            </div>
          </div>

          <h1 className="hero__headline">
            La experiencia de ser líderes<br />en tratamiento de adicciones en Puebla
          </h1>

          <div className="hero__ctas">
            <button className="hero__btn hero__btn--primary" onClick={() => { trackCTAClick("AGENDAR_HERO"); setModalOpen(true); }}>
              <Phone size={18} aria-hidden="true" /> Agendar llamada
            </button>
          </div>
        </div>

        <div className={`hero__right ${visible ? 'hero__right--visible' : ''}`}>
          <div className="hero__right-backdrop" aria-hidden="true" />
          <div className="hero__circle hero__circle--main">
            <img src={DOC_1} alt="Doctora especialista de Clínica SER" loading="eager" />
          </div>
          <div className="hero__circle hero__circle--secondary">
            <img src={DOC_2} alt="Enfermera de Clínica SER" loading="eager" />
          </div>
          <div className="hero__circle hero__circle--third">
            <img src={DOC_3} alt="Equipo médico de Clínica SER" loading="eager" />
          </div>
          <div className="hero__ellipse hero__ellipse--1" aria-hidden="true" />
          <div className="hero__ellipse hero__ellipse--2" aria-hidden="true" />
          <div className="hero__wa-bubble" aria-hidden="true">
            <MessageCircle size={16} className="hero__wa-icon" />
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

        .hero__left { display: flex; flex-direction: column; align-items: center; opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .hero__left--visible { opacity: 1; transform: translateY(0); }

        .hero__years { display: flex; align-items: baseline; gap: 6px; margin-bottom: 8px; justify-content: center; }
        .hero__years-num { font-family: 'Inter', sans-serif; font-size: clamp(34px, 5vw, 58px); font-weight: 600; color: white; line-height: 1; letter-spacing: -0.02em; }
        .hero__years-label { font-family: 'Inter', sans-serif; font-size: clamp(13px, 1.5vw, 18px); font-weight: 300; color: rgba(255,255,255,0.7); }

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
          font-family: 'Inter', sans-serif; font-size: clamp(13px, 1.6vw, 17px); font-weight: 400;
          color: rgba(255,255,255,0.85); line-height: 1.4; margin: 0 0 24px; text-align: center;
          animation: hero-fade-up 0.8s ease 0.4s both;
        }
        .hero__ctas { display: flex; gap: 16px; justify-content: center; animation: hero-fade-up 0.8s ease 0.6s both; }
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero__btn--primary { background: white; color: #1A1A2E; border: none; padding: 16px 36px; border-radius: 60px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
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
        .hero__wa-bubble { position: absolute; bottom: 10px; right: 10px; background: white; color: #1A1A2E; padding: 10px 18px; border-radius: 24px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.12); z-index: 5; animation: hero-fade-up 0.8s ease 1s both; }
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
