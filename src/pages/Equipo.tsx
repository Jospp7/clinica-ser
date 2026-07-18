import Seo from "@/components/Seo";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { SITE } from "@/lib/site";

const EQUIPO_MEDICO = [
  "4 Especialistas en Psiquiatría",
  "4 Especialistas en Adicciones",
  "2 Médicos Generales",
  "5 Maestros en Psicología",
  "1 Instructor de Yoga",
  "1 Profesor de Educación Física",
  "1 Licenciado en Artes Plásticas",
  "1 Licenciada en Enfermería",
  "8 Enfermeras Generales (2 Diplomadas en Psiquiatría)",
  "2 Adictos en Recuperación (Programa de los 12 Pasos)",
];

const SERVICIOS_GENERALES = [
  "2 Licenciados en Administración de Empresas",
  "1 Contador Público",
  "1 Recepcionista",
  "5 Ayudantes de Cocina",
  "2 Guardias de Seguridad",
  "5 Intendentes",
  "2 Lavanderas",
  "1 Mensajero",
];

const Equipo = () => {
  useScrollToTop();

  return (
    <main>
      <Seo
        title="Equipo profesional — Clínica SER Puebla"
        description="Conoce al equipo profesional de Clínica SER en Puebla: especialistas en psiquiatría, adicciones, medicina general, psicología y enfermería."
        path="/equipo"
      />

      <section className="eq-pg__hero">
        <div className="eq-pg__hero-overlay" />
        <div className="eq-pg__hero-content" data-anim="fade-up">
          <span className="eq-pg__tag">NUESTRO EQUIPO</span>
          <h1 className="eq-pg__hero-title">Conoce a nuestro equipo profesional en el tratamiento de adicciones</h1>
        </div>
      </section>

      <section className="eq-pg__intro-section">
        <div className="eq-pg__intro-container" data-anim="fade-up">
          <p className="eq-pg__intro">
            SER® es una de las mejores clínicas de rehabilitación en Puebla. Ofrecemos un equipo profesional y humano, altamente especializado en las técnicas más actualizadas de abordaje terapéutico, terapia cognitivo conductual y terapia racional emotiva. Nuestros especialistas dirigen entrevistas motivacionales para potenciar los deseos de cambio del familiar adicto. En nuestro equipo encontrarás especialistas en psiquiatría, médicos y enfermeras disponibles las 24 horas del día. Mantenemos estrictas políticas de confidencialidad, un trato empático y altos estándares de calidad.
          </p>
        </div>
      </section>

      <section className="eq-pg__lists">
        <div className="eq-pg__lists-container">
          <div className="eq-pg__list-card" data-anim="fade-up">
            <h2 className="eq-pg__list-title">Equipo Médico y Paramédico</h2>
            <ul className="eq-pg__list">
              {EQUIPO_MEDICO.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="eq-pg__list-card" data-anim="fade-up">
            <h2 className="eq-pg__list-title">Servicios Generales</h2>
            <ul className="eq-pg__list">
              {SERVICIOS_GENERALES.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="eq-pg__profile-section">
        <div className="eq-pg__profile-container" data-anim="fade-up">
          {/* TODO: imagen del cliente — foto del Dr. Jorge Alfredo Gayosso del Valle */}
          <div className="eq-pg__profile-header">
            <h2 className="eq-pg__profile-name">Doctor Jorge Alfredo Gayosso del Valle</h2>
            <p className="eq-pg__profile-role">Especialista en Psiquiatría</p>
          </div>

          <div className="eq-pg__profile-block">
            <h3 className="eq-pg__profile-subtitle">Formación</h3>
            <ul className="eq-pg__profile-list">
              <li>Doctor con especialidad en Psiquiatría.</li>
              <li>Egresado de la Universidad Autónoma de Guadalajara. Cédula de Especialista: 3181351</li>
              <li>Licenciatura en Medicina en la Benemérita Universidad Autónoma de Puebla. Cédula Profesional: 1659122</li>
              <li>Diplomado en Adicción a Sustancias en el Centro de Estudios Superiores Monte Fénix.</li>
            </ul>
          </div>

          <div className="eq-pg__profile-block">
            <h3 className="eq-pg__profile-subtitle">Cursos y congresos internacionales</h3>
            <ul className="eq-pg__profile-list">
              <li>RWJ Pharmaceutical Research Institute Protocol: TOP-INT-50, Investigator's Meeting. Miami Beach, Florida, U.S.A.</li>
              <li>Latin American Neuroscience Summit. Costa do Sauipe, Bahía, Brasil.</li>
              <li>XIII WPA World Congress of Psychiatry. El Cairo, Egipto.</li>
              <li>XXIV Congreso Asociación Psiquiátrica de América Latina (APAL). Punta Cana, Rep. Dom.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* TODO: 15 perfiles adicionales del equipo (fotos + bios) — pendiente segunda tanda. */}

      <section className="eq-pg__cta">
        <div className="eq-pg__cta-inner" data-anim="fade-up">
          <h2 className="eq-pg__cta-title">¿Necesitas hablar con un especialista?</h2>
          <p className="eq-pg__cta-text">Nuestro equipo está disponible las 24 horas para resolver tus dudas.</p>
          <div className="eq-pg__cta-actions">
            <a href={`tel:${SITE.telefonoTel[0]}`} className="eq-pg__cta-btn">📞 Llamar ahora</a>
            <a href={`mailto:${SITE.email}`} className="eq-pg__cta-btn eq-pg__cta-btn--ghost">✉ {SITE.email}</a>
          </div>
        </div>
      </section>

      <style>{`
        .eq-pg__hero { position: relative; min-height: 50vh; display: flex; align-items: center; background: linear-gradient(135deg, #1A1A2E, #1B2A4A); }
        .eq-pg__hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,46,.6), rgba(26,26,46,.3)); }
        .eq-pg__hero-content { position: relative; z-index: 2; max-width: 900px; padding: 120px clamp(24px,5vw,80px) 80px; }
        .eq-pg__tag { font-family: 'Inter', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: .15em; color: #C8E64A; display: block; margin-bottom: 16px; }
        .eq-pg__hero-title { font-family: 'Inter', sans-serif; font-size: clamp(28px,4vw,48px); font-weight: 700; color: white; line-height: 1.2; margin: 0; }

        .eq-pg__intro-section { background: #FFFFFF; padding: clamp(48px,6vw,80px) 24px; }
        .eq-pg__intro-container { max-width: 900px; margin: 0 auto; }
        .eq-pg__intro { font-family: 'Inter', sans-serif; font-size: clamp(16px,1.4vw,18px); color: #333; line-height: 1.8; margin: 0; }

        .eq-pg__lists { background: #F5F5F5; padding: clamp(64px,8vw,100px) 24px; }
        .eq-pg__lists-container { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .eq-pg__list-card { background: #FFFFFF; border-radius: 20px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,.05); }
        .eq-pg__list-title { font-family: 'Inter', sans-serif; font-size: clamp(20px,2vw,26px); font-weight: 700; color: #1A1A2E; margin: 0 0 24px; }
        .eq-pg__list { list-style: none; margin: 0; padding: 0; }
        .eq-pg__list li { font-family: 'Inter', sans-serif; font-size: 15px; color: #444; line-height: 1.7; padding: 10px 0 10px 24px; position: relative; border-bottom: 1px solid #EEE; }
        .eq-pg__list li:last-child { border-bottom: none; }
        .eq-pg__list li::before { content: '✓'; position: absolute; left: 0; top: 10px; color: #C8E64A; font-weight: 700; }

        .eq-pg__profile-section { background: #FFFFFF; padding: clamp(64px,8vw,100px) 24px; }
        .eq-pg__profile-container { max-width: 900px; margin: 0 auto; background: #F9FAFB; border-radius: 24px; padding: clamp(32px,4vw,56px); border: 1px solid #E5E7EB; }
        .eq-pg__profile-header { margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid #C8E64A; }
        .eq-pg__profile-name { font-family: 'Inter', sans-serif; font-size: clamp(22px,2.5vw,32px); font-weight: 700; color: #1A1A2E; margin: 0 0 6px; }
        .eq-pg__profile-role { font-family: 'Inter', sans-serif; font-size: 15px; color: #666; margin: 0; }
        .eq-pg__profile-block { margin-top: 28px; }
        .eq-pg__profile-subtitle { font-family: 'Inter', sans-serif; font-size: 14px; text-transform: uppercase; letter-spacing: .1em; color: #1B2A4A; margin: 0 0 12px; font-weight: 700; }
        .eq-pg__profile-list { list-style: none; margin: 0; padding: 0; }
        .eq-pg__profile-list li { font-family: 'Inter', sans-serif; font-size: 15px; color: #333; line-height: 1.7; padding: 8px 0 8px 20px; position: relative; }
        .eq-pg__profile-list li::before { content: '•'; position: absolute; left: 0; color: #C8E64A; font-weight: 700; }

        .eq-pg__cta { background: #1B2A4A; padding: clamp(64px,8vw,100px) 24px; text-align: center; }
        .eq-pg__cta-inner { max-width: 700px; margin: 0 auto; }
        .eq-pg__cta-title { font-family: 'Inter', sans-serif; font-size: clamp(26px,3.5vw,40px); font-weight: 700; color: white; margin: 0 0 16px; }
        .eq-pg__cta-text { font-family: 'Inter', sans-serif; font-size: 16px; color: rgba(255,255,255,.65); margin: 0 0 32px; }
        .eq-pg__cta-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .eq-pg__cta-btn { display: inline-flex; align-items: center; gap: 8px; background: #C8E64A; color: #1A1A2E; padding: 14px 28px; border-radius: 60px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; text-decoration: none; transition: background .2s; }
        .eq-pg__cta-btn:hover { background: #8AB83A; color: white; }
        .eq-pg__cta-btn--ghost { background: transparent; color: white; border: 1px solid rgba(255,255,255,.3); }
        .eq-pg__cta-btn--ghost:hover { background: rgba(255,255,255,.08); color: white; }

        @media (max-width: 768px) {
          .eq-pg__lists-container { grid-template-columns: 1fr; }
          .eq-pg__list-card { padding: 28px; }
        }
      `}</style>
    </main>
  );
};

export default Equipo;