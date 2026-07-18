import Seo from "@/components/Seo";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const CONDITIONS = [
  { title: "Alcoholismo", desc: "El alcoholismo es una enfermedad crónica que afecta a millones de personas. Nuestro programa aborda la desintoxicación, la terapia conductual y el apoyo a largo plazo.", symptoms: ["Necesidad de beber cada vez más", "Incapacidad para dejar de beber", "Síntomas de abstinencia", "Descuido de responsabilidades"] },
  { title: "Adicción a cocaína", desc: "La cocaína genera una dependencia psicológica intensa. Ofrecemos intervención especializada con terapia cognitivo-conductual y soporte psiquiátrico.", symptoms: ["Euforia seguida de depresión", "Irritabilidad y ansiedad", "Problemas financieros", "Aislamiento social"] },
  { title: "Adicción a metanfetaminas", desc: "Las metanfetaminas causan daño neurológico severo. Nuestro equipo utiliza protocolos avanzados de neurorehabilitación.", symptoms: ["Pérdida de peso extrema", "Paranoia y alucinaciones", "Insomnio prolongado", "Deterioro dental"] },
  { title: "Adicción a opioides", desc: "Los opioides incluyen heroína y analgésicos de prescripción. Ofrecemos desintoxicación médica supervisada y terapia de reemplazo.", symptoms: ["Tolerancia creciente", "Dolor al dejar de consumir", "Somnolencia extrema", "Riesgo de sobredosis"] },
  { title: "Adicción a benzodiacepinas", desc: "La dependencia a medicamentos como clonazepam o diazepam requiere un proceso de desintoxicación gradual y cuidadoso.", symptoms: ["Ansiedad al intentar dejar", "Insomnio rebote", "Confusión mental", "Temblores"] },
  { title: "Trastornos de salud mental", desc: "Tratamos depresión, ansiedad, trastorno bipolar y otros padecimientos que frecuentemente acompañan a las adicciones.", symptoms: ["Cambios de humor", "Pensamientos negativos", "Aislamiento", "Dificultad para funcionar"] },
];

const Padecimientos = () => {
  useScrollToTop();

  return (
    <main>
      <Seo
        title="Padecimientos que Tratamos — Clínica SER Puebla"
        description="Especialistas en alcoholismo, adicción a cocaína, metanfetaminas, opioides, benzodiacepinas y trastornos de salud mental. Diagnóstico y plan de tratamiento personalizado."
        path="/padecimientos"
      />
      <section className="pad-hero">
        <div className="pad-hero__overlay" />
        <div className="pad-hero__content" data-anim="fade-up">
          <span className="pad-hero__tag">PADECIMIENTOS QUE TRATAMOS</span>
          <h1 className="pad-hero__title">Especialistas en adicciones<br />y salud mental</h1>
          <p className="pad-hero__sub">Cada adicción es diferente. Por eso diseñamos un plan de tratamiento personalizado para cada paciente.</p>
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
              <div className="pad-card__symptoms">
                <span className="pad-card__symptoms-label">Señales de alerta:</span>
                <ul>
                  {c.symptoms.map((s, j) => <li key={j}>{s}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pad-cta">
        <div className="pad-cta__inner" data-anim="fade-up">
          <h2 className="pad-cta__title">¿Reconoces alguna de estas señales?</h2>
          <p className="pad-cta__text">No estás solo. Nuestro equipo puede ayudarte a dar el primer paso.</p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="pad-cta__btn">💬 Hablar con un especialista</a>
        </div>
      </section>

      <style>{`
        .pad-hero { position: relative; min-height: 50vh; display: flex; align-items: center; background: url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80') center/cover; }
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
        .pad-card__symptoms-label { display: block; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; color: #8AB83A; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 8px; }
        .pad-card__symptoms ul { margin: 0; padding-left: 18px; font-family: 'Inter', sans-serif; font-size: 13px; color: #555; line-height: 1.8; }
        .pad-card__symptoms li::marker { color: #C8E64A; }

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
