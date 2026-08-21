const DOC_IMG = "/images/nosotros.jpg";

const Nosotros = () => {
  return (
    <section className="nosotros-v2" id="nosotros">
      <div className="nosotros-v2__header">
        <h2 className="nosotros-v2__heading" data-anim="fade-up">
          Bienvenido a SER:<br />Clínica para tratamiento de adicciones
        </h2>
        <div className="nosotros-v2__dot" data-anim="fade-up" />
      </div>

      <div className="nosotros-v2__split">
        <div className="nosotros-v2__text-wrap">
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
        </div>

        <div className="nosotros-v2__img-col" data-anim="fade-left">
          <img src={DOC_IMG} alt="Instalaciones de Clínica SER" className="nosotros-v2__img" loading="lazy" />
        </div>
      </div>

      <style>{`
        .nosotros-v2 { padding: clamp(80px, 10vw, 140px) 0; background: #FFFFFF; overflow-x: hidden; }
        .nosotros-v2__header { padding: 0 clamp(24px, 5vw, 80px); }
        .nosotros-v2__heading { font-family: 'Source Sans 3', sans-serif; font-size: clamp(22px, 3.2vw, 39px); font-weight: 800; color: #003057; text-align: center; line-height: 1.15; margin: 0 0 16px; letter-spacing: -0.02em; }
        .nosotros-v2__dot { width: 12px; height: 12px; border-radius: 50%; background: #D9C756; margin: 0 auto 60px; }

        .nosotros-v2__split { display: grid; grid-template-columns: 50% 50%; align-items: stretch; min-height: 480px; }
        .nosotros-v2__text-wrap { display: flex; align-items: center; justify-content: flex-end; padding: clamp(48px, 6vw, 100px) clamp(24px, 5vw, 80px); }
        .nosotros-v2__text-col { width: 100%; max-width: 600px; }
        .nosotros-v2__text { font-family: 'Source Sans 3', sans-serif; font-size: clamp(15px, 1.5vw, 17px); line-height: 1.7; color: #555; margin: 0 0 24px; }
        .nosotros-v2__highlight { font-family: 'Source Sans 3', sans-serif; font-size: clamp(15px, 1.5vw, 17px); font-weight: 600; color: #8A7826; margin: 0; }
        .nosotros-v2__img-col { position: relative; min-height: 480px; }
        .nosotros-v2__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }

        @media (max-width: 900px) {
          .nosotros-v2__split { grid-template-columns: 1fr; }
          .nosotros-v2__text-wrap { justify-content: center; }
          .nosotros-v2__img-col { min-height: 320px; order: -1; }
        }
      `}</style>
    </section>
  );
};

export default Nosotros;
