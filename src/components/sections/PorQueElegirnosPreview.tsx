const PorQueElegirnosPreview = () => {
  return (
    <section className="pqe-prev">
      <div className="pqe-prev__inner">
        <h2 className="pqe-prev__title" data-anim="fade-up">AQUÍ RECONSTRUIMOS VIDAS</h2>
        <p className="pqe-prev__sub" data-anim="fade-up">
          Estas son algunas de las razones por las que miles de familias han confiado en nosotros.
        </p>

        <div className="pqe-prev__media" data-anim="fade-up">
          <img
            src="/images/por-que-elegirnos.jpg"
            alt="Instalaciones de Clínica SER"
            className="pqe-prev__img"
            loading="lazy"
          />
        </div>
      </div>

      <style>{`
        .pqe-prev { background: #FFFFFF; padding: clamp(64px,8vw,120px) clamp(24px, 5vw, 80px); }
        .pqe-prev__inner { max-width: 1200px; margin: 0 auto; }
        .pqe-prev__title { font-family: 'Source Sans 3', sans-serif; font-size: clamp(32px,5vw,60px); font-weight: 800; color: var(--brand-navy); line-height: 1.1; margin: 0 0 16px; text-align: center; letter-spacing: -0.02em; }
        .pqe-prev__sub { font-family: 'Source Sans 3', sans-serif; font-size: clamp(15px,1.6vw,18px); color: hsl(var(--muted-foreground)); line-height: 1.7; margin: 0 auto clamp(40px,5vw,56px); text-align: center; max-width: 640px; }
        .pqe-prev__media { width: 100vw; margin-left: calc(-50vw + 50%); overflow: hidden; margin-top: clamp(40px,5vw,64px); margin-bottom: clamp(40px,5vw,64px); box-shadow: 0 18px 40px -28px hsl(var(--secondary) / 0.5); }
        .pqe-prev__img { width: 100%; height: clamp(280px, 45vw, 560px); object-fit: cover; display: block; }
        @media (max-width: 768px) {
          .pqe-prev { padding-bottom: 24px; }
          .pqe-prev__media { margin-top: 32px; margin-bottom: 0; }
        }
      `}</style>
    </section>
  );
};

export default PorQueElegirnosPreview;
