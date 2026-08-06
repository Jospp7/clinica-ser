import Seo from "@/components/Seo";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { SITE, waLink } from "@/lib/site";
import { trackCTAClick } from "@/hooks/useTracking";
import { Phone, Mail, Check, MessageCircle } from "lucide-react";

interface Perfil {
  nombre: string;
  cargo: string;
  formacion: string[];
  especialidades?: string[];
  congresos?: string[];
  foto?: string;
}

const PERFILES: Perfil[] = [
  {
    nombre: "Doctor Jorge Alfredo Gayosso del Valle",
    cargo: "Especialista en Psiquiatría",
    formacion: [
      "Doctor con especialidad en Psiquiatría.",
      "Egresado de la Universidad Autónoma de Guadalajara. Cédula de Especialista: 3181351",
      "Licenciatura en Medicina en la Benemérita Universidad Autónoma de Puebla. Cédula Profesional: 1659122",
      "Diplomado en Adicción a Sustancias en el Centro de Estudios Superiores Monte Fénix.",
    ],
    congresos: [
      "RWJ Pharmaceutical Research Institute Protocol: TOP-INT-50, Investigator's Meeting. Miami Beach, Florida, U.S.A.",
      "Latin American Neuroscience Summit. Costa do Sauipe, Bahía, Brasil.",
      "XIII WPA World Congress of Psychiatry. El Cairo, Egipto.",
      "XXIV Congreso Asociación Psiquiátrica de América Latina (APAL). Punta Cana, Rep. Dom.",
    ],
  },
  {
    nombre: "Dra. Nadia Ivette Ibarias Cortés",
    cargo: "Licenciada Médico Cirujano General Especializada en Adicciones",
    formacion: [
      "Licenciada Médico Cirujano General, especializada en adicciones.",
      "Trabaja en Centros de Integración Juvenil.",
      "Cuenta con 20 años de experiencia.",
      "Cédula: 3309563.",
    ],
    congresos: [
      "Curso Tratamiento Especializado en Consumo de Sustancias, CONADIC.",
      "Programa Integral de Capacitación en Calidad de la Atención de los Establecimientos Residenciales Especializados en Adicciones.",
      "Diplomado en Prevención y Manejo de las Adicciones.",
      "Diplomado en Psiquiatría General y sus Aplicaciones Prácticas en el Contexto de Urgencias.",
      "Jornadas de Psiquiatría y Neurociencias, CONAMEGE.",
    ],
  },
  {
    nombre: "Mto. Ángel David Herrera Pérez",
    cargo: "Especializado en psicoterapia cognitivo conductual, terapeuta en clínica de adicciones",
    formacion: [
      "Licenciado en Psicología.",
      "Maestrante en Psicoterapia Cognitivo Conductual.",
      "Cuenta con 9 años de experiencia.",
      "Cédula: 8680606.",
    ],
    especialidades: [
      "Maestrante en Psicoterapia Cognitivo Conductual en Clínica SER.",
    ],
    congresos: [
      "Curso en Primeros Auxilios Psicológicos.",
      "Centro de Integración Juvenil Online.",
      "Diplomado en Terapia Familiar Sistémica.",
      "Psicoterapia 13, avalada por Secretaría de Salud y Hospital General de Pachuca.",
      "Diplomado en Tanatología.",
      "Seminario de Formación de Instructores CEFAPSIC.",
    ],
  },
  {
    nombre: "Mto. Andrés Luciano Gregorio",
    cargo: "Especializado en rehabilitación, terapeuta en clínica de adicciones",
    formacion: [
      "Licenciado en Psicología con Maestría en Psicología Clínica y de la Salud, especializado en Rehabilitación de adicciones.",
      "Nueve años de experiencia laboral en el campo clínico y seis años en el área de RRHH.",
      "Cédula: 11050830.",
    ],
    especialidades: [
      "Atención psicoterapéutica individual, grupal y familiar enfocada en la rehabilitación en adicciones, trastornos mentales y de comportamiento.",
      "Experiencia en atención psicológica a infantes, adolescentes y adultos.",
      "Experiencia en desarrollo del capital humano.",
    ],
    congresos: [
      "Diplomado en Primeros Auxilios Psicológicos e Intervención en Crisis, IPSICA.",
      "Diplomado en Psicooncología.",
      "Entrenamiento en abordaje e intervención del suicidio, enfoque centrado en soluciones.",
    ],
  },
  {
    nombre: "Mta. Dulce María Cano Lara",
    cargo: "Especializada en salud mental, terapeuta en clínica de adicciones",
    formacion: [
      "Licenciada en Psicología.",
      "Maestría en Salud Mental.",
      "Cuenta con 6 años de experiencia.",
      "Cédula: 13547225.",
    ],
    congresos: [
      "10º Congreso de Terapia de Juego.",
      "Área de Psicología, DIF.",
      "Atención a pacientes en adicción.",
    ],
  },
  {
    nombre: "Lic. Alan Alonso Gutiérrez Pérez",
    cargo: "Profesor de Arteterapia especializado en adicciones",
    formacion: [
      "Licenciado en Artes Plásticas por el Instituto de Artes Plásticas del Estado.",
      "Profesor de arteterapia en Clínica SER (2016 – actualidad).",
      "Cédula profesional: 9835844.",
    ],
    especialidades: [
      "Especialista en arteterapia: intervención que utiliza las artes plásticas como medio de diálogo para recuperar o mejorar la salud mental, el bienestar emocional y social de las personas. Las actividades artísticas refuerzan los beneficios de las terapias psicológicas como vía de expresión, comunicación y reflexión para el paciente.",
      "Tallerista en el Centro de Bienestar del ISSTEP Puebla (2014-2017).",
      "Profesor de arteterapia en Casa de Salud (2014-actualidad).",
    ],
  },
  {
    nombre: "Mta. Silvia Lucía Morales López (Ravi Nam Kaur)",
    cargo: "Maestra de yoga especializada en clínica de adicciones",
    formacion: [
      "Maestra de yoga especializada en Kundalini Yoga.",
      "Directora y maestra del centro de yoga «Casa GAIA Kundalini Yoga» en Puebla.",
    ],
    especialidades: [
      "Experiencia en clínicas de recuperación de adicciones y clínicas psiquiátricas.",
      "Experiencia en clubes sociales, colegios Montessori y particulares, pre-postnatal, y trabajo con mamás y niños con capacidades diferentes.",
    ],
    congresos: [
      "Certificación Internacional de Kundalini Yoga por Kundalini Research Institute (KRI) e International Kundalini Yoga Teachers Association (IKYTA).",
      "Certificación como entrenadora para yoga de niños y adolescentes por SICCED e Instituto Poblano del Deporte.",
      "Certificación Internacional en yoga para niños, programa «Child Play Yoga».",
    ],
  },
  {
    nombre: "Lic. Juliana Domínguez Esparza",
    cargo: "Maestra de Educación Física en Clínica de Adicciones",
    formacion: [
      "Licenciada en Cultura Física por la Benemérita Universidad Autónoma de Puebla (generación 2017–2021).",
      "Cédula profesional: 13080654.",
    ],
    especialidades: [
      "3 años de experiencia como maestra de educación y actividad física para pacientes psiquiátricos y en rehabilitación de adicciones.",
    ],
  },
  {
    nombre: "Dra. Rebeca Elizabeth Morales De Los Santos",
    cargo: "Especialista en Psiquiatría y Tratamiento de Adicciones",
    formacion: [
      "Médico Cirujano por la Universidad Popular Autónoma del Estado de Puebla.",
      "Médico Interno de pregrado por el Hospital General de Puebla, Secretaría de Salud.",
      "Especialidad en Psiquiatría (2017), Hospital Psiquiátrico Dr. Rafael Serrano.",
      "Cédula profesional: 10418569.",
      "Alta Especialidad en Psiquiatría Legal (2017), Hospital Psiquiátrico Fray Bernardino Álvarez.",
      "Recertificación por el Consejo Mexicano de Psiquiatría, 2023.",
    ],
    congresos: [
      "Diplomado Introductorio al Estudio de las Adicciones (2017).",
      "Diplomado en Prevención y Tratamiento del Consumo de Drogas, Centros de Integración Juvenil A.C. (2021).",
      "Diplomado en Administración de Sistemas de Salud, Colegio Interdisciplinario de Profesionales de la Salud (2021).",
      "Curso de Actualización en Psiquiatría, Instituto Nacional de Psiquiatría Dr. Ramón de la Fuente, CDMX (2017).",
    ],
  },
  {
    nombre: "Dr. Juan Alberto García Zúñiga",
    cargo: "Médico Psiquiatra adscrito",
    formacion: [
      "Médico Cirujano y Partero por la Benemérita Universidad Autónoma de Puebla (BUAP).",
      "Médico Psiquiatra por la Benemérita Universidad Autónoma de Puebla (BUAP).",
    ],
    especialidades: [
      "Psiquiatra adscrito en Clínica SER.",
      "Experiencia previa como psiquiatra en el Instituto Mexicano del Seguro Social (IMSS) y en Centro de Rehabilitación Integral.",
      "Coautor del artículo «Uso prolongado de benzodiacepinas y su relación con el trastorno neurocognitivo menor», Revista Innovación y Desarrollo Tecnológico.",
    ],
    congresos: [
      "Intervención mhGAP para trastornos mentales, neurológicos y por consumo de sustancias.",
      "Tamizaje de salud mental en trabajadores y derechohabientes.",
      "Intoxicaciones y envenenamientos frecuentes en urgencias.",
      "Manejo integral en cuidados paliativos.",
      "Vigilancia epidemiológica de enfermedades no transmisibles.",
    ],
  },
];

const EQUIPO_MEDICO = [
  "4 Especialistas en Psiquiatría.",
  "4 Especialistas en Adicciones.",
  "2 Médicos Generales",
  "5 Maestros en Psicología.",
  "1 Instructor de Yoga.",
  "1 Profesor de Educación Física.",
  "1 Licenciado en Artes Plásticas.",
  "1 Licenciada en Enfermería",
  "8 Enfermeras Generales (2 Diplomadas en Psiquiatría).",
  "2 Adictos en Recuperación (Programa de los 12 Pasos).",
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

      <section className="eq-pg__intro-section side-bands">
        <span data-anim="band" className="side-band side-band--l side-band--navy" aria-hidden="true" />
        <span data-anim="band" className="side-band side-band--r side-band--navy" aria-hidden="true" />
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
                <li key={i}><Check size={16} aria-hidden="true" /><span>{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="eq-pg__profile-section side-bands">
        <span data-anim="band" className="side-band side-band--full side-band--l side-band--gold" aria-hidden="true" />
        <span data-anim="band" className="side-band side-band--full side-band--r side-band--gold" aria-hidden="true" />
        {PERFILES.map((perfil, idx) => (
          <div key={idx} className="eq-pg__profile-container" data-anim="fade-up">
            {/* TODO: imagen del cliente — foto de {perfil.nombre} */}
            <div className="eq-pg__profile-header">
              <h2 className="eq-pg__profile-name">{perfil.nombre}</h2>
              <p className="eq-pg__profile-role">{perfil.cargo}</p>
            </div>

            <div className="eq-pg__profile-block">
              <h3 className="eq-pg__profile-subtitle">Formación</h3>
              <ul className="eq-pg__profile-list">
                {perfil.formacion.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {perfil.especialidades && perfil.especialidades.length > 0 && (
              <div className="eq-pg__profile-block">
                <h3 className="eq-pg__profile-subtitle">Entre sus especialidades resaltan</h3>
                <ul className="eq-pg__profile-list">
                  {perfil.especialidades.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {perfil.congresos && perfil.congresos.length > 0 && (
              <div className="eq-pg__profile-block">
                <h3 className="eq-pg__profile-subtitle">Cursos y congresos internacionales</h3>
                <ul className="eq-pg__profile-list">
                  {perfil.congresos.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="eq-pg__profile-block eq-pg__profile-contact">
              <h3 className="eq-pg__profile-subtitle">Agenda una consulta</h3>
              <div className="eq-pg__contact-links">
                <a
                  href={`tel:${SITE.telefonoTel[0]}`}
                  className="eq-pg__contact-link"
                  aria-label={`Llamar al teléfono principal ${SITE.telefonos[0]}`}
                  onClick={() => trackCTAClick("CONTACTO_PERFIL_TEL_PRINCIPAL")}
                >
                  <Phone size={16} aria-hidden="true" />
                  <span>{SITE.telefonos[0]}</span>
                </a>
                <a
                  href={`tel:${SITE.telefonoTel[1]}`}
                  className="eq-pg__contact-link"
                  aria-label={`Llamar al teléfono de emergencias 24 horas ${SITE.telefonos[1]}`}
                  onClick={() => trackCTAClick("CONTACTO_PERFIL_TEL_EMERGENCIA")}
                >
                  <Phone size={16} aria-hidden="true" />
                  <span>{SITE.telefonos[1]}</span>
                  <span className="eq-pg__contact-badge">24 horas</span>
                </a>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eq-pg__contact-link"
                  aria-label={`Enviar mensaje por WhatsApp, horario ${SITE.whatsappHorario}`}
                  onClick={() => trackCTAClick("CONTACTO_PERFIL_WA")}
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  <span>WhatsApp</span>
                  <span className="eq-pg__contact-note">{SITE.whatsappHorario}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>


      <section className="eq-pg__cta">
        <div className="eq-pg__cta-inner" data-anim="fade-up">
          <h2 className="eq-pg__cta-title">¿Necesitas hablar con un especialista?</h2>
          <p className="eq-pg__cta-text">Nuestro equipo está disponible las 24 horas para resolver tus dudas.</p>
          <div className="eq-pg__cta-actions">
            <a href={`tel:${SITE.telefonoTel[0]}`} className="eq-pg__cta-btn"><Phone size={16} aria-hidden="true" /> Llamar ahora</a>
            <a href={`mailto:${SITE.email}`} className="eq-pg__cta-btn eq-pg__cta-btn--ghost"><Mail size={16} aria-hidden="true" /> {SITE.email}</a>
          </div>
        </div>
      </section>

      <style>{`
        .eq-pg__hero { position: relative; min-height: 50vh; display: flex; align-items: center; background: url('/images/equipo.jpg') center 25%/cover; }
        .eq-pg__hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,46,.88), rgba(26,26,46,.6)); }
        .eq-pg__hero-content { position: relative; z-index: 2; max-width: 900px; padding: 120px clamp(24px,5vw,80px) 80px; }
        .eq-pg__tag { font-family: 'Source Sans 3', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: .15em; color: #D9C756; display: block; margin-bottom: 16px; }
        .eq-pg__hero-title { font-family: 'Source Sans 3', sans-serif; font-size: clamp(28px,4vw,48px); font-weight: 700; color: white; line-height: 1.2; margin: 0; }

        .eq-pg__intro-section { background: #FFFFFF; padding: clamp(48px,6vw,80px) 24px; }
        .eq-pg__intro-container { max-width: 900px; margin: 0 auto; }
        .eq-pg__intro { font-family: 'Source Sans 3', sans-serif; font-size: clamp(16px,1.4vw,18px); color: #333; line-height: 1.8; margin: 0; }

        .eq-pg__lists { background: #F5F5F5; padding: clamp(64px,8vw,100px) 24px; }
        .eq-pg__lists-container { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 32px; }
        .eq-pg__list-card { background: #FFFFFF; border-radius: 20px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,.05); }
        .eq-pg__list-title { font-family: 'Source Sans 3', sans-serif; font-size: clamp(20px,2vw,26px); font-weight: 700; color: #003057; margin: 0 0 24px; }
        .eq-pg__list { list-style: none; margin: 0; padding: 0; }
        .eq-pg__list li { font-family: 'Source Sans 3', sans-serif; font-size: 15px; color: #444; line-height: 1.7; padding: 10px 0; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid #EEE; }
        .eq-pg__list li > svg { color: #D9C756; flex-shrink: 0; }
        .eq-pg__list li:last-child { border-bottom: none; }

        .eq-pg__profile-section { background: #FFFFFF; padding: clamp(64px,8vw,100px) 24px; }
        .eq-pg__profile-container { max-width: 900px; margin: 0 auto; background: #F9FAFB; border-radius: 24px; padding: clamp(32px,4vw,56px); border: 1px solid #E5E7EB; }
        .eq-pg__profile-header { margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid #D9C756; }
        .eq-pg__profile-name { font-family: 'Source Sans 3', sans-serif; font-size: clamp(22px,2.5vw,32px); font-weight: 700; color: #003057; margin: 0 0 6px; }
        .eq-pg__profile-role { font-family: 'Source Sans 3', sans-serif; font-size: 15px; color: #666; margin: 0; }
        .eq-pg__profile-block { margin-top: 28px; }
        .eq-pg__profile-subtitle { font-family: 'Source Sans 3', sans-serif; font-size: 14px; text-transform: uppercase; letter-spacing: .1em; color: #003057; margin: 0 0 12px; font-weight: 700; }
        .eq-pg__profile-list { list-style: none; margin: 0; padding: 0; }
        .eq-pg__profile-list li { font-family: 'Source Sans 3', sans-serif; font-size: 15px; color: #333; line-height: 1.7; padding: 8px 0 8px 20px; position: relative; }
        .eq-pg__profile-list li::before { content: '•'; position: absolute; left: 0; color: #D9C756; font-weight: 700; }

        .eq-pg__profile-contact { margin-top: 36px; padding-top: 28px; border-top: 1px solid #E5E7EB; }
        .eq-pg__contact-links { display: flex; flex-wrap: wrap; gap: 12px; }
        .eq-pg__contact-link { display: inline-flex; align-items: center; gap: 8px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 60px; padding: 10px 18px; font-family: 'Source Sans 3', sans-serif; font-size: 14px; font-weight: 600; color: #003057; text-decoration: none; transition: background-color .2s, border-color .2s; }
        .eq-pg__contact-link:hover { background: #F3F6F1; border-color: #D9C756; }
        .eq-pg__contact-link > svg { color: #D9C756; flex-shrink: 0; }
        .eq-pg__contact-badge { margin-left: 4px; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; background: #003057; color: #FFFFFF; padding: 2px 8px; border-radius: 12px; font-weight: 700; }
        .eq-pg__contact-note { margin-left: 4px; font-size: 12px; color: #666; font-weight: 500; }

        .eq-pg__cta { background: #003057; padding: clamp(64px,8vw,100px) 24px; text-align: center; }
        .eq-pg__cta-inner { max-width: 700px; margin: 0 auto; }
        .eq-pg__cta-title { font-family: 'Source Sans 3', sans-serif; font-size: clamp(26px,3.5vw,40px); font-weight: 700; color: white; margin: 0 0 16px; }
        .eq-pg__cta-text { font-family: 'Source Sans 3', sans-serif; font-size: 16px; color: rgba(255,255,255,.65); margin: 0 0 32px; }
        .eq-pg__cta-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .eq-pg__cta-btn { display: inline-flex; align-items: center; gap: 8px; background: #D9C756; color: #003057; padding: 14px 28px; border-radius: 60px; font-family: 'Source Sans 3', sans-serif; font-size: 13px; font-weight: 600; text-decoration: none; transition: background .2s; }
        .eq-pg__cta-btn:hover { background: #B8A63F; color: #003057; }
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