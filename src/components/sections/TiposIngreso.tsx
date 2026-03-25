const CARDS = [
  { type: "Ingreso Voluntario", icon: "🤝", desc: "El paciente reconoce su problema y decide internarse por voluntad propia. Firmamos un acuerdo de colaboración." },
  { type: "Ingreso Involuntario", icon: "🚨", desc: "La familia interviene por el riesgo inminente de salud del paciente. Nos encargamos del traslado seguro desde domicilio." },
  { type: "Traslados Foráneos", icon: "🚑", desc: "Contamos con equipo especializado para ir por el paciente a cualquier estado de la República Mexicana." },
];

const TiposIngreso = () => {
  return (
    <section className="ing-sec">
      <div className="ing-sec__container">
        <h2 className="ing-sec__title" data-anim="fade-up">Opciones de Ingreso</h2>
        <p className="ing-sec__sub" data-anim="fade-up">Sabemos que dar el paso es difícil. Te ofrecemos alternativas seguras.</p>

        <div className="ing-sec__grid">
          {CARDS.map((c, i) => (
            <div key={i} className="ing-card" data-anim="fade-up" data-anim-delay={`${i * 0.15}s`}>
              <span className="ing-card__icon">{c.icon}</span>
              <h3 className="ing-card__title">{c.type}</h3>
              <p className="ing-card__desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ing-sec { padding: clamp(80px, 10vw, 120px) 24px; background: #1B2A4A; text-align: center; }
        .ing-sec__container { max-width: 1200px; margin: 0 auto; }
        .ing-sec__title { font-family: 'Inter', sans-serif; font-size: clamp(28px, 3.5vw, 40px); font-weight: 800; color: white; margin: 0 0 16px; }
        .ing-sec__sub { font-family: 'Inter', sans-serif; font-size: 16px; color: rgba(255,255,255,0.7); margin: 0 0 48px; }

        .ing-sec__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .ing-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 40px 32px; backdrop-filter: blur(10px); transition: transform 0.3s; }
        .ing-card:hover { transform: translateY(-8px); background: rgba(255,255,255,0.08); }
        .ing-card__icon { font-size: 40px; display: block; margin-bottom: 20px; }
        .ing-card__title { font-family: 'Inter', sans-serif; font-size: 18px; font-weight: 700; color: #C8E64A; margin: 0 0 12px; }
        .ing-card__desc { font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.6; margin: 0; }

        @media (max-width: 768px) { .ing-sec__grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
};

export default TiposIngreso;
