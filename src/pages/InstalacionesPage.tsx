import Seo from "@/components/Seo";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80", alt: "Fachada principal de Clínica SER Puebla", span: "inst-pg__span-2" },
  { src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80", alt: "Jardines y áreas verdes de la clínica", span: "" },
  { src: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80", alt: "Habitación privada de tratamiento", span: "" },
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80", alt: "Área de terapia y rehabilitación", span: "" },
  { src: "https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=600&q=80", alt: "Consultorio médico equipado", span: "" },
  { src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80", alt: "Área de evaluación clínica", span: "inst-pg__span-2" },
];

const FEATURES = [
  { icon: "🏥", title: "Habitaciones privadas", desc: "Espacios cómodos y seguros diseñados para la recuperación integral." },
  { icon: "🌿", title: "Áreas verdes", desc: "Jardines terapéuticos que promueven la relajación y la meditación." },
  { icon: "🍽️", title: "Nutrición personalizada", desc: "Comedor con menús diseñados por nutriólogos especializados." },
  { icon: "🏋️", title: "Gimnasio y deporte", desc: "Instalaciones deportivas para la recuperación física y mental." },
  { icon: "🧘", title: "Sala de meditación", desc: "Espacios de paz para la práctica de mindfulness y yoga." },
  { icon: "👨‍⚕️", title: "Consultorios médicos", desc: "Equipados con tecnología de punta para evaluaciones completas." },
];

const InstalacionesPage = () => {
  useScrollToTop();

  return (
    <main>
      <Seo
        title="Instalaciones — Clínica SER Puebla"
        description="Habitaciones privadas, áreas verdes, gimnasio, sala de meditación y consultorios equipados. Instalaciones diseñadas para la recuperación integral en Puebla."
        path="/instalaciones"
      />
      <section className="inst-pg__hero">
        <div className="inst-pg__hero-overlay" />
        <div className="inst-pg__hero-content" data-anim="fade-up">
          <span className="inst-pg__tag">NUESTRAS INSTALACIONES</span>
          <h1 className="inst-pg__hero-title">Un espacio diseñado<br />para tu recuperación</h1>
          <p className="inst-pg__hero-sub">Instalaciones de primer nivel en el corazón de Puebla, certificadas por CENADIC.</p>
        </div>
      </section>

      <section className="inst-pg__gallery-section">
        <div className="inst-pg__gallery" data-anim="fade-up">
          {GALLERY.map((img, i) => (
            <div key={i} className={`inst-pg__cell ${img.span}`}>
              <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="inst-pg__photo" />
            </div>
          ))}
        </div>
      </section>

      <section className="inst-pg__features">
        <div className="inst-pg__features-container">
          <h2 className="inst-pg__features-title" data-anim="fade-up">¿Qué ofrecemos?</h2>
          <div className="inst-pg__features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="inst-pg__feature" data-anim="fade-up" data-anim-delay={`${i * 0.1}s`}>
                <span className="inst-pg__feature-icon">{f.icon}</span>
                <h3 className="inst-pg__feature-title">{f.title}</h3>
                <p className="inst-pg__feature-text">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inst-pg__cta">
        <div className="inst-pg__cta-inner" data-anim="fade-up">
          <h2 className="inst-pg__cta-title">Agenda una visita</h2>
          <p className="inst-pg__cta-text">Conoce nuestras instalaciones y resuelve todas tus dudas con nuestro equipo.</p>
          <a href="tel:+522224994306" className="inst-pg__cta-btn">📞 Llamar para agendar</a>
        </div>
      </section>

      <style>{`
        .inst-pg__hero { position: relative; min-height: 50vh; display: flex; align-items: center; background: url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80') center/cover; }
        .inst-pg__hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,46,.85), rgba(26,26,46,.6)); }
        .inst-pg__hero-content { position: relative; z-index: 2; max-width: 700px; padding: 120px clamp(24px,5vw,80px) 80px; }
        .inst-pg__tag { font-family: 'Inter', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: .15em; color: #C8E64A; display: block; margin-bottom: 16px; }
        .inst-pg__hero-title { font-family: 'Inter', sans-serif; font-size: clamp(28px,4vw,48px); font-weight: 700; color: white; line-height: 1.2; margin: 0 0 16px; }
        .inst-pg__hero-sub { font-family: 'Inter', sans-serif; font-size: 16px; color: rgba(255,255,255,.7); line-height: 1.7; margin: 0; }

        .inst-pg__gallery-section { background: #FFFFFF; padding: clamp(64px,8vw,120px) 24px; }
        .inst-pg__gallery { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; max-width: 1200px; margin: 0 auto; }
        .inst-pg__span-2 { grid-column: span 2; }
        .inst-pg__cell { border-radius: 20px; overflow: hidden; }
        .inst-pg__photo { width: 100%; height: 280px; object-fit: cover; display: block; transition: transform .4s; }
        .inst-pg__cell:hover .inst-pg__photo { transform: scale(1.04); }

        .inst-pg__features { background: #F5F5F5; padding: clamp(64px,8vw,120px) 24px; }
        .inst-pg__features-container { max-width: 1200px; margin: 0 auto; }
        .inst-pg__features-title { font-family: 'Inter', sans-serif; font-size: clamp(26px,3.5vw,40px); font-weight: 700; color: #1A1A2E; text-align: center; margin: 0 0 48px; }
        .inst-pg__features-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .inst-pg__feature { background: rgba(255,255,255,0.10); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 32px 24px; text-align: center; transition: transform .3s; }
        .inst-pg__feature:hover { transform: translateY(-4px); }
        .inst-pg__feature-icon { font-size: 36px; display: block; margin-bottom: 16px; }
        .inst-pg__feature-title { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 700; color: #1A1A2E; margin: 0 0 8px; }
        .inst-pg__feature-text { font-family: 'Inter', sans-serif; font-size: 14px; color: #666; line-height: 1.7; margin: 0; }

        .inst-pg__cta { background: #1B2A4A; padding: clamp(64px,8vw,100px) 24px; text-align: center; }
        .inst-pg__cta-inner { max-width: 600px; margin: 0 auto; }
        .inst-pg__cta-title { font-family: 'Inter', sans-serif; font-size: clamp(28px,4vw,44px); font-weight: 700; color: white; margin: 0 0 16px; }
        .inst-pg__cta-text { font-family: 'Inter', sans-serif; font-size: 16px; color: rgba(255,255,255,.6); margin: 0 0 32px; }
        .inst-pg__cta-btn { display: inline-flex; align-items: center; gap: 8px; background: #C8E64A; color: #1A1A2E; padding: 14px 32px; border-radius: 60px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; text-decoration: none; transition: background .2s; }
        .inst-pg__cta-btn:hover { background: #8AB83A; color: white; }

        @media (max-width: 768px) {
          .inst-pg__gallery { grid-template-columns: 1fr; }
          .inst-pg__span-2 { grid-column: span 1; }
          .inst-pg__features-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
};

export default InstalacionesPage;
