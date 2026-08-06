import { Link } from "react-router-dom";
import { ArrowRight, Award, HeartHandshake, Stethoscope } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { trackCTAClick } from "@/hooks/useTracking";

const DATOS_EQUIPO: Array<{ title: string; icon: LucideIcon }> = [
  {
    title: "4 Especialistas en Psiquiatría",
    icon: Stethoscope,
  },
  {
    title: "4 Especialistas en Adicciones",
    icon: HeartHandshake,
  },
  {
    title: "58 años de experiencia",
    icon: Award,
  },
];

const EquipoPreview = () => {
  return (
    <section className="eq-prev">
      <div className="eq-prev__inner">
        <h2 className="eq-prev__title" data-anim="fade-up">
          Un equipo médico que hace la diferencia
        </h2>
        <p className="eq-prev__sub" data-anim="fade-up">
          Personal de primer nivel con estudios en las instituciones más reconocidas en el tratamiento de adicciones.
        </p>

        <div className="eq-prev__media" data-anim="fade-up">
          <img
            src="/images/equipo.jpg"
            alt="Equipo médico de Clínica SER"
            className="eq-prev__img"
            loading="lazy"
          />
        </div>

        <div className="eq-prev__grid">
          {DATOS_EQUIPO.map((dato, i) => {
            const Icon = dato.icon;
            return (
              <div
                key={dato.title}
                className="eq-prev__card"
                data-anim="fade-up"
                data-anim-delay={`${i * 0.12}s`}
              >
                <Icon className="eq-prev__icon" size={38} strokeWidth={1.8} aria-hidden="true" />
                <h3 className="eq-prev__card-title">{dato.title}</h3>
              </div>
            );
          })}
        </div>

        <div className="eq-prev__cta" data-anim="fade-up">
          <Link
            to="/equipo"
            className="eq-prev__btn"
            onClick={() => trackCTAClick("HOME_A_EQUIPO")}
          >
            Conoce a nuestro equipo
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <style>{`
        .eq-prev { background: hsl(var(--muted) / 0.35); padding: clamp(64px,8vw,120px) 24px; }
        .eq-prev__inner { max-width: 1200px; margin: 0 auto; }
        .eq-prev__title { font-family: 'Source Sans 3', sans-serif; font-size: clamp(32px,5vw,60px); font-weight: 800; color: var(--brand-navy); line-height: 1.1; margin: 0 0 16px; text-align: center; letter-spacing: -0.02em; }
        .eq-prev__sub { font-family: 'Source Sans 3', sans-serif; font-size: clamp(15px,1.6vw,18px); color: hsl(var(--muted-foreground)); line-height: 1.7; margin: 0 auto clamp(40px,5vw,56px); text-align: center; max-width: 720px; }
        .eq-prev__media { border-radius: 12px; overflow: hidden; margin: 0 auto clamp(32px,4vw,48px); max-width: 1000px; box-shadow: 0 18px 40px -28px hsl(var(--secondary) / 0.5); }
        .eq-prev__img { width: 100%; height: clamp(220px, 34vw, 380px); object-fit: cover; object-position: center 22%; display: block; }
        .eq-prev__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .eq-prev__card { display: flex; flex-direction: column; justify-content: center; min-height: 190px; background: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-radius: 8px; padding: 32px; box-shadow: 0 12px 30px -20px hsl(var(--secondary) / 0.35); transition: transform .3s, box-shadow .3s; }
        .eq-prev__card:hover { transform: translateY(-4px); box-shadow: 0 16px 34px -20px hsl(var(--secondary) / 0.5); }
        .eq-prev__icon { color: var(--brand-navy); margin-bottom: 20px; flex-shrink: 0; }
        .eq-prev__card-title { font-family: 'Source Sans 3', sans-serif; font-size: 20px; font-weight: 700; color: var(--brand-navy); margin: 0; line-height: 1.25; }
        .eq-prev__cta { text-align: center; margin-top: clamp(40px,5vw,56px); }
        .eq-prev__btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: var(--brand-gold); color: var(--brand-navy); padding: 16px 32px; border-radius: 60px; font-family: 'Source Sans 3', sans-serif; font-size: 15px; font-weight: 700; text-decoration: none; transition: background .2s, transform .2s; }
        .eq-prev__btn:hover { background: #B8A63F; color: var(--brand-navy); transform: translateY(-2px); }
        @media (max-width: 768px) { .eq-prev__grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
};

export default EquipoPreview;
