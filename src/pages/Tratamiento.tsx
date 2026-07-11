import Seo from "@/components/Seo";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const TREATMENTS = [
  { title: "Alcoholismo", desc: "Tratamiento integral para la dependencia al alcohol, con desintoxicación médica supervisada y terapia cognitivo-conductual.", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80" },
  { title: "Drogadicción", desc: "Programas especializados para adicciones a cocaína, metanfetaminas, opioides y otras sustancias controladas.", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80" },
  { title: "Adicción a medicamentos", desc: "Tratamiento para dependencia a benzodiacepinas, analgésicos opioides y otros medicamentos de prescripción.", img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80" },
  { title: "Ludopatía", desc: "Intervención terapéutica para la adicción al juego compulsivo, con enfoque en rehabilitación conductual.", img: "https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=600&q=80" },
  { title: "Codependencia", desc: "Terapia para familiares que han desarrollado patrones codependientes. Recuperamos el bienestar de toda la familia.", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80" },
  { title: "Doble diagnóstico", desc: "Tratamiento simultáneo de adicciones y trastornos de salud mental como depresión, ansiedad o bipolaridad.", img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80" },
];

const PROCESS = [
  { step: "01", title: "Evaluación inicial", desc: "Valoración médica y psicológica completa para diseñar tu plan de tratamiento personalizado." },
  { step: "02", title: "Desintoxicación", desc: "Proceso médico supervisado 24/7 para una desintoxicación segura y confortable." },
  { step: "03", title: "Terapia intensiva", desc: "Sesiones individuales y grupales con psicólogos, psiquiatras y consejeros certificados." },
  { step: "04", title: "Reinserción", desc: "Preparación para el regreso a la vida cotidiana con herramientas de prevención de recaídas." },
];

const Tratamiento = () => {
  useScrollToTop();

  return (
    <main>
      <Seo
        title="Tratamientos para Adicciones y Salud Mental — Clínica SER"
        description="Programas integrales para alcoholismo, drogadicción, adicción a medicamentos, ludopatía, codependencia y doble diagnóstico. Equipo multidisciplinario en Puebla."
        path="/tratamiento"
      />
      <section className="trat-hero">
        <div className="trat-hero__overlay" />
        <div className="trat-hero__content" data-anim="fade-up">
          <span className="trat-hero__tag">NUESTROS TRATAMIENTOS</span>
          <h1 className="trat-hero__title">Tratamiento integral para<br />adicciones y salud mental</h1>
          <p className="trat-hero__sub">Más de 58 años de experiencia respaldados por un equipo multidisciplinario de profesionales certificados.</p>
          <a href="https://wa.me/5212213490308" target="_blank" rel="noopener noreferrer" className="trat-hero__btn">AGENDA TU EVALUACIÓN</a>
        </div>
      </section>

      <section className="trat-process">
        <div className="trat-process__container">
          <h2 className="trat-process__title" data-anim="fade-up">Nuestro proceso de tratamiento</h2>
          <div className="trat-process__grid">
            {PROCESS.map((p, i) => (
              <div key={i} className="trat-process__card" data-anim="fade-up" data-anim-delay={`${i * 0.12}s`}>
                <span className="trat-process__step">{p.step}</span>
                <h3 className="trat-process__card-title">{p.title}</h3>
                <p className="trat-process__card-text">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="trat-grid-section">
        <div className="trat-grid__container">
          <span className="trat-grid__tag" data-anim="fade-up">ESPECIALIDADES</span>
          <h2 className="trat-grid__title" data-anim="fade-up">¿Qué tratamos?</h2>
          <div className="trat-grid">
            {TREATMENTS.map((t, i) => (
              <div key={i} className="trat-card" data-anim="fade-up" data-anim-delay={`${i * 0.1}s`}>
                <img src={t.img} alt={t.title} loading="lazy" decoding="async" className="trat-card__img" />
                <div className="trat-card__body">
                  <h3 className="trat-card__title">{t.title}</h3>
                  <p className="trat-card__text">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="trat-cta">
        <div className="trat-cta__inner" data-anim="fade-up">
          <h2 className="trat-cta__title">¿Necesitas ayuda?</h2>
          <p className="trat-cta__text">Nuestro equipo está disponible las 24 horas para orientarte.</p>
          <div className="trat-cta__btns">
            <a href="tel:+522224994306" className="trat-cta__btn">📞 Llamar ahora</a>
            <a href="https://wa.me/5212213490308" target="_blank" rel="noopener noreferrer" className="trat-cta__btn trat-cta__btn--wa">💬 WhatsApp</a>
          </div>
        </div>
      </section>

      <style>{`
        .trat-hero { position: relative; min-height: 60vh; display: flex; align-items: center; background: url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80') center/cover; }
        .trat-hero__overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,46,.88), rgba(26,26,46,.65)); }
        .trat-hero__content { position: relative; z-index: 2; max-width: 700px; padding: 120px clamp(24px,5vw,80px) 80px; }
        .trat-hero__tag { font-family: 'Inter', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: .15em; color: #C8E64A; display: block; margin-bottom: 16px; }
        .trat-hero__title { font-family: 'Inter', sans-serif; font-size: clamp(28px,4vw,48px); font-weight: 700; color: white; line-height: 1.2; margin: 0 0 16px; }
        .trat-hero__sub { font-family: 'Inter', sans-serif; font-size: 16px; color: rgba(255,255,255,.7); line-height: 1.7; margin: 0 0 32px; }
        .trat-hero__btn { display: inline-flex; background: #C8E64A; color: #1A1A2E; padding: 14px 32px; border-radius: 60px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; text-decoration: none; transition: background .2s; }
        .trat-hero__btn:hover { background: #8AB83A; color: white; }

        .trat-process { background: #FFFFFF; padding: clamp(64px,8vw,120px) 24px; }
        .trat-process__container { max-width: 1200px; margin: 0 auto; }
        .trat-process__title { font-family: 'Inter', sans-serif; font-size: clamp(26px,3.5vw,40px); font-weight: 700; color: #1A1A2E; text-align: center; margin: 0 0 48px; }
        .trat-process__grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }
        .trat-process__card { background: rgba(255,255,255,0.10); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 32px 24px; text-align: center; }
        .trat-process__step { display: inline-block; font-family: 'Inter', sans-serif; font-size: 28px; font-weight: 800; color: #C8E64A; margin-bottom: 12px; }
        .trat-process__card-title { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 700; color: #1A1A2E; margin: 0 0 8px; }
        .trat-process__card-text { font-family: 'Inter', sans-serif; font-size: 14px; color: #666; line-height: 1.7; margin: 0; }

        .trat-grid-section { background: #F5F5F5; padding: clamp(64px,8vw,120px) 24px; }
        .trat-grid__container { max-width: 1200px; margin: 0 auto; }
        .trat-grid__tag { display: block; font-family: 'Inter', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: .12em; color: #8AB83A; margin-bottom: 12px; text-align: center; }
        .trat-grid__title { font-family: 'Inter', sans-serif; font-size: clamp(26px,3.5vw,40px); font-weight: 700; color: #1A1A2E; text-align: center; margin: 0 0 48px; }
        .trat-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .trat-card { background: rgba(255,255,255,0.10); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; overflow: hidden; transition: transform .3s, box-shadow .3s; }
        .trat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,.06); }
        .trat-card__img { width: 100%; height: 200px; object-fit: cover; display: block; }
        .trat-card__body { padding: 24px; }
        .trat-card__title { font-family: 'Inter', sans-serif; font-size: 18px; font-weight: 700; color: #1A1A2E; margin: 0 0 8px; }
        .trat-card__text { font-family: 'Inter', sans-serif; font-size: 14px; color: #666; line-height: 1.7; margin: 0; }

        .trat-cta { background: #1B2A4A; padding: clamp(64px,8vw,100px) 24px; text-align: center; }
        .trat-cta__inner { max-width: 600px; margin: 0 auto; }
        .trat-cta__title { font-family: 'Inter', sans-serif; font-size: clamp(28px,4vw,44px); font-weight: 700; color: white; margin: 0 0 16px; }
        .trat-cta__text { font-family: 'Inter', sans-serif; font-size: 16px; color: rgba(255,255,255,.6); margin: 0 0 32px; }
        .trat-cta__btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .trat-cta__btn { display: inline-flex; align-items: center; gap: 8px; background: #C8E64A; color: #1A1A2E; padding: 14px 32px; border-radius: 60px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; text-decoration: none; transition: background .2s; }
        .trat-cta__btn:hover { background: #8AB83A; color: white; }
        .trat-cta__btn--wa { background: #25D366; color: white; }
        .trat-cta__btn--wa:hover { background: #1DB954; }

        @media (max-width: 900px) {
          .trat-process__grid { grid-template-columns: repeat(2,1fr); }
          .trat-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .trat-process__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
};

export default Tratamiento;
