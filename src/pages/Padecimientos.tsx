import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { waLink } from "@/lib/site";
import { MessageCircle } from "lucide-react";

// TODO: lista y descripciones pendientes de validación por el equipo médico del cliente.
// Estas 6 provienen del sitio anterior; ninguna incluye sintomatología por falta de fuente.
const CONDITIONS = [
  {
    title: "Alcoholismo",
    desc: "Somos expertos en rehabilitación de alcoholismo. Nuestro Programa de Tratamiento Integral SER® incluye evaluación clínica y médica, desintoxicación y atención primaria por especialistas en psiquiatría.",
  },
  {
    title: "Drogadicción",
    desc: "Tratamiento para la adicción a sustancias, con soporte médico y de enfermería disponible las 24 horas del día, pruebas de laboratorio, detección de drogas y electrocardiogramas.",
  },
  {
    title: "Adicción a medicamentos",
    desc: "Los anestésicos, analgésicos, sedantes y ansiolíticos en exceso, no prescritos ni controlados por un profesional médico, son tan peligrosos como cualquier otra droga. Su tratamiento requiere la intervención de especialistas en psiquiatría para un manejo adecuado y seguro.",
  },
  {
    title: "Ludopatía",
    desc: "Tratamiento para la adicción al juego y las apuestas.",
  },
  {
    title: "Codependencia",
    desc: "La codependencia requiere de tratamiento y rehabilitación oportunos, igual que una adicción.",
  },
  {
    title: "Trastornos coexistentes",
    desc: "Si no se trata el trastorno coexistente, como la depresión, la ansiedad o el estrés postraumático, junto con la adicción al alcohol o las drogas, la sobriedad se ve comprometida y aumenta significativamente el riesgo de recaída.",
  },
];

const Padecimientos = () => {
  useScrollToTop();

  return (
    <main>
      <Seo
        title="Padecimientos que Tratamos — Clínica SER Puebla"
        description="Padecimientos que atendemos en Clínica SER Puebla: alcoholismo, drogadicción, adicción a medicamentos, ludopatía, codependencia y trastornos coexistentes."
        path="/padecimientos"
      />
      <section className="pad-hero">
        <div className="pad-hero__overlay" />
        <div className="pad-hero__content" data-anim="fade-up">
          <span className="pad-hero__tag">PADECIMIENTOS QUE TRATAMOS</span>
          <h1 className="pad-hero__title">Padecimientos que atendemos</h1>
          <p className="pad-hero__sub">Adicciones y trastornos coexistentes atendidos en Clínica SER Puebla.</p>
        </div>
      </section>

      <section className="pad-grid-section">
        <div className="pad-container">
          {CONDITIONS.map((c, i) => (
            <div key={i} className="pad-card" data-anim="fade-up" data-anim-delay={`${(i % 3) * 0.12}s`}>
              <div className="pad-card__header">
                <span className="pad-card__num">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="pad-card__title">{c.title}</h2>
              </div>
              <p className="pad-card__desc">{c.desc}</p>
              <Link to="/tratamiento" className="pad-card__link">
                Conoce nuestro Modelo Hazelden →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="pad-cta">
        <div className="pad-cta__inner" data-anim="fade-up">
          <h2 className="pad-cta__title">¿Tienes dudas sobre un caso?</h2>
          <p className="pad-cta__text">Nuestro equipo puede orientarte. La llamada es confidencial y no compromete a nada.</p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="pad-cta__btn"><MessageCircle size={18} aria-hidden="true" /> Hablar con un especialista</a>
        </div>
      </section>

      <style>{`
        /* TODO: imagen del cliente para .pad-hero (fondo neutro por defecto) */
        .pad-hero { position: relative; min-height: 50vh; display: flex; align-items: center; background: #1A1A2E; }
        .pad-hero__overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,46,.88), rgba(26,26,46,.6)); }
        .pad-hero__content { position: relative; z-index: 2; max-width: 700px; padding: 120px clamp(24px,5vw,80px) 80px; }
        .pad-hero__tag { font-family: 'Inter', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: .15em; color: #C8E64A; display: block; margin-bottom: 16px; }
        .pad-hero__title { font-family: 'Inter', sans-serif; font-size: clamp(28px,4vw,48px); font-weight: 700; color: white; line-height: 1.2; margin: 0 0 16px; }
        .pad-hero__sub { font-family: 'Inter', sans-serif; font-size: 16px; color: rgba(255,255,255,.7); line-height: 1.7; margin: 0; }

        .pad-grid-section { background: #FFFFFF; padding: clamp(64px,8vw,120px) 24px; }
        .pad-container { display: grid; grid-template-columns: repeat(2,1fr); gap: 24px; max-width: 1200px; margin: 0 auto; }
        .pad-card { background: rgba(255,255,255,0.10); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 32px; transition: transform .3s; }
        .pad-card:hover { transform: translateY(-4px); }
        .pad-card__header { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
        .pad-card__num { font-family: 'Inter', sans-serif; font-size: 28px; font-weight: 800; color: #C8E64A; }
        .pad-card__title { font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 700; color: #1A1A2E; margin: 0; }
        .pad-card__desc { font-family: 'Inter', sans-serif; font-size: 14px; color: #666; line-height: 1.7; margin: 0 0 16px; }
        .pad-card__link { display: inline-block; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; color: #1B2A4A; text-decoration: none; border-bottom: 1px solid #C8E64A; padding-bottom: 2px; transition: color .2s; }
        .pad-card__link:hover { color: #8AB83A; }

        .pad-cta { background: #1B2A4A; padding: clamp(64px,8vw,100px) 24px; text-align: center; }
        .pad-cta__inner { max-width: 600px; margin: 0 auto; }
        .pad-cta__title { font-family: 'Inter', sans-serif; font-size: clamp(28px,4vw,44px); font-weight: 700; color: white; margin: 0 0 16px; }
        .pad-cta__text { font-family: 'Inter', sans-serif; font-size: 16px; color: rgba(255,255,255,.6); margin: 0 0 32px; }
        .pad-cta__btn { display: inline-flex; align-items: center; gap: 8px; background: #C8E64A; color: #1A1A2E; padding: 14px 32px; border-radius: 60px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; text-decoration: none; transition: background .2s; }
        .pad-cta__btn:hover { background: #8AB83A; color: white; }

        @media (max-width: 768px) { .pad-container { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
};

export default Padecimientos;
