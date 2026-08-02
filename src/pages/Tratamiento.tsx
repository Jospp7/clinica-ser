import Seo from "@/components/Seo";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { SITE, waLink } from "@/lib/site";
import { Phone, MessageCircle } from "lucide-react";

// Bloques de la sección "Tratamiento para adicciones de Clínica SER" — texto literal del cliente.
const BLOQUES: { title: string; desc?: string; items?: string[] }[] = [
  {
    title: "Tratamiento para las adicciones.",
    desc: "Somos especialistas en el tratamiento de trastornos coexistentes como el estrés, la depresión y la ansiedad. Esto permite un porcentaje altísimo de recuperación con miras a alcanzar la sobriedad en personas que sufren de adicciones.",
  },
  {
    title: "Atención individualizada para adictos.",
    desc: "Dentro de nuestro tratamiento para adicciones, trabajamos con grupos reducidos, lo que nos permite asignar un mayor número de terapeutas y ofrecer sesiones personalizadas a nuestros pacientes. Incluye post-tratamiento sin tiempo límite ni costo adicional para el paciente y su familia, en nuestra clínica y en cualquier parte de la República o del mundo a través de videoconferencias con un terapeuta calificado.",
  },
  {
    title: "Actividades adicionales para pacientes.",
    desc: "Integramos actividades complementarias como yoga, meditación, ejercicios, arteterapia y orientación espiritual, para una rehabilitación integral de nuestros pacientes.",
  },
  {
    title: "Terapias de grupo especial",
    desc: "Contamos con terapias únicas en México, desarrolladas a partir de la historia personal de cada paciente. Estas terapias incluyen:",
    items: [
      "Técnicas de manejo del estrés",
      "Grupo de duelo",
      "Grupo de ira",
      "Grupo de terapia racional emotiva",
      "Grupo de salud mental",
      "Grupo de terapia cognitivo conductual",
    ],
  },
];

// Duración de tratamiento por tipo de adicción — texto literal del cliente.
const DURACION: { adiccion: string; duracion: string }[] = [
  { adiccion: "Alcohol", duracion: "5 semanas" },
  { adiccion: "Drogas", duracion: "5 semanas" },
  { adiccion: "Ludopatía (juego / apuestas)", duracion: "5 semanas" },
  { adiccion: "Tecnofilia (adicción a las nuevas tecnologías)", duracion: "5 semanas" },
  { adiccion: "Opiáceos (heroína, morfina, codeína, tebaína)", duracion: "6 semanas" },
  { adiccion: "Medicamentos psicotrópicos (benzodiazepinas)", duracion: "6 semanas" },
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
      {/* TODO: imagen del cliente — reemplazar background del hero (actualmente Unsplash placeholder pendiente de pasada dedicada). */}
      <section className="trat-hero">
        <div className="trat-hero__overlay" />
        <div className="trat-hero__content" data-anim="fade-up">
          <span className="trat-hero__tag">NUESTROS TRATAMIENTOS</span>
          <h1 className="trat-hero__title">Descubre nuestro tratamiento para adicciones</h1>
          <p className="trat-hero__sub">En Clínica SER, estamos a la vanguardia en la rehabilitación de adicciones como alcoholismo y drogadicción.</p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="trat-hero__btn" title={`WhatsApp · ${SITE.whatsappHorario}`} aria-label={`Agenda tu evaluación por WhatsApp · ${SITE.whatsappHorario}`}>AGENDA TU EVALUACIÓN</a>
        </div>
      </section>

      <section className="trat-process">
        <div className="trat-process__container">
          <h2 className="trat-process__title" data-anim="fade-up">Programa de Tratamiento Integral SER®</h2>
          <div className="trat-intro" data-anim="fade-up">
            <p className="trat-intro__p">En la clínica de rehabilitación SER, sumamos al modelo Hazelden —anteriormente llamado modelo Minnesota para tratamiento de adicciones— y al programa de los 12 pasos, nuestra experiencia de más de {SITE.aniosExperiencia} años en el área de la salud mental.</p>
            <p className="trat-intro__p">Nuestro Programa de Tratamiento Integral SER®, proporciona una evaluación clínica y médica completa, desintoxicación y atención primaria por parte de especialistas en psiquiatría, con soporte médico y de enfermería disponible las 24 horas del día.</p>
            <p className="trat-intro__p">Este enfoque asegura un manejo seguro de los síntomas físicos agudos de la abstinencia. Además, en esta etapa, realizamos pruebas de laboratorio, detección de drogas y electrocardiogramas para garantizar la salud y seguridad de nuestros pacientes.</p>
          </div>
        </div>
      </section>

      <section className="trat-grid-section">
        <div className="trat-grid__container">
          <span className="trat-grid__tag" data-anim="fade-up">NUESTRO PROGRAMA</span>
          <h2 className="trat-grid__title" data-anim="fade-up">Tratamiento para adicciones de Clínica SER</h2>
          <div className="trat-grid">
            {/* TODO: imagen del cliente — cada bloque necesita imagen real; por ahora sin img. */}
            {BLOQUES.map((b, i) => (
              <div key={i} className="trat-card" data-anim="fade-up" data-anim-delay={`${i * 0.1}s`}>
                <div className="trat-card__body">
                  <h3 className="trat-card__title">{b.title}</h3>
                  {b.desc && <p className="trat-card__text">{b.desc}</p>}
                  {b.items && (
                    <ul className="trat-card__list">
                      {b.items.map((it, j) => <li key={j}>{it}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="trat-process">
        <div className="trat-process__container">
          <h2 className="trat-process__title" data-anim="fade-up">Enfoque integral</h2>
          <div className="trat-intro" data-anim="fade-up">
            <p className="trat-intro__p">En el centro de rehabilitación Clínica SER, ofrecemos un enfoque clínico integral que aborda simultáneamente problemas de salud mental y el tratamiento de adicciones tan comunes como alcoholismo y drogadicción. Si no se trata el trastorno coexistente, como la depresión, la ansiedad o el estrés postraumático, junto con la adicción al alcohol o las drogas, la sobriedad se ve comprometida y aumenta significativamente el riesgo de recaída.</p>
            <p className="trat-intro__p">Cada persona que busca ayuda en el centro de adicciones Clínica SER, trae consigo una historia personal única y un contexto específico. Nuestro tratamiento para adicciones aborda al individuo en su totalidad, basándose en un diagnóstico mental preciso, la sustancia adictiva, su historia familiar, salud física, género y otras variables relevantes. De esta manera, establecemos un plan de tratamiento individualizado que no solo promueve la rehabilitación, sino que también sostiene la sobriedad a largo plazo.</p>
          </div>
        </div>
      </section>

      <section className="trat-process">
        <div className="trat-process__container">
          <h2 className="trat-process__title" data-anim="fade-up">Tratamiento continuo para el paciente</h2>
          <div className="trat-intro" data-anim="fade-up">
            <p className="trat-intro__p">En Clínica SER, nuestros pacientes no están solos. Brindamos seguimiento continuo después de finalizado el tratamiento primario de 35 o 42 días, a través de nuestro programa Tratamiento Continuo.</p>
            <p className="trat-intro__p">En Clínica SER, ofrecemos nuestro programa de atención externa en nuestras instalaciones, sin ningún costo ni tiempo límite. Contamos con sesiones grupales dos veces por semana, guiadas por nuestros expertos calificados en psicología.</p>
            <p className="trat-intro__p">Si vives o estás fuera de Puebla, no te preocupes. Nuestro innovador programa te permite participar a través de videoconferencia en línea desde cualquier lugar de México y el mundo.</p>
          </div>
        </div>
      </section>

      <section className="trat-process">
        <div className="trat-process__container">
          <h2 className="trat-process__title" data-anim="fade-up">Programa para la familia del adicto</h2>
          <div className="trat-intro" data-anim="fade-up">
            <p className="trat-intro__p">En Clínica SER, apoyamos a las familias para que identifiquen nuevas maneras de afrontar la adicción y mejorar sus relaciones.</p>
            <p className="trat-intro__p">Durante y después del programa, los familiares de nuestros pacientes pueden asistir a reuniones familiares en Clínica SER® dos veces por semana, dirigidas por uno de nuestros expertos en Psicología. Estas sesiones son gratuitas y no tienen límite de tiempo.</p>
          </div>
        </div>
      </section>

      <section className="trat-process">
        <div className="trat-process__container">
          <h2 className="trat-process__title" data-anim="fade-up">Duración de tratamiento</h2>
          <div className="trat-duracion" data-anim="fade-up">
            <table className="trat-duracion__table">
              <thead>
                <tr>
                  <th>Adicción</th>
                  <th>Duración</th>
                </tr>
              </thead>
              <tbody>
                {DURACION.map((fila, i) => (
                  <tr key={i}>
                    <td>{fila.adiccion}</td>
                    <td>{fila.duracion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="trat-duracion__legend">Extensiones de tratamiento pueden ser recomendadas por nuestro Equipo Médico si es clínicamente apropiado.</p>
          </div>
        </div>
      </section>

      <section className="trat-cta">
        <div className="trat-cta__inner" data-anim="fade-up">
          <h2 className="trat-cta__title">¿Necesitas ayuda?</h2>
          <p className="trat-cta__text">Nuestro equipo está disponible las 24 horas para orientarte.</p>
          <div className="trat-cta__btns">
            <a href={`tel:${SITE.telefonoTel[0]}`} className="trat-cta__btn"><Phone size={18} aria-hidden="true" /> Llamar ahora</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="trat-cta__btn trat-cta__btn--wa" title={`WhatsApp · ${SITE.whatsappHorario}`} aria-label={`WhatsApp · ${SITE.whatsappHorario}`}><MessageCircle size={18} aria-hidden="true" /> WhatsApp</a>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, opacity: 0.75, marginTop: 12 }}>WhatsApp: {SITE.whatsappHorario}</p>
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
        .trat-intro { max-width: 860px; margin: 0 auto; }
        .trat-intro__p { font-family: 'Inter', sans-serif; font-size: 16px; color: #444; line-height: 1.8; margin: 0 0 20px; }

        .trat-grid-section { background: #F5F5F5; padding: clamp(64px,8vw,120px) 24px; }
        .trat-grid__container { max-width: 1200px; margin: 0 auto; }
        .trat-grid__tag { display: block; font-family: 'Inter', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: .12em; color: #8AB83A; margin-bottom: 12px; text-align: center; }
        .trat-grid__title { font-family: 'Inter', sans-serif; font-size: clamp(26px,3.5vw,40px); font-weight: 700; color: #1A1A2E; text-align: center; margin: 0 0 48px; }
        .trat-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .trat-card { background: rgba(255,255,255,0.10); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; overflow: hidden; transition: transform .3s, box-shadow .3s; }
        .trat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,.06); }
        .trat-card__body { padding: 24px; }
        .trat-card__title { font-family: 'Inter', sans-serif; font-size: 18px; font-weight: 700; color: #1A1A2E; margin: 0 0 8px; }
        .trat-card__text { font-family: 'Inter', sans-serif; font-size: 14px; color: #666; line-height: 1.7; margin: 0; }
        .trat-card__list { font-family: 'Inter', sans-serif; font-size: 14px; color: #666; line-height: 1.8; margin: 12px 0 0; padding-left: 18px; }

        .trat-cta { background: #1B2A4A; padding: clamp(64px,8vw,100px) 24px; text-align: center; }
        .trat-cta__inner { max-width: 600px; margin: 0 auto; }
        .trat-cta__title { font-family: 'Inter', sans-serif; font-size: clamp(28px,4vw,44px); font-weight: 700; color: white; margin: 0 0 16px; }
        .trat-cta__text { font-family: 'Inter', sans-serif; font-size: 16px; color: rgba(255,255,255,.6); margin: 0 0 32px; }
        .trat-cta__btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .trat-cta__btn { display: inline-flex; align-items: center; gap: 8px; background: #C8E64A; color: #1A1A2E; padding: 14px 32px; border-radius: 60px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; text-decoration: none; transition: background .2s; }
        .trat-cta__btn:hover { background: #8AB83A; color: white; }
        .trat-cta__btn--wa { background: #25D366; color: white; }
        .trat-cta__btn--wa:hover { background: #1DB954; }

        .trat-duracion { max-width: 700px; margin: 0 auto; }
        .trat-duracion__table { width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 15px; color: #444; }
        .trat-duracion__table th, .trat-duracion__table td { padding: 14px 16px; text-align: left; border-bottom: 1px solid rgba(0,0,0,.08); }
        .trat-duracion__table th { background: #1A1A2E; color: #FFFFFF; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: .05em; }
        .trat-duracion__table td:first-child { width: 70%; }
        .trat-duracion__table td:last-child { width: 30%; font-weight: 600; }
        .trat-duracion__legend { font-family: 'Inter', sans-serif; font-size: 13px; color: #666; text-align: center; margin: 16px 0 0; line-height: 1.5; }

        @media (max-width: 900px) {
          .trat-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
};

export default Tratamiento;
