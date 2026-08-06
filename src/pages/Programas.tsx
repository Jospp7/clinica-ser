import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { SITE, waLink } from "@/lib/site";
import { Dices, MessageCircle, Pill, Smartphone, Stethoscope, Tablets, Wine, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { trackCTAClick } from "@/hooks/useTracking";

// Lista oficial de programas validada por el cliente.
const CONDITIONS: Array<{ title: string; desc: string; icon: LucideIcon }> = [
  {
    title: "Alcohol",
    desc: "Tratamiento integral para el consumo de alcohol, con evaluación clínica, desintoxicación y atención primaria por especialistas en psiquiatría.",
    icon: Wine,
  },
  {
    title: "Drogas",
    desc: "Tratamiento para la adicción a sustancias, con soporte médico y de enfermería disponible las 24 horas del día, pruebas de laboratorio, detección de drogas y electrocardiogramas.",
    icon: Pill,
  },
  {
    title: "Ludopatía (juego y apuestas)",
    desc: "Tratamiento para la adicción al juego y las apuestas.",
    icon: Dices,
  },
  {
    title: "Tecnofilia (adicción a las nuevas tecnologías)",
    desc: "Tratamiento especializado para la adicción a las nuevas tecnologías.",
    icon: Smartphone,
    // TODO: descripción pendiente
  },
  {
    title: "Opiáceos (heroína, morfina, codeína, tebaína)",
    desc: "Tratamiento integral para el consumo de opiáceos, incluyendo heroína, morfina, codeína y tebaína.",
    icon: Tablets,
  },
  {
    title: "Medicamentos psicotrópicos (benzodiazepinas)",
    desc: "Tratamiento para la adicción a medicamentos psicotrópicos, como benzodiazepinas.",
    icon: Stethoscope,
  },
];

const Programas = () => {
  useScrollToTop();

  return (
    <main>
      <Seo
        title="Programas que Tratamos — Clínica SER Puebla"
        description="Programas que atendemos en Clínica SER Puebla: alcohol, drogas, ludopatía (juego y apuestas), tecnofilia (adicción a las nuevas tecnologías), opiáceos (heroína, morfina, codeína, tebaína) y medicamentos psicotrópicos (benzodiazepinas)."
        path="/programas"
      />
      <section className="pad-hero">
        <div className="pad-hero__overlay" />
        <div className="pad-hero__content" data-anim="fade-up">
          <span className="pad-hero__tag">PROGRAMAS QUE TRATAMOS</span>
          <h1 className="pad-hero__title">Programas que atendemos</h1>
          <p className="pad-hero__sub">Adicciones atendidas en Clínica SER Puebla.</p>
        </div>
      </section>

      <section className="pad-grid-section">
        <div className="pad-container">
            {CONDITIONS.map((c, i) => {
              const Icon = c.icon;

              return (
                <div key={i} className="pad-card" data-anim="fade-up" data-anim-delay={`${(i % 3) * 0.12}s`}>
                  <Icon className="pad-card__icon" size={38} strokeWidth={1.8} aria-hidden="true" />
                  <div className="pad-card__header">
                    <span className="pad-card__num">{String(i + 1).padStart(2, '0')}</span>
                    <h2 className="pad-card__title">{c.title}</h2>
                  </div>
                  <p className="pad-card__desc">{c.desc}</p>
                </div>
              );
            })}
        </div>

        <div className="pad-treatment-cta" data-anim="fade-up">
          <h2 className="pad-treatment-cta__title">Un mismo enfoque para cada padecimiento</h2>
          <Link
            to="/tratamiento"
            className="pad-treatment-cta__btn"
            onClick={() => trackCTAClick("PROGRAMAS_A_TRATAMIENTO")}
          >
            Conoce el Programa de Tratamiento Integral SER®, basado en el Modelo Hazelden
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="pad-cta">
        <div className="pad-cta__inner" data-anim="fade-up">
          <h2 className="pad-cta__title">¿Tienes dudas sobre un caso?</h2>
          <p className="pad-cta__text">Nuestro equipo puede orientarte. La llamada es confidencial y no compromete a nada.</p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="pad-cta__btn" title={`WhatsApp · ${SITE.whatsappHorario}`} aria-label={`Hablar con un especialista por WhatsApp · ${SITE.whatsappHorario}`}><MessageCircle size={18} aria-hidden="true" /> Hablar con un especialista</a>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.85)", marginTop: 12 }}>WhatsApp: {SITE.whatsappHorario}</p>
        </div>
      </section>

      <style>{`
        /* TODO: imagen del cliente para .pad-hero (fondo neutro por defecto) */
        .pad-hero { position: relative; min-height: 50vh; display: flex; align-items: center; background: #003057; }
        .pad-hero__overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,46,.88), rgba(26,26,46,.6)); }
        .pad-hero__content { position: relative; z-index: 2; max-width: 700px; padding: 120px clamp(24px,5vw,80px) 80px; }
        .pad-hero__tag { font-family: 'Source Sans 3', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: .15em; color: #D9C756; display: block; margin-bottom: 16px; }
        .pad-hero__title { font-family: 'Source Sans 3', sans-serif; font-size: clamp(28px,4vw,48px); font-weight: 700; color: white; line-height: 1.2; margin: 0 0 16px; }
        .pad-hero__sub { font-family: 'Source Sans 3', sans-serif; font-size: 16px; color: rgba(255,255,255,.7); line-height: 1.7; margin: 0; }

        .pad-grid-section { background: #FFFFFF; padding: clamp(64px,8vw,120px) 24px; }
        .pad-container { display: grid; grid-template-columns: repeat(2,1fr); gap: 24px; max-width: 1200px; margin: 0 auto; }
        .pad-card { background: rgba(255,255,255,0.10); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 32px; transition: transform .3s; }
        .pad-card:hover { transform: translateY(-4px); }
        .pad-card__header { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
        .pad-card__num { font-family: 'Source Sans 3', sans-serif; font-size: 28px; font-weight: 800; color: #D9C756; }
        .pad-card__title { font-family: 'Source Sans 3', sans-serif; font-size: 20px; font-weight: 700; color: #003057; margin: 0; }
        .pad-card__desc { font-family: 'Source Sans 3', sans-serif; font-size: 14px; color: #666; line-height: 1.7; margin: 0 0 16px; }
        .pad-treatment-cta { max-width: 900px; margin: clamp(48px, 6vw, 72px) auto 0; background: #003057; border: 1px solid rgba(217,199,86,.25); border-radius: 24px; padding: clamp(36px, 5vw, 56px); text-align: center; }
        .pad-treatment-cta__title { font-family: 'Source Sans 3', sans-serif; font-size: clamp(20px, 3vw, 28px); font-weight: 600; color: white; margin: 0 0 24px; line-height: 1.4; }
        .pad-treatment-cta__btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: #D9C756; color: #003057; padding: 16px 32px; border-radius: 60px; font-family: 'Source Sans 3', sans-serif; font-size: 15px; font-weight: 700; text-decoration: none; transition: background .2s, transform .2s; text-align: center; max-width: 100%; }
        .pad-treatment-cta__btn:hover { background: #B8A63F; color: #003057; transform: translateY(-2px); }

        .pad-cta { background: #003057; padding: clamp(64px,8vw,100px) 24px; text-align: center; }
        .pad-cta__inner { max-width: 600px; margin: 0 auto; }
        .pad-cta__title { font-family: 'Source Sans 3', sans-serif; font-size: clamp(28px,4vw,44px); font-weight: 700; color: white; margin: 0 0 16px; }
        .pad-cta__text { font-family: 'Source Sans 3', sans-serif; font-size: 16px; color: rgba(255,255,255,.6); margin: 0 0 32px; }
        .pad-cta__btn { display: inline-flex; align-items: center; gap: 8px; background: #D9C756; color: #003057; padding: 14px 32px; border-radius: 60px; font-family: 'Source Sans 3', sans-serif; font-size: 13px; font-weight: 600; text-decoration: none; transition: background .2s; }
        .pad-cta__btn:hover { background: #B8A63F; color: #003057; }

        @media (max-width: 768px) { .pad-container { grid-template-columns: 1fr; } .pad-treatment-cta__btn { font-size: 14px; padding: 14px 24px; } }
      `}</style>
    </main>
  );
};

export default Programas;
