import Seo from "@/components/Seo";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { SITE, waLink } from "@/lib/site";

// Bloques del programa — texto literal del sitio original.
const BLOQUES: { title: string; desc?: string; items?: string[] }[] = [
  {
    title: "Tratamiento para las adicciones.",
    desc: "Somos especialistas en el tratamiento de trastornos coexistentes como el estrés, la depresión y la ansiedad. Esto permite un porcentaje altísimo de recuperación con miras a alcanzar la sobriedad.",
  },
  {
    title: "Atención individualizada para adictos.",
    desc: "Trabajamos con grupos reducidos, lo que nos permite asignar más terapeutas y ofrecer sesiones personalizadas. Incluye post-tratamiento sin tiempo límite ni costo adicional para el paciente y su familia, en la clínica y en cualquier parte de la República o del mundo vía videoconferencia.",
  },
  {
    title: "Actividades adicionales.",
    desc: "Yoga, meditación, ejercicios, arteterapia y orientación espiritual, para una rehabilitación integral.",
  },
  {
    title: "Terapias de grupo especial",
    desc: "Únicas en México, desarrolladas desde la historia personal de cada paciente:",
    items: [
      "Técnicas de manejo del estrés",
      "Grupo de duelo",
      "Grupo de ira",
      "Grupo de terapia racional emotiva",
      "Grupo de salud mental",
      "Grupo de terapia cognitivo conductual",
    ],
  },
  {
    title: "Tratamiento continuo.",
    desc: "Seguimiento después del tratamiento primario de 35 o 42 días, vía programa Tratamiento Continuo: atención externa en instalaciones, sin costo ni tiempo límite, sesiones grupales dos veces por semana guiadas por expertos en psicología. Disponible por videoconferencia desde cualquier lugar.",
  },
  {
    title: "Programa para la familia.",
    desc: "Reuniones familiares dos veces por semana, dirigidas por un experto en Psicología, gratuitas y sin límite de tiempo.",
  },
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
          <p className="trat-hero__sub">En Clínica SER, estamos a la vanguardia en la rehabilitación de adicciones como alcoholismo y drogadicción. ¡Nuestro nivel de recuperación y no incidencia es de los más altos de México!</p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="trat-hero__btn">AGENDA TU EVALUACIÓN</a>
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
          <h2 className="trat-grid__title" data-anim="fade-up">¿Qué incluye el tratamiento?</h2>
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
          <p className="trat-grid__closer" data-anim="fade-up">Elige ser feliz... estás a sólo unos pasos. ¡Vive sin ataduras!</p>
        </div>
      </section>

      <section className="trat-cta">
        <div className="trat-cta__inner" data-anim="fade-up">
          <h2 className="trat-cta__title">¿Necesitas ayuda?</h2>
          <p className="trat-cta__text">Nuestro equipo está disponible las 24 horas para orientarte.</p>
          <div className="trat-cta__btns">
            <a href={`tel:${SITE.telefonoTel[0]}`} className="trat-cta__btn">📞 Llamar ahora</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="trat-cta__btn trat-cta__btn--wa">💬 WhatsApp</a>
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
        .trat-grid__closer { font-family: 'Inter', sans-serif; font-size: clamp(18px,2vw,22px); font-weight: 600; color: #1A1A2E; text-align: center; margin: 48px 0 0; font-style: italic; }

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
          .trat-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
};

export default Tratamiento;
