import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, LifeBuoy, HelpCircle } from "lucide-react";
import ContactoCTA from "@/components/ContactoCTA";

const GUIAS = [
  {
    to: "/guia-ingreso",
    tag: "GUÍA PARA FAMILIAS",
    icon: BookOpen,
    title: "Guía de ingreso a Clínica SER",
    text: "Modalidades de ingreso a Clínica SER (voluntario, involuntario y obligatorio) conforme a la NOM-028-SSA2-2009.",
  },
  {
    to: "/guia-intervencion",
    tag: "GUÍA PARA FAMILIAS",
    icon: LifeBuoy,
    title: "Guía de Intervención",
    text: "Cómo llevar a cabo una intervención cuando un ser querido sufre una adicción y se niega a recibir ayuda.",
  },
  {
    to: "/preguntas-frecuentes",
    tag: "¿TIENES MÁS DUDAS?",
    icon: HelpCircle,
    title: "Preguntas frecuentes",
    text: "Qué debe llevar el paciente, visitas, llamadas, acreditaciones del personal y las dudas más comunes antes del ingreso.",
  },
];

const SecGuias = () => {

  return (
    <section id="guias">

      <section className="guias-idx__hero">
        <div className="guias-idx__hero-overlay" />
        <div className="guias-idx__hero-inner">
          <span className="guias-idx__tag">RECURSOS</span>
          <h2 className="guias-idx__title">Recursos para familias</h2>
          <p className="guias-idx__sub">
            Elige el recurso que necesitas para dar el siguiente paso.
          </p>
        </div>
      </section>

      <section className="guias-idx__grid-section">
        <div className="guias-idx__grid">
          {GUIAS.map((g) => (
            <Link key={g.to} to={g.to} className="guias-idx__card" data-anim="fade-up">
              <span className="guias-idx__card-icon"><g.icon size={26} aria-hidden="true" /></span>
              <span className="guias-idx__card-tag">{g.tag}</span>
              <h3 className="guias-idx__card-title">{g.title}</h3>
              <p className="guias-idx__card-text">{g.text}</p>
              <span className="guias-idx__card-cta">Leer la guía <ArrowRight size={16} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>

      <ContactoCTA ubicacion="GUIAS" variant="azul" />

      <style>{`
        .guias-idx__hero { position: relative; background: url('/images/guias-fondo.jpg') center/cover; min-height: 260px; display: flex; align-items: center; padding: clamp(32px,4vw,48px) 24px; text-align: center; }
        .guias-idx__hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,46,.88), rgba(26,26,46,.6)); }
        .guias-idx__hero-inner { position: relative; z-index: 2; max-width: 780px; margin: 0 auto; }
        .guias-idx__tag { display: inline-block; font-family: 'Source Sans 3', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: .14em; color: #D9C756; margin-bottom: 14px; }
        .guias-idx__title { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(32px,5vw,52px); color: #fff; margin: 0 0 14px; }
        .guias-idx__sub { font-family: 'Source Sans 3', sans-serif; font-size: 16px; color: rgba(255,255,255,0.85); margin: 0; }
        @media (max-width: 768px) { .guias-idx__hero { min-height: 200px; } }
        .guias-idx__grid-section { background: #FFFFFF; padding: clamp(48px,7vw,90px) 24px clamp(64px,8vw,110px); }
        .guias-idx__grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 991px) { .guias-idx__grid { grid-template-columns: 1fr; } }
        .guias-idx__card { display: flex; flex-direction: column; align-items: flex-start; background: #FFFFFF; border: 1px solid #EAEAEA; border-radius: 18px; padding: 32px; text-decoration: none; box-shadow: 0 6px 24px rgba(0,0,0,.06); transition: transform .25s ease, box-shadow .25s ease; }
        .guias-idx__card:hover { transform: translateY(-4px); box-shadow: 0 14px 36px rgba(0,0,0,.12); }
        .guias-idx__card-icon { display: inline-flex; align-items: center; justify-content: center; width: 52px; height: 52px; border-radius: 14px; background: #F2F6E0; color: #003057; margin-bottom: 18px; }
        .guias-idx__card-tag { font-family: 'Source Sans 3', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: .14em; color: #8A7826; margin-bottom: 8px; }
        .guias-idx__card-title { font-family: 'Playfair Display', Georgia, serif; font-size: 24px; color: #003057; margin: 0 0 10px; }
        .guias-idx__card-text { font-family: 'Source Sans 3', sans-serif; font-size: 15px; line-height: 1.6; color: #444; margin: 0 0 20px; }
        .guias-idx__card-cta { margin-top: auto; display: inline-flex; align-items: center; gap: 8px; font-family: 'Source Sans 3', sans-serif; font-size: 14px; font-weight: 700; color: #003057; }
      `}</style>
    </section>
  );
};

export default SecGuias;
