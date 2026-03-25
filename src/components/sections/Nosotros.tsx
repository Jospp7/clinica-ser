const DOC_IMG = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80";

const Nosotros = () => {
  return (
    <section className="nosotros-v2" id="nosotros">
      <div className="nosotros-v2__container">
        <h2 className="nosotros-v2__heading" data-anim="fade-up">
          Bienvenido a SER:<br />Clínica para tratamiento de adicciones
        </h2>
        <div className="nosotros-v2__dot" data-anim="fade-up" />

        <div className="nosotros-v2__grid">
          <div className="nosotros-v2__text-col" data-anim="fade-right">
            <p className="nosotros-v2__text">
              SER® es una clínica de adicciones que forma parte del grupo hospitalario más importante y reconocido de la región: Casa de Salud, S.A. de C.V., fundado en la ciudad de Puebla el 29 de septiembre de 1967.
            </p>
            <p className="nosotros-v2__text">
              En esta importante trayectoria llena de calidad y trato humano destacan nuestros resultados. El profesionalismo y la calidez son valores que nos distinguen. En más de cinco décadas de servicio son miles los pacientes y familias que se han visto beneficiados por nuestra atención.
            </p>
            <p className="nosotros-v2__highlight">
              Somos expertos en Rehabilitación de Adicciones.
            </p>
          </div>

          <div className="nosotros-v2__img-col" data-anim="fade-left">
            <img src={DOC_IMG} alt="Doctor con teléfono" className="nosotros-v2__img" loading="lazy" />
          </div>
        </div>
      </div>

      <style>{`
        .nosotros-v2 { padding: clamp(80px, 10vw, 140px) 24px; background: #FFFFFF; }
        .nosotros-v2__container { max-width: 1200px; margin: 0 auto; }
        .nosotros-v2__heading { font-family: 'Inter', sans-serif; font-size: clamp(32px, 4.5vw, 56px); font-weight: 800; color: #1A1A2E; text-align: center; line-height: 1.15; margin: 0 0 16px; letter-spacing: -0.02em; }
        .nosotros-v2__dot { width: 12px; height: 12px; border-radius: 50%; background: #C8E64A; margin: 0 auto 60px; }
        .nosotros-v2__grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px, 6vw, 80px); align-items: start; }
        .nosotros-v2__text { font-family: 'Inter', sans-serif; font-size: clamp(15px, 1.5vw, 17px); line-height: 1.7; color: #555; margin: 0 0 24px; }
        .nosotros-v2__highlight { font-family: 'Inter', sans-serif; font-size: clamp(15px, 1.5vw, 17px); font-weight: 600; color: #8AB83A; margin: 0; }
        .nosotros-v2__img-col { border-radius: 16px; overflow: hidden; }
        .nosotros-v2__img { width: 100%; height: auto; display: block; border-radius: 16px; }

        @media (max-width: 900px) {
          .nosotros-v2__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default Nosotros;
