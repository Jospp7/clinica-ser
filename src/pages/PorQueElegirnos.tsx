import Seo from "@/components/Seo";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Star } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

const REASONS = [
  { icon: "🏥", title: `${SITE.aniosExperiencia} años de experiencia`, desc: `Desde 1967, hemos tratado exitosamente a miles de pacientes y familias en Puebla y toda la República Mexicana.` },
  { icon: "👨‍⚕️", title: "Equipo multidisciplinario", desc: "Psiquiatras, psicólogos, médicos internistas, nutriólogos y consejeros certificados trabajando en conjunto." },
  { icon: "📋", title: "Certificación CENADIC", desc: "Centro certificado por el Centro Nacional para la Prevención y el Control de las Adicciones." },
  // TODO: confirmar vigencia de certificación con cliente (CENADIC se disolvió ~2011, hoy es CONADIC)
  { icon: "🏠", title: "Instalaciones de primer nivel", desc: "Habitaciones privadas, áreas verdes, gimnasio y espacios terapéuticos en el corazón de Puebla." },
  { icon: "🕐", title: "Atención 24/7", desc: "Disponibles las 24 horas, los 365 días del año. Ingreso inmediato cuando lo necesites." },
  { icon: "❤️", title: "Trato humano y personalizado", desc: "Cada paciente recibe un plan de tratamiento único, diseñado para su situación específica." },
  { icon: "👥", title: "Programa familiar", desc: "Incluimos a la familia en el proceso de recuperación con terapias y grupos de apoyo especializados." },
  { icon: "🔄", title: "Seguimiento post-tratamiento", desc: "Acompañamos a nuestros pacientes después del alta para prevenir recaídas y consolidar la recuperación." },
];

const STATS = [
  { num: `${SITE.aniosExperiencia}+`, label: "Años de experiencia" },
  // TODO: falta dato del cliente (pacientes tratados)
  { num: "5,000+", label: "Pacientes tratados" },
  // TODO: falta dato del cliente (satisfacción familiar)
  { num: "95%", label: "Satisfacción familiar" },
  { num: "24/7", label: "Disponibilidad" },
];

const PorQueElegirnos = () => {
  useScrollToTop();

  return (
    <main>
      <Seo
        title="Por Qué Elegirnos — Clínica SER Puebla"
        description={`${SITE.aniosExperiencia} años tratando adicciones, equipo multidisciplinario, instalaciones de primer nivel y atención humana 24/7. Descubre por qué las familias eligen Clínica SER.`}
        path="/por-que-elegirnos"
      />
      <section className="pqe-hero">
        <div className="pqe-hero__overlay" />
        <div className="pqe-hero__content" data-anim="fade-up">
          <span className="pqe-hero__tag">POR QUÉ ELEGIRNOS</span>
          <h1 className="pqe-hero__title">La clínica de adicciones<br />más confiable de Puebla</h1>
          <p className="pqe-hero__sub">{SITE.aniosExperiencia} años transformando vidas con profesionalismo, calidez y resultados comprobados.</p>
        </div>
      </section>

      <section className="pqe-stats">
        <div className="pqe-stats__grid">
          {STATS.map((s, i) => (
            <div key={i} className="pqe-stat" data-anim="fade-up" data-anim-delay={`${i * 0.1}s`}>
              <span className="pqe-stat__num">{s.num}</span>
              <span className="pqe-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="pqe-reasons">
        <div className="pqe-reasons__container">
          <h2 className="pqe-reasons__title" data-anim="fade-up">¿Por qué confiar en Clínica SER?</h2>
          <div className="pqe-reasons__grid">
            {REASONS.map((r, i) => (
              <div key={i} className="pqe-reason" data-anim="fade-up" data-anim-delay={`${(i % 4) * 0.1}s`}>
                <span className="pqe-reason__icon">{r.icon}</span>
                <h3 className="pqe-reason__title">{r.title}</h3>
                <p className="pqe-reason__text">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pqe-testimonial">
        <div className="pqe-testimonial__inner" data-anim="fade-up">
          <span className="pqe-testimonial__quote">❝</span>
          <p className="pqe-testimonial__text">"Llegamos desesperados buscando ayuda y encontramos un equipo que nos trató con humanidad. Hoy mi hijo tiene 3 años de sobriedad."</p>
          <div className="pqe-testimonial__author">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" alt="María G." loading="lazy" decoding="async" className="pqe-testimonial__avatar" />
            <div>
              <span className="pqe-testimonial__name">María G.</span>
              <div className="pqe-testimonial__stars">{[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#D4A843" color="#D4A843" />)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="pqe-cta">
        <div className="pqe-cta__inner" data-anim="fade-up">
          <h2 className="pqe-cta__title">Da el primer paso hoy</h2>
          <p className="pqe-cta__text">Tu llamada es confidencial. Estamos aquí para ayudarte.</p>
          <div className="pqe-cta__btns">
            <a href={`tel:${SITE.telefonoTel[0]}`} className="pqe-cta__btn">📞 Llamar ahora</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="pqe-cta__btn pqe-cta__btn--wa">💬 WhatsApp</a>
          </div>
        </div>
      </section>

      <style>{`
        .pqe-hero { position: relative; min-height: 50vh; display: flex; align-items: center; background: url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80') center/cover; }
        .pqe-hero__overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,46,.88), rgba(26,26,46,.6)); }
        .pqe-hero__content { position: relative; z-index: 2; max-width: 700px; padding: 120px clamp(24px,5vw,80px) 80px; }
        .pqe-hero__tag { font-family: 'Inter', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: .15em; color: #C8E64A; display: block; margin-bottom: 16px; }
        .pqe-hero__title { font-family: 'Inter', sans-serif; font-size: clamp(28px,4vw,48px); font-weight: 700; color: white; line-height: 1.2; margin: 0 0 16px; }
        .pqe-hero__sub { font-family: 'Inter', sans-serif; font-size: 16px; color: rgba(255,255,255,.7); line-height: 1.7; margin: 0; }

        .pqe-stats { background: #C8E64A; padding: 48px 24px; }
        .pqe-stats__grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; max-width: 1200px; margin: 0 auto; text-align: center; }
        .pqe-stat__num { display: block; font-family: 'Inter', sans-serif; font-size: clamp(32px,4vw,48px); font-weight: 800; color: #1A1A2E; }
        .pqe-stat__label { font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(26,26,46,.7); font-weight: 500; }

        .pqe-reasons { background: #FFFFFF; padding: clamp(64px,8vw,120px) 24px; }
        .pqe-reasons__container { max-width: 1200px; margin: 0 auto; }
        .pqe-reasons__title { font-family: 'Inter', sans-serif; font-size: clamp(26px,3.5vw,40px); font-weight: 700; color: #1A1A2E; text-align: center; margin: 0 0 48px; }
        .pqe-reasons__grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }
        .pqe-reason { background: rgba(255,255,255,0.10); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 32px 24px; text-align: center; transition: transform .3s; }
        .pqe-reason:hover { transform: translateY(-4px); }
        .pqe-reason__icon { font-size: 36px; display: block; margin-bottom: 16px; }
        .pqe-reason__title { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 700; color: #1A1A2E; margin: 0 0 8px; }
        .pqe-reason__text { font-family: 'Inter', sans-serif; font-size: 14px; color: #666; line-height: 1.7; margin: 0; }

        .pqe-testimonial { background: #F5F5F5; padding: clamp(64px,8vw,100px) 24px; }
        .pqe-testimonial__inner { max-width: 700px; margin: 0 auto; text-align: center; }
        .pqe-testimonial__quote { font-size: 48px; color: #D4A843; line-height: 1; display: block; margin-bottom: 16px; }
        .pqe-testimonial__text { font-family: 'Inter', sans-serif; font-size: clamp(16px,2vw,20px); color: #333; line-height: 1.7; font-style: italic; margin: 0 0 24px; }
        .pqe-testimonial__author { display: flex; align-items: center; gap: 12px; justify-content: center; }
        .pqe-testimonial__avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
        .pqe-testimonial__name { display: block; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; color: #1A1A2E; }
        .pqe-testimonial__stars { display: flex; gap: 2px; }

        .pqe-cta { background: #1B2A4A; padding: clamp(64px,8vw,100px) 24px; text-align: center; }
        .pqe-cta__inner { max-width: 600px; margin: 0 auto; }
        .pqe-cta__title { font-family: 'Inter', sans-serif; font-size: clamp(28px,4vw,44px); font-weight: 700; color: white; margin: 0 0 16px; }
        .pqe-cta__text { font-family: 'Inter', sans-serif; font-size: 16px; color: rgba(255,255,255,.6); margin: 0 0 32px; }
        .pqe-cta__btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .pqe-cta__btn { display: inline-flex; align-items: center; gap: 8px; background: #C8E64A; color: #1A1A2E; padding: 14px 32px; border-radius: 60px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; text-decoration: none; transition: background .2s; }
        .pqe-cta__btn:hover { background: #8AB83A; color: white; }
        .pqe-cta__btn--wa { background: #25D366; color: white; }
        .pqe-cta__btn--wa:hover { background: #1DB954; }

        @media (max-width: 900px) {
          .pqe-stats__grid { grid-template-columns: repeat(2,1fr); }
          .pqe-reasons__grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 600px) {
          .pqe-reasons__grid { grid-template-columns: 1fr; }
          .pqe-stats__grid { grid-template-columns: repeat(2,1fr); }
        }
      `}</style>
    </main>
  );
};

export default PorQueElegirnos;
