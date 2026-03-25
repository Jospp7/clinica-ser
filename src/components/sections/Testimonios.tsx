import { Star } from "lucide-react";

const REVIEWS = [
  { name: "Familia Gómez", text: "Excelente trato humano. Nuestro hijo lleva 2 años limpio gracias al equipo de la clínica." },
  { name: "Carlos M.", text: "Las instalaciones son de primer nivel. Me sentí seguro y respetado durante todo mi proceso." },
  { name: "Andrea P.", text: "El acompañamiento psicológico no solo me ayudó a mí, sino a toda mi familia a entender la enfermedad." },
];

const Testimonios = () => {
  return (
    <section className="test-sec">
      <div className="test-sec__container">
        <h2 className="test-sec__title" data-anim="fade-up">Lo que dicen las familias</h2>
        <div className="test-sec__grid">
          {REVIEWS.map((r, i) => (
            <div key={i} className="test-card" data-anim="fade-up" data-anim-delay={`${i * 0.15}s`}>
              <div className="test-card__stars">
                {[1,2,3,4,5].map(s => <Star key={s} fill="#D4A843" color="#D4A843" size={16} />)}
              </div>
              <p className="test-card__text">"{r.text}"</p>
              <p className="test-card__name">— {r.name}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .test-sec { padding: clamp(80px, 10vw, 120px) 24px; background: #FFFFFF; }
        .test-sec__container { max-width: 1200px; margin: 0 auto; text-align: center; }
        .test-sec__title { font-family: 'Inter', sans-serif; font-size: clamp(28px, 3.5vw, 40px); font-weight: 800; color: #1A1A2E; margin: 0 0 48px; }

        .test-sec__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .test-card { background: #F8F9FA; padding: 40px 32px; border-radius: 20px; text-align: left; }
        .test-card__stars { display: flex; gap: 4px; margin-bottom: 16px; }
        .test-card__text { font-family: 'Inter', sans-serif; font-size: 15px; color: #555; line-height: 1.6; font-style: italic; margin: 0 0 16px; }
        .test-card__name { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; color: #1A1A2E; margin: 0; }

        @media (max-width: 768px) { .test-sec__grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
};

export default Testimonios;
