import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { ArrowRight, BookOpen, LifeBuoy } from "lucide-react";

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
];

const Guias = () => {
  useScrollToTop();

  return (
    <main>
      <Seo
        title="Guías para familias — Clínica SER"
        description="Guía de ingreso y guía de intervención de Clínica SER: información para familias que buscan ayuda profesional en adicciones."
        path="/guias"
      />

      <section className="guias-idx__hero">
        <div className="guias-idx__hero-inner">
          <span className="guias-idx__tag">RECURSOS</span>
          <h1 className="guias-idx__title">Guías para familias</h1>
          <p className="guias-idx__sub">
            Elige la guía que necesitas para dar el siguiente paso.
          </p>
        </div>
      </section>

      <section className="guias-idx__grid-section deco-host">
        <span className="brand-deco brand-deco--gold brand-deco--side-l" aria-hidden="true" />
        <span className="brand-deco brand-deco--navy brand-deco--side-r" aria-hidden="true" />
        <span className="brand-deco brand-deco--ring brand-deco--ring-l" aria-hidden="true" />
        <span className="brand-deco brand-deco--gold brand-deco--dots brand-deco--dots-br" aria-hidden="true" />
        <div className="guias-idx__grid">
          {GUIAS.map((g) => (
            <Link key={g.to} to={g.to} className="guias-idx__card" data-anim="fade-up">
              <span className="guias-idx__card-icon"><g.icon size={26} aria-hidden="true" /></span>
              <span className="guias-idx__card-tag">{g.tag}</span>
              <h2 className="guias-idx__card-title">{g.title}</h2>
              <p className="guias-idx__card-text">{g.text}</p>
              <span className="guias-idx__card-cta">Leer la guía <ArrowRight size={16} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        .guias-idx__hero { background: #003057; padding: clamp(120px,14vw,180px) 24px clamp(56px,7vw,90px); text-align: center; }
        .guias-idx__hero-inner { max-width: 780px; margin: 0 auto; }
        .guias-idx__tag { display: inline-block; font-family: 'Source Sans 3', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: .14em; color: #D9C756; margin-bottom: 14px; }
        .guias-idx__title { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(32px,5vw,52px); color: #fff; margin: 0 0 14px; }
        .guias-idx__sub { font-family: 'Source Sans 3', sans-serif; font-size: 16px; color: rgba(255,255,255,0.85); margin: 0; }
        .guias-idx__grid-section { background: #FFFFFF; padding: clamp(48px,7vw,90px) 24px clamp(64px,8vw,110px); }
        .guias-idx__grid { max-width: 980px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
        .guias-idx__card { display: flex; flex-direction: column; align-items: flex-start; background: #FFFFFF; border: 1px solid #EAEAEA; border-radius: 18px; padding: 32px; text-decoration: none; box-shadow: 0 6px 24px rgba(0,0,0,.06); transition: transform .25s ease, box-shadow .25s ease; }
        .guias-idx__card:hover { transform: translateY(-4px); box-shadow: 0 14px 36px rgba(0,0,0,.12); }
        .guias-idx__card-icon { display: inline-flex; align-items: center; justify-content: center; width: 52px; height: 52px; border-radius: 14px; background: #F2F6E0; color: #003057; margin-bottom: 18px; }
        .guias-idx__card-tag { font-family: 'Source Sans 3', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: .14em; color: #8A7826; margin-bottom: 8px; }
        .guias-idx__card-title { font-family: 'Playfair Display', Georgia, serif; font-size: 24px; color: #003057; margin: 0 0 10px; }
        .guias-idx__card-text { font-family: 'Source Sans 3', sans-serif; font-size: 15px; line-height: 1.6; color: #444; margin: 0 0 20px; }
        .guias-idx__card-cta { margin-top: auto; display: inline-flex; align-items: center; gap: 8px; font-family: 'Source Sans 3', sans-serif; font-size: 14px; font-weight: 700; color: #003057; }
      `}</style>
    </main>
  );
};

export default Guias;