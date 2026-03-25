const Nosotros = () => {
  return (
    <section className="about-sec" id="nosotros">
      <div className="about-sec__container">
        <div className="about-sec__grid">
          <div className="about-sec__content" data-anim="fade-right">
            <span className="about-sec__tag">NUESTRO PROPÓSITO</span>
            <h2 className="about-sec__title">No estás solo en este proceso</h2>
            <p className="about-sec__text">
              En Clínica SER entendemos que la adicción no es una falta de voluntad, sino una enfermedad tratable. Durante más de 5 décadas, hemos acompañado a miles de familias poblanas y de todo México hacia una recuperación real y duradera.
            </p>
            <p className="about-sec__text">
              Nuestro enfoque clínico-humanista aborda no solo el consumo, sino las causas profundas emocionales y psicológicas, involucrando a la familia como pilar fundamental de sanación.
            </p>
            <div className="about-sec__stats">
              <div className="about-stat">
                <span className="about-stat__num">58+</span>
                <span className="about-stat__label">Años de exp.</span>
              </div>
              <div className="about-stat">
                <span className="about-stat__num">CENADIC</span>
                <span className="about-stat__label">Clínica certificada</span>
              </div>
            </div>
          </div>

          <div className="about-sec__img-wrap" data-anim="fade-left">
            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80" alt="Equipo médico SER" className="about-sec__img" loading="lazy" />
            <div className="about-sec__badge">
              <span>Atención 24/7</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-sec { padding: clamp(80px, 10vw, 140px) 24px; background: #FFFFFF; }
        .about-sec__container { max-width: 1200px; margin: 0 auto; }
        .about-sec__grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px, 6vw, 80px); align-items: center; }
        .about-sec__tag { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; color: #8AB83A; display: block; margin-bottom: 16px; }
        .about-sec__title { font-family: 'Inter', sans-serif; font-size: clamp(32px, 4vw, 48px); font-weight: 800; color: #1A1A2E; line-height: 1.1; margin: 0 0 24px; letter-spacing: -0.02em; }
        .about-sec__text { font-family: 'Inter', sans-serif; font-size: clamp(15px, 1.5vw, 17px); line-height: 1.7; color: #555; margin: 0 0 20px; }
        .about-sec__stats { display: flex; gap: 40px; margin-top: 40px; padding-top: 40px; border-top: 1px solid #E8E8E8; }
        .about-stat__num { display: block; font-family: 'Inter', sans-serif; font-size: 32px; font-weight: 800; color: #1A1A2E; margin-bottom: 4px; }
        .about-stat__label { font-family: 'Inter', sans-serif; font-size: 12px; color: #888; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
        .about-sec__img-wrap { position: relative; border-radius: 24px; overflow: hidden; }
        .about-sec__img { width: 100%; height: auto; display: block; border-radius: 24px; }
        .about-sec__badge { position: absolute; bottom: 32px; left: -20px; background: #C8E64A; color: #1A1A2E; padding: 16px 24px; border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; box-shadow: 0 12px 32px rgba(0,0,0,0.1); }

        @media (max-width: 900px) {
          .about-sec__grid { grid-template-columns: 1fr; }
          .about-sec__badge { left: 24px; }
        }
      `}</style>
    </section>
  );
};

export default Nosotros;
