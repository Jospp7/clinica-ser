import { SITE } from "@/lib/site";
import {
  Phone, Sun, Armchair, Dribbble, Volleyball, BedDouble, HeartPulse, Users,
  MessagesSquare, User, ClipboardList, Stethoscope, Cross, Palette, Dumbbell,
  Tv, UtensilsCrossed,
} from "lucide-react";
import InstalacionesCarrusel from "@/components/InstalacionesCarrusel";

// TODO: imagen del cliente — reemplazar cada amenidad con foto real (16 amenidades)
const AMENIDADES = [
  { nombre: "Terraza", Icon: Sun },
  { nombre: "Áreas de descanso", Icon: Armchair },
  { nombre: "Cancha de Básquetbol", Icon: Dribbble },
  { nombre: "Cancha de Vóleibol", Icon: Volleyball },
  { nombre: "Habitaciones separadas", Icon: BedDouble },
  { nombre: "Área de desintoxicación", Icon: HeartPulse },
  { nombre: "Salón de terapia familiar", Icon: Users },
  { nombre: "Salón para sesiones", Icon: MessagesSquare },
  { nombre: "Áreas para sesión individual", Icon: User },
  { nombre: "Salón de informes", Icon: ClipboardList },
  { nombre: "Consultorios médicos", Icon: Stethoscope },
  { nombre: "Central de enfermeras", Icon: Cross },
  { nombre: "Taller de Arte", Icon: Palette },
  { nombre: "Gimnasio", Icon: Dumbbell },
  { nombre: "Salas de TV", Icon: Tv },
  { nombre: "Comedor amplio", Icon: UtensilsCrossed },
];

const SecInstalaciones = () => {

  return (
    <section id="instalaciones">
      <section className="inst-pg__hero">
        <div className="inst-pg__hero-overlay" />
        <div className="inst-pg__hero-content" data-anim="fade-up">
          <span className="inst-pg__tag">NUESTRAS INSTALACIONES</span>
          <h2 className="inst-pg__hero-title">Conoce nuestras modernas instalaciones</h2>
          <p className="inst-pg__hero-sub">Instalaciones de primer nivel en el corazón de Puebla.</p>
        </div>
      </section>

      <section className="inst-pg__features">
        <div className="inst-pg__features-container">
          <div className="inst-pg__intro" data-anim="fade-up">
            <p className="inst-pg__intro-text">
              El confort, seguridad y calidez se encuentran en cada espacio de nuestra clínica, ofreciendo a nuestros huéspedes zonas de recreo, esparcimiento, talleres y salones de terapia, habitaciones, comedores, áreas de consulta y mucho más, que fueron cuidadas hasta el máximo detalle para ofrecer el mejor espacio para su recuperación emocional.
            </p>
            <p className="inst-pg__intro-text">
              La seguridad de su ser querido es muy importante para nosotros, por ello contamos con instalaciones especiales únicas en México, traídas desde U.S.A., Brasil, España, Alemania e Italia, cumpliendo con estándares internacionales que nos hacen únicos.
            </p>
          </div>
          <div className="inst-pg__carrusel" data-anim="fade-up">
            <InstalacionesCarrusel />
          </div>

          <div className="inst-pg__amen" data-anim="fade-up">
            <div className="inst-pg__amen-head">
              <h3 className="inst-pg__amen-title">Amenidades</h3>
            </div>
            <ul className="inst-pg__amen-list">
              {AMENIDADES.map(({ nombre, Icon }) => (
                <li key={nombre} className="inst-pg__amen-item">
                  <Icon size={22} aria-hidden="true" />
                  <span>{nombre}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="inst-pg__cta">
        <div className="inst-pg__cta-inner" data-anim="fade-up">
          <h3 className="inst-pg__cta-title">Agenda una visita</h3>
          <p className="inst-pg__cta-text">Conoce nuestras instalaciones y resuelve todas tus dudas con nuestro equipo.</p>
          <a href={`tel:${SITE.telefonoTel[0]}`} className="inst-pg__cta-btn"><Phone size={18} aria-hidden="true" /> Llamar para agendar</a>
        </div>
      </section>

      <style>{`
        /* TODO: imagen del cliente para .inst-pg__hero (fondo neutro por defecto) */
        .inst-pg__hero { position: relative; min-height: 260px; display: flex; align-items: center; background: url('/images/instalaciones-fondo.jpg') center/cover; }
        .inst-pg__hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,46,.85), rgba(26,26,46,.6)); }
        .inst-pg__hero-content { position: relative; z-index: 2; max-width: 700px; padding: clamp(32px,4vw,48px) clamp(24px,5vw,80px); }
        @media (max-width: 768px) { .inst-pg__hero { min-height: 200px; } }
        .inst-pg__tag { font-family: 'Source Sans 3', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: .15em; color: #D9C756; display: block; margin-bottom: 16px; }
        .inst-pg__hero-title { font-family: 'Source Sans 3', sans-serif; font-size: clamp(28px,4vw,48px); font-weight: 700; color: white; line-height: 1.2; margin: 0 0 16px; }
        .inst-pg__hero-sub { font-family: 'Source Sans 3', sans-serif; font-size: 16px; color: rgba(255,255,255,.7); line-height: 1.7; margin: 0; }

        .inst-pg__gallery-section { background: #FFFFFF; padding: clamp(64px,8vw,120px) clamp(24px, 5vw, 80px); }
        .inst-pg__gallery { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; max-width: 1200px; margin: 0 auto; }
        .inst-pg__span-2 { grid-column: span 2; }
        .inst-pg__cell { border-radius: 20px; overflow: hidden; }
        .inst-pg__photo { width: 100%; height: 280px; object-fit: cover; display: block; transition: transform .4s; }
        .inst-pg__cell:hover .inst-pg__photo { transform: scale(1.04); }

        .inst-pg__features { background: #F5F5F5; padding: clamp(64px,8vw,120px) clamp(24px, 5vw, 80px); }
        .inst-pg__features-container { max-width: 1200px; margin: 0 auto; }
        .inst-pg__features-title { font-family: 'Source Sans 3', sans-serif; font-size: clamp(26px,3.5vw,40px); font-weight: 700; color: #003057; text-align: center; margin: 0 0 48px; }
        .inst-pg__intro { max-width: 860px; margin: 0 auto 48px; }
        .inst-pg__intro-text { font-family: 'Source Sans 3', sans-serif; font-size: 16px; color: #444; line-height: 1.8; margin: 0 0 20px; text-align: center; }
        .inst-pg__carrusel { width: 100vw; margin-left: calc(-50vw + 50%); margin-bottom: 56px; }
        .inst-pg__features-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
         .inst-pg__amen { display: grid; grid-template-columns: minmax(240px,1fr) 2fr; gap: clamp(32px,5vw,64px); align-items: start; }
         .inst-pg__amen-head { align-self: center; padding-inline: clamp(12px,2vw,32px); }
         .inst-pg__amen-title { font-family: 'Source Sans 3', sans-serif; font-size: clamp(32px,4.5vw,56px); font-weight: 700; color: var(--brand-navy); margin: 0 0 16px; line-height: 1.1; }
                 .inst-pg__amen-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 16px 32px; }
        .inst-pg__amen-item { display: inline-flex; align-items: center; gap: 12px; font-family: 'Source Sans 3', sans-serif; font-size: 16px; font-weight: 600; color: var(--brand-navy); }
        .inst-pg__amen-item svg { color: var(--brand-gold-dark); flex: 0 0 auto; }
        .inst-pg__feature { background: rgba(255,255,255,0.10); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 32px 24px; text-align: center; transition: transform .3s; }
        .inst-pg__feature:hover { transform: translateY(-4px); }
        .inst-pg__feature-icon { font-size: 36px; display: block; margin-bottom: 16px; }
        .inst-pg__feature-title { font-family: 'Source Sans 3', sans-serif; font-size: 16px; font-weight: 700; color: #003057; margin: 0 0 8px; }
        .inst-pg__feature-text { font-family: 'Source Sans 3', sans-serif; font-size: 14px; color: #666; line-height: 1.7; margin: 0; }

        .inst-pg__cta { background: #003057; padding: clamp(64px,8vw,100px) clamp(24px, 5vw, 80px); text-align: center; }
        .inst-pg__cta-inner { max-width: 600px; margin: 0 auto; }
        .inst-pg__cta-title { font-family: 'Source Sans 3', sans-serif; font-size: clamp(28px,4vw,44px); font-weight: 700; color: white; margin: 0 0 16px; }
        .inst-pg__cta-text { font-family: 'Source Sans 3', sans-serif; font-size: 16px; color: rgba(255,255,255,.6); margin: 0 0 32px; }
        .inst-pg__cta-btn { display: inline-flex; align-items: center; gap: 8px; background: #D9C756; color: #003057; padding: 14px 32px; border-radius: 60px; font-family: 'Source Sans 3', sans-serif; font-size: 13px; font-weight: 600; text-decoration: none; transition: background .2s; }
        .inst-pg__cta-btn:hover { background: #B8A63F; color: #003057; }

        @media (max-width: 768px) {
          .inst-pg__gallery { grid-template-columns: 1fr; }
          .inst-pg__span-2 { grid-column: span 1; }
          .inst-pg__features-grid { grid-template-columns: 1fr; }
          .inst-pg__amen { grid-template-columns: 1fr; }
          .inst-pg__amen-list { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default SecInstalaciones;
