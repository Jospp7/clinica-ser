// TODO: el cliente tiene testimonios reales en video (ver sitio anterior, sección
// "Historias de Transformación"). Restaurar la sección cuando los entregue.
// Los testimonios previos eran personas inventadas con fotos de Unsplash — retirados
// por riesgo legal.
const Testimonios = () => null;

export default Testimonios;

// eslint-disable-next-line
const _unused = () => {
  return (
    <section>
      <div className="test-v2__container">
        <span className="test-v2__tag" data-anim="fade-up">HISTORIAS DE RECUPERACIÓN</span>
        <h2 className="test-v2__title" data-anim="fade-up">
          Testimonios: centro de<br />rehabilitación en Puebla
        </h2>

        <div className="test-v2__grid">
          {/* Video area */}
          <div className="test-v2__video" data-anim="fade-right">
            <img src={TESTIMONIALS[active].video} alt={TESTIMONIALS[active].name} className="test-v2__video-img" />
            <div className="test-v2__play-btn">▶</div>
            <div className="test-v2__video-name">
              {TESTIMONIALS[active].name} · {TESTIMONIALS[active].age}
            </div>
          </div>

          {/* Selector pills */}
          <div className="test-v2__pills" data-anim="fade-left">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={i}
                className={`test-v2__pill ${active === i ? "test-v2__pill--active" : ""}`}
                style={{ background: t.color }}
                onClick={() => setActive(i)}
              >
                <img src={t.thumb} alt={t.name} className="test-v2__pill-thumb" />
                <div>
                  <div className="test-v2__pill-name">{t.name}</div>
                  <div className="test-v2__pill-age">{t.age}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .test-v2 { padding: clamp(80px, 10vw, 120px) 24px; background: #1B2A4A; text-align: center; }
        .test-v2__container { max-width: 1300px; margin: 0 auto; }
        .test-v2__tag { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; color: #C8A84A; display: block; margin-bottom: 16px; }
        .test-v2__title { font-family: 'Inter', sans-serif; font-size: clamp(28px, 4vw, 48px); font-weight: 800; color: white; margin: 0 0 48px; line-height: 1.15; }

        .test-v2__grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; align-items: center; text-align: left; }
        .test-v2__video { position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 16/10; }
        .test-v2__video-img { width: 100%; height: 100%; object-fit: cover; }
        .test-v2__play-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 64px; height: 64px; border-radius: 50%; background: #C8E64A; color: #1A1A2E; display: flex; align-items: center; justify-content: center; font-size: 22px; cursor: pointer; box-shadow: 0 8px 32px rgba(0,0,0,0.3); transition: transform 0.2s; }
        .test-v2__play-btn:hover { transform: translate(-50%, -50%) scale(1.1); }
        .test-v2__video-name { position: absolute; bottom: 16px; left: 16px; background: rgba(26,26,46,0.85); color: white; padding: 8px 16px; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; }

        .test-v2__pills { display: flex; flex-direction: column; gap: 12px; }
        .test-v2__pill { display: flex; align-items: center; gap: 14px; padding: 14px 20px; border-radius: 60px; border: none; cursor: pointer; width: 100%; text-align: left; transition: all 0.3s; opacity: 0.7; }
        .test-v2__pill--active { opacity: 1; transform: scale(1.02); box-shadow: 0 4px 20px rgba(0,0,0,0.2); }
        .test-v2__pill:hover { opacity: 1; }
        .test-v2__pill-thumb { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(255,255,255,0.3); }
        .test-v2__pill-name { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; color: white; }
        .test-v2__pill-age { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.7); font-style: italic; }

        @media (max-width: 900px) {
          .test-v2__grid { grid-template-columns: 1fr; }
          .test-v2__pills { flex-direction: row; overflow-x: auto; }
          .test-v2__pill { min-width: 200px; }
        }
      `}</style>
    </section>
  );
};

export default Testimonios;
