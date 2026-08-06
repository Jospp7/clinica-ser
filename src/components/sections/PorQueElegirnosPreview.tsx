import { Link } from "react-router-dom";
import { Award, HeartPulse, Repeat, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { trackCTAClick } from "@/hooks/useTracking";

const RAZONES: Array<{ title: string; desc: string; icon: LucideIcon }> = [
  {
    title: "Experiencia.",
    desc: "Clínica SER forma parte de un grupo médico fundado en 1967, distinguido por su constante evolución y liderazgo a través del tiempo.",
    icon: Award,
  },
  {
    title: "Tratamiento Integral SER®.",
    desc: "Único en el país que contempla un tratamiento integral por especialistas en Psiquiatría que atienden padecimientos coexistentes.",
    icon: HeartPulse,
  },
  {
    title: "Seguimiento.",
    desc: "Seguimiento post-tratamiento sin límite y sin costo, desde cualquier lugar de México y el mundo.",
    icon: Repeat,
  },
];

const PorQueElegirnosPreview = () => {
  return (
    <section className="pqe-prev">
      <div className="pqe-prev__inner">
        <h2 className="pqe-prev__title" data-anim="fade-up">Más de 58 años transformando vidas</h2>
        <p className="pqe-prev__sub" data-anim="fade-up">
          Estas son algunas de las razones por las que miles de familias han confiado en nosotros.
        </p>

        <div className="pqe-prev__grid">
          {RAZONES.map((r, i) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="pqe-prev__card" data-anim="fade-up" data-anim-delay={`${i * 0.12}s`}>
                <Icon className="pqe-prev__icon" size={38} strokeWidth={1.8} aria-hidden="true" />
                <h3 className="pqe-prev__card-title">{r.title}</h3>
                <p className="pqe-prev__card-desc">{r.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="pqe-prev__cta" data-anim="fade-up">
          <Link to="/por-que-elegirnos" className="pqe-prev__btn" onClick={() => trackCTAClick("HOME_A_PORQUE")}>
            Conoce por qué elegirnos
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <style>{`
        .pqe-prev { background: #FFFFFF; padding: clamp(64px,8vw,120px) 24px; }
        .pqe-prev__inner { max-width: 1200px; margin: 0 auto; }
        .pqe-prev__title { font-family: 'Source Sans 3', sans-serif; font-size: clamp(32px,5vw,60px); font-weight: 800; color: var(--brand-navy); line-height: 1.1; margin: 0 0 16px; text-align: center; letter-spacing: -0.02em; }
        .pqe-prev__sub { font-family: 'Source Sans 3', sans-serif; font-size: clamp(15px,1.6vw,18px); color: hsl(var(--muted-foreground)); line-height: 1.7; margin: 0 auto clamp(40px,5vw,56px); text-align: center; max-width: 640px; }
        .pqe-prev__grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .pqe-prev__card { display: flex; flex-direction: column; min-height: 270px; background: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-radius: 8px; padding: 32px; box-shadow: 0 12px 30px -20px hsl(var(--secondary) / 0.35); transition: transform .3s, box-shadow .3s; }
        .pqe-prev__card:hover { transform: translateY(-4px); box-shadow: 0 16px 34px -20px hsl(var(--secondary) / 0.5); }
        .pqe-prev__icon { color: var(--brand-navy); margin-bottom: 20px; flex-shrink: 0; }
        .pqe-prev__card-title { font-family: 'Source Sans 3', sans-serif; font-size: 20px; font-weight: 700; color: var(--brand-navy); margin: 0 0 12px; line-height: 1.25; }
        .pqe-prev__card-desc { font-family: 'Source Sans 3', sans-serif; font-size: 14px; color: hsl(var(--muted-foreground)); line-height: 1.7; margin: 0; }
        .pqe-prev__cta { text-align: center; margin-top: clamp(40px,5vw,56px); }
        .pqe-prev__btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: var(--brand-gold); color: var(--brand-navy); padding: 16px 32px; border-radius: 60px; font-family: 'Source Sans 3', sans-serif; font-size: 15px; font-weight: 700; text-decoration: none; transition: background .2s, transform .2s; }
        .pqe-prev__btn:hover { background: #B8A63F; color: var(--brand-navy); transform: translateY(-2px); }
        @media (max-width: 768px) { .pqe-prev__grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
};

export default PorQueElegirnosPreview;
