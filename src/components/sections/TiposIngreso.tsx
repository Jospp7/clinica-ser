import { useState } from "react";
import ContactModal from "../ContactModal";
import { trackCTAClick } from "@/hooks/useTracking";

const CARDS = [
  {
    num: 1,
    title: "Ingreso Voluntario",
    desc: "Tu ser querido está de acuerdo en recibir ayuda. El Ingreso lo puedes realizar las 24 horas, los 365 días del año.",
    items: [], // Sin bullets en el sitio original — verificado
    cta: { kind: "modal" as const, label: "Contáctanos", track: "CONTACTANOS_CARD_VOLUNTARIO" },
  },
  {
    num: 2,
    title: "Ingreso por Emergencia",
    desc: "Si tu familiar presenta alguno de estos síntomas de urgencia menor, según la Norma Oficial Mexicana, la familia puede realizar el Ingreso Involuntario cuando se presentan los siguientes casos:",
    items: [
      "Intoxicación",
      "Síndrome de abstinencia o supresión",
      "Trastorno psicótico agudo, caracterizado por: errores de juicio y conductas de alucinación; alta posibilidad de daño a sí mismo o a terceros; agresividad y agitación psicomotora.",
    ],
    cta: { kind: "tel" as const, href: "tel:+522222317626", label: "Llámanos Ahora", track: "LLAMAR_CARD_EMERGENCIA" },
  },
  {
    num: 3,
    title: "Ingreso por Intervención",
    desc: "Si tu ser querido necesita ayuda, pero se niega a recibir tratamiento, consulta la guía para saber qué hacer en ese caso.",
    items: [], // Sin bullets en el sitio original — verificado
    // TODO: apuntar a /guia-intervencion cuando exista la ruta
    cta: { kind: "modal" as const, label: "Consulta la guía", track: "GUIA_CARD_INTERVENCION" },
  },
];

const TiposIngreso = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="tipos-v2">
      <div className="tipos-v2__container">
        <div className="tipos-v2__header" data-anim="fade-up">
          <div>
            <span className="tipos-v2__tag">☑️ NUESTROS SERVICIOS</span>
            <h2 className="tipos-v2__title">
              ¿Cómo podemos ayudarte en<br />la clínica de adicciones?
            </h2>
          </div>
          <button className="tipos-v2__cta" onClick={() => { trackCTAClick("CONTACTANOS_TIPOS"); setModalOpen(true); }}>
            CONTÁCTANOS
          </button>
        </div>

        <div className="tipos-v2__grid">
          {CARDS.map((c, i) => (
            <div key={i} className="tipos-v2__card" data-anim="fade-up" data-anim-delay={`${i * 0.15}s`}>
              <div className="tipos-v2__card-num">{c.num}</div>
              <h3 className="tipos-v2__card-title">{c.title}</h3>
              <p className="tipos-v2__card-desc">{c.desc}</p>
              <ul className="tipos-v2__card-list">
                {c.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
              {c.cta.kind === "tel" ? (
                <a
                  href={c.cta.href}
                  className="tipos-v2__cta tipos-v2__card-cta"
                  onClick={() => trackCTAClick(c.cta.track)}
                >
                  {c.cta.label}
                </a>
              ) : (
                <button
                  className="tipos-v2__cta tipos-v2__card-cta"
                  onClick={() => { trackCTAClick(c.cta.track); setModalOpen(true); }}
                >
                  {c.cta.label}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} source="tipos_ingreso" />

      <style>{`
        .tipos-v2 { padding: clamp(80px, 10vw, 120px) 24px; background: #FFFFFF; }
        .tipos-v2__container { max-width: 1300px; margin: 0 auto; }
        .tipos-v2__header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 48px; flex-wrap: wrap; gap: 24px; }
        .tipos-v2__tag { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #8AB83A; display: block; margin-bottom: 16px; }
        .tipos-v2__title { font-family: 'Inter', sans-serif; font-size: clamp(20px, 2.8vw, 34px); font-weight: 800; color: #1A1A2E; margin: 0; line-height: 1.15; letter-spacing: -0.02em; }
        .tipos-v2__cta { background: #C8E64A; color: #1A1A2E; border: none; padding: 14px 32px; border-radius: 60px; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.3s ease; letter-spacing: 0.08em; text-transform: uppercase; align-self: flex-start; margin-top: 8px; }
        .tipos-v2__cta:hover { background: #8AB83A; color: white; transform: translateY(-2px); }

        .tipos-v2__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .tipos-v2__card { background: #F5F5F0; padding: 40px 32px; border-radius: 16px; }
        .tipos-v2__card-num { width: 48px; height: 48px; border-radius: 50%; background: #C8A84A; color: white; display: flex; align-items: center; justify-content: center; font-family: 'Inter', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 24px; }
        .tipos-v2__card:nth-child(2) .tipos-v2__card-num { background: #1A5276; }
        .tipos-v2__card:nth-child(3) .tipos-v2__card-num { background: #27AE60; }
        .tipos-v2__card-title { font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 700; color: #1A1A2E; margin: 0 0 16px; }
        .tipos-v2__card-desc { font-family: 'Inter', sans-serif; font-size: 14px; color: #666; line-height: 1.6; margin: 0 0 20px; }
        .tipos-v2__card-list { list-style: none; padding: 0; margin: 0; }
        .tipos-v2__card-list li { font-family: 'Inter', sans-serif; font-size: 14px; color: #555; line-height: 1.5; padding: 6px 0 6px 20px; position: relative; }
        .tipos-v2__card-list li::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 6px; height: 6px; border-radius: 50%; background: #C8A84A; }
        .tipos-v2__card-cta { display: inline-block; margin-top: 20px; text-decoration: none; text-align: center; }

        @media (max-width: 900px) { .tipos-v2__grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
};

export default TiposIngreso;
