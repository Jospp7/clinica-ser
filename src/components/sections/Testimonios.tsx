const VIDEOS = [
  { id: "TIUTCR_WVa0", title: "Testimonio 1 - Clínica SER" },
  { id: "2sXq7KYyqp0", title: "Testimonio 2 - Clínica SER" },
  { id: "kpawXykz7vE", title: "Testimonio 3 - Clínica SER" },
];

const Testimonios = () => {
  return (
    <section className="testimonios-v2">
      <div className="testimonios-v2__inner">
        <h2 className="testimonios-v2__title">Historias reales de recuperación</h2>
        <p className="testimonios-v2__subtitle">
          Testimonios de personas y familias que confiaron en Clínica SER.
        </p>

        <div className="testimonios-v2__grid">
          {VIDEOS.map((video) => (
            <div className="testimonios-v2__video" key={video.id}>
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonios-v2 { background: hsl(var(--muted) / 0.35); padding: clamp(64px, 8vw, 120px) 24px; }
        .testimonios-v2__inner { width: min(1200px, 100%); margin: 0 auto; }
        .testimonios-v2__title { color: var(--brand-navy); font-family: 'Source Sans 3', sans-serif; font-size: clamp(32px, 5vw, 60px); font-weight: 800; line-height: 1.1; margin: 0 0 16px; text-align: center; }
        .testimonios-v2__subtitle { color: hsl(var(--muted-foreground)); font-family: 'Source Sans 3', sans-serif; font-size: clamp(16px, 1.6vw, 18px); line-height: 1.7; margin: 0 auto clamp(40px, 5vw, 56px); max-width: 680px; text-align: center; }
        .testimonios-v2__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
        .testimonios-v2__video { aspect-ratio: 16 / 9; background: var(--brand-navy); border-top: 4px solid var(--brand-gold); overflow: hidden; }
        .testimonios-v2__video iframe { border: 0; display: block; height: 100%; width: 100%; }
        @media (max-width: 768px) {
          .testimonios-v2__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default Testimonios;
