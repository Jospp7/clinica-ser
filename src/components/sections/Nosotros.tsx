const DOC_IMG = "/images/nosotros.jpg";

const Nosotros = () => {
  return (
    <section className="nosotros-v2" id="nosotros">
      <div className="nosotros-v2__split">
        <div className="nosotros-v2__text-wrap">
          <div className="nosotros-v2__text-col" data-anim="fade-right">
            <h2 className="nosotros-v2__heading">
              Bienvenido a SER:<br />
              <span className="nosotros-v2__heading-accent">Clínica para tratamiento de adicciones</span>
            </h2>
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
        .nosotros-v2 { background: #FFFFFF; overflow-x: hidden; }

        .nosotros-v2__split {
          display: grid;
          grid-template-columns: 50% 50%;
          align-items: stretch;
          min-height: clamp(520px, 78vh, 760px);
        }

        .nosotros-v2__text-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: clamp(48px, 6vw, 100px) clamp(24px, 5vw, 80px);
          background: #FFFFFF;
        }

        .nosotros-v2__accent-bar {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 8px;
          background: var(--brand-navy);
        }

        .nosotros-v2__text-col {
          width: 100%;
          max-width: 600px;
          padding-left: clamp(16px, 2vw, 32px);
        }

        .nosotros-v2__heading {
          font-family: 'Source Sans 3', sans-serif;
          font-size: clamp(26px, 3.2vw, 42px);
          font-weight: 800;
          color: var(--brand-navy);
          line-height: 1.15;
          margin: 0 0 24px;
          letter-spacing: -0.02em;
        }

        .nosotros-v2__heading-accent {
          color: var(--brand-gold-dark);
        }

        .nosotros-v2__text {
          font-family: 'Source Sans 3', sans-serif;
          font-size: clamp(15px, 1.5vw, 17px);
          line-height: 1.7;
          color: #555;
          margin: 0 0 20px;
        }

        .nosotros-v2__highlight {
          font-family: 'Source Sans 3', sans-serif;
          font-size: clamp(15px, 1.5vw, 17px);
          font-weight: 700;
          color: var(--brand-navy);
          margin: 0;
        }

        .nosotros-v2__img-col {
          position: relative;
          min-height: clamp(320px, 46vw, 760px);
        }

        .nosotros-v2__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        @media (max-width: 900px) {
          .nosotros-v2__split {
            grid-template-columns: 1fr;
            min-height: 0;
          }

          .nosotros-v2__text-wrap {
            justify-content: center;
            padding: 56px 24px;
          }

          .nosotros-v2__accent-bar {
            width: 6px;
          }

          .nosotros-v2__text-col {
            padding-left: 18px;
          }

          .nosotros-v2__img-col {
            min-height: 300px;
            height: 58vw;
            order: -1;
          }
        }
      `}</style>
    </section>
  );
};

export default Nosotros;
