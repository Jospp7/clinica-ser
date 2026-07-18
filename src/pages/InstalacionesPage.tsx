import Seo from "@/components/Seo";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { SITE } from "@/lib/site";

// TODO: imagen del cliente — reemplazar cada amenidad con foto real (16 amenidades)
const AMENIDADES = [
  "Terraza",
  "Áreas de descanso",
  "Cancha de Básquetbol",
  "Cancha de Vóleibol",
  "Habitaciones separadas",
  "Área de desintoxicación",
  "Salón de terapia familiar",
  "Salón para sesiones",
  "Áreas para sesión individual",
  "Salón de informes",
  "Consultorios médicos",
  "Central de enfermeras",
  "Taller de Arte",
  "Gimnasio",
  "Salas de TV",
  "Comedor amplio",
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
          <h1 className="inst-pg__hero-title">Conoce nuestras modernas instalaciones</h1>
          <p className="inst-pg__hero-sub">Instalaciones de primer nivel en el corazón de Puebla.</p>
        </div>
      </section>

      <section className="inst-pg__features">
        <div className="inst-pg__features-container">
          <h2 className="inst-pg__features-title" data-anim="fade-up">Amenidades</h2>
          <div className="inst-pg__features-grid">
            {AMENIDADES.map((nombre, i) => (
              <div key={i} className="inst-pg__feature" data-anim="fade-up" data-anim-delay={`${i * 0.1}s`}>
                {/* TODO: imagen del cliente */}
                <h3 className="inst-pg__feature-title">{nombre}</h3>
              </div>
            ))}
          </div>
          <p className="inst-pg__features-title" data-anim="fade-up" style={{ marginTop: 48, fontSize: 'clamp(20px,2.5vw,28px)' }}>Somos expertos recuperando vidas.</p>
        </div>
      </section>

      <section className="inst-pg__cta">
        <div className="inst-pg__cta-inner" data-anim="fade-up">
          <h2 className="inst-pg__cta-title">Agenda una visita</h2>
          <p className="inst-pg__cta-text">Conoce nuestras instalaciones y resuelve todas tus dudas con nuestro equipo.</p>
          <a href={`tel:${SITE.telefonoTel[0]}`} className="inst-pg__cta-btn">📞 Llamar para agendar</a>
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
