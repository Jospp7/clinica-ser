import { SITE } from "@/lib/site";

const REASONS = [
  { num: "1", title: "Costos accesibles y facilidades de pago.", desc: "Considerando nuestra experiencia, instalaciones, profesionalismo y casos de éxito." },
  { num: "2", title: "Experiencia.", desc: "Clínica SER forma parte de un grupo médico fundado en 1967, distinguido por su constante evolución y liderazgo a través del tiempo." },
  { num: "3", title: "Profesionalismo.", desc: "Todo el equipo cuenta con grado de especialización y maestría y se actualiza constantemente sobre las técnicas más avanzadas de abordaje terapéutico." },
  { num: "4", title: "Atención.", desc: "Amplio equipo de personal médico calificado, disponible para nuestros pacientes todos los días del año." },
  { num: "5", title: "Tratamiento Integral SER®.", desc: "Único en el país que contempla un tratamiento integral por especialistas en Psiquiatría que atienden padecimientos coexistentes." },
  { num: "6", title: "Instalaciones.", desc: "Espacio por espacio, diseñadas para facilitar la recuperación con la comodidad y privacidad requeridas." },
  { num: "7", title: "Seguimiento.", desc: "Seguimiento post-tratamiento sin límite y sin costo, desde cualquier lugar de México y el mundo." },
];

const TIMELINE = [
  { year: "1967", label: "Fundación del grupo médico." },
  { year: "2014", label: "Hito de la clínica." }, // TODO: falta dato del cliente — descripción exacta del hito 2014
  { year: "2025", label: "Hito de la clínica." }, // TODO: falta dato del cliente — descripción exacta del hito 2025
];

const STATS = [
  { num: `${SITE.aniosExperiencia}+`, label: "Años de experiencia" },
  { num: "24/7", label: "Disponibilidad" },
];

const SecPorQueElegirnos = () => {

  return (
    <section>
      <section className="pqe-intro-section side-bands">
        <span className="side-band side-band--l side-band--navy" aria-hidden="true" />
        <span className="side-band side-band--r side-band--navy" aria-hidden="true" />
        <div className="pqe-intro-container" data-anim="fade-up">
          <p className="pqe-intro">
            Clínica SER® forma parte de un grupo médico cuya experiencia de más de {SITE.aniosExperiencia} años le ha permitido desarrollar el modelo de tratamiento para la adicción al alcohol y la drogadicción más avanzado y con mayor éxito del país. No existe en todo el país un centro de rehabilitación y desintoxicación que cuente con el respaldo de un hospital de salud mental como parte de su grupo médico, lo que permite brindar atención calificada para padecimientos coexistentes. El trato en Clínica SER es profesional y humano, con confidencialidad y respeto.
          </p>
        </div>
      </section>

      <section className="pqe-stats">
        <div className="pqe-stats__container">
          {STATS.map((s, i) => (
            <div key={i} className="pqe-stats__item" data-anim="fade-up" data-anim-delay={`${i * 0.1}s`}>
              <span className="pqe-stats__num">{s.num}</span>
              <span className="pqe-stats__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="pqe-reasons">
        <div className="pqe-reasons__container">
          <h3 className="pqe-reasons__title" data-anim="fade-up">7 razones para elegir Clínica SER</h3>
          <div className="pqe-reasons__grid">
            {REASONS.map((r, i) => (
              <div key={i} className="pqe-reason" data-anim="fade-up" data-anim-delay={`${(i % 4) * 0.1}s`}>
                <span className="pqe-reason__icon">{r.num}</span>
                <h3 className="pqe-reason__title">{r.title}</h3>
                <p className="pqe-reason__text">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TODO: restaurar sección .pqe-timeline cuando el cliente entregue las descripciones reales de los hitos 2014 y 2025 (ver array TIMELINE). */}

      <section className="pqe-closing">
        <p className="pqe-closing__text" data-anim="fade-up">Elige ser feliz... estás a sólo unos pasos. ¡Vive sin ataduras!</p>
      </section>

      <style>{`
        .pqe-intro-section { background: #FFFFFF; padding: clamp(48px,6vw,80px) 24px; }
        .pqe-intro-container { max-width: 900px; margin: 0 auto; }
        .pqe-intro { font-family: 'Source Sans 3', sans-serif; font-size: clamp(16px,1.4vw,18px); color: #333; line-height: 1.8; margin: 0; }

        .pqe-stats { background: #FFFFFF; padding: clamp(32px,4vw,56px) 24px; }
        .pqe-stats__container { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(2,1fr); gap: 24px; }
        .pqe-stats__item { background: #F5F5F5; border-radius: 20px; padding: 32px 24px; text-align: center; }
        .pqe-stats__num { display: block; font-family: 'Source Sans 3', sans-serif; font-size: clamp(32px,3.5vw,44px); font-weight: 800; color: #003057; margin-bottom: 8px; }
        .pqe-stats__label { font-family: 'Source Sans 3', sans-serif; font-size: 14px; color: #666; }

        .pqe-reasons { background: #FFFFFF; padding: clamp(64px,8vw,120px) clamp(24px, 5vw, 80px); }
        .pqe-reasons__container { max-width: 1200px; margin: 0 auto; }
        .pqe-reasons__title { font-family: 'Source Sans 3', sans-serif; font-size: clamp(26px,3.5vw,40px); font-weight: 700; color: #003057; text-align: center; margin: 0 0 48px; }
        .pqe-reasons__grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .pqe-reasons__grid > .pqe-reason:last-child:nth-child(3n+1) { grid-column: 2 / 3; }
        .pqe-reason { display: flex; flex-direction: column; min-height: 270px; background: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-radius: 8px; padding: 32px; box-shadow: 0 12px 30px -20px hsl(var(--secondary) / 0.35); transition: transform .3s, box-shadow .3s; text-align: center; }
        .pqe-reason:hover { transform: translateY(-4px); box-shadow: 0 16px 34px -20px hsl(var(--secondary) / 0.5); }
        .pqe-reason__icon { font-size: 36px; font-weight: 800; color: #D9C756; display: block; margin-bottom: 16px; }
        .pqe-reason__title { font-family: 'Source Sans 3', sans-serif; font-size: 20px; font-weight: 700; color: var(--brand-navy); margin: 0 0 12px; line-height: 1.25; }
        .pqe-reason__text { font-family: 'Source Sans 3', sans-serif; font-size: 14px; color: hsl(var(--muted-foreground)); line-height: 1.7; margin: 0; }

        .pqe-timeline { background: #F5F5F5; padding: clamp(64px,8vw,100px) clamp(24px, 5vw, 80px); }
        .pqe-timeline__container { max-width: 1100px; margin: 0 auto; }
        .pqe-timeline__title { font-family: 'Source Sans 3', sans-serif; font-size: clamp(26px,3.5vw,40px); font-weight: 700; color: #003057; text-align: center; margin: 0 0 48px; }
        .pqe-timeline__grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .pqe-timeline__item { background: #FFFFFF; border-radius: 20px; padding: 32px 24px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,.05); }
        .pqe-timeline__year { display: block; font-family: 'Source Sans 3', sans-serif; font-size: clamp(28px,3vw,40px); font-weight: 800; color: #003057; margin-bottom: 8px; }
        .pqe-timeline__label { font-family: 'Source Sans 3', sans-serif; font-size: 14px; color: #666; }

        .pqe-closing { background: #FFFFFF; padding: clamp(48px,6vw,80px) 24px; text-align: center; }
        .pqe-closing__text { font-family: 'Source Sans 3', sans-serif; font-size: clamp(18px,2vw,24px); font-weight: 600; color: #003057; margin: 0; font-style: italic; }

        @media (max-width: 900px) {
          .pqe-reasons__grid { grid-template-columns: repeat(2,1fr); }
          .pqe-reasons__grid > .pqe-reason:last-child:nth-child(3n+1) { grid-column: auto; }
          .pqe-timeline__grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .pqe-reasons__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default SecPorQueElegirnos;
