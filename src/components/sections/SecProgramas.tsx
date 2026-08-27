import { Dices, Pill, Smartphone, Stethoscope, Tablets, Wine } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ContactoCTA from "@/components/ContactoCTA";

// Lista oficial de programas validada por el cliente.
const CONDITIONS: Array<{ title: string; desc: string; icon: LucideIcon }> = [
  {
    title: "Alcohol",
    desc: "Tratamiento integral para el consumo de alcohol, con evaluación clínica, desintoxicación y atención primaria por especialistas en psiquiatría.",
    icon: Wine,
  },
  {
    title: "Drogas",
    desc: "Tratamiento para la adicción a sustancias, con soporte médico y de enfermería disponible las 24 horas del día, pruebas de laboratorio, detección de drogas y electrocardiogramas.",
    icon: Pill,
  },
  {
    title: "Ludopatía (juego y apuestas)",
    desc: "Tratamiento para la adicción al juego y las apuestas.",
    icon: Dices,
  },
  {
    title: "Tecnofilia (adicción a las nuevas tecnologías)",
    desc: "Tratamiento especializado para la adicción a las nuevas tecnologías.",
    icon: Smartphone,
    // TODO: descripción pendiente
  },
  {
    title: "Opiáceos (heroína, morfina, codeína, tebaína)",
    desc: "Tratamiento integral para el consumo de opiáceos, incluyendo heroína, morfina, codeína y tebaína.",
    icon: Tablets,
  },
  {
    title: "Medicamentos psicotrópicos (benzodiazepinas)",
    desc: "Tratamiento para la adicción a medicamentos psicotrópicos, como benzodiazepinas.",
    icon: Stethoscope,
  },
];

const SecProgramas = () => {

  return (
    <section id="programas">
      <section className="pad-hero">
        <div className="pad-hero__overlay" />
        <div className="pad-hero__content" data-anim="fade-up">
          <span className="pad-hero__tag">PROGRAMAS QUE TRATAMOS</span>
          <h2 className="pad-hero__title">Nuestros programas</h2>
          <p className="pad-hero__sub">Adicciones atendidas en Clínica SER Puebla.</p>
        </div>
      </section>

      <section className="pad-grid-section">
        <div className="pad-container">
            {CONDITIONS.map((c, i) => {
              const Icon = c.icon;

              return (
                <div key={i} className="pad-card" data-anim="fade-up" data-anim-delay={`${(i % 3) * 0.12}s`}>
                  <Icon className="pad-card__icon" size={38} strokeWidth={1.8} aria-hidden="true" />
                  <div className="pad-card__header">
                    <span className="pad-card__num">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="pad-card__title">{c.title}</h3>
                  </div>
                  <p className="pad-card__desc">{c.desc}</p>
                </div>
              );
            })}
        </div>

        <ContactoCTA ubicacion="PROGRAMAS" variant="azul" />
      </section>

      <style>{`
        /* TODO: imagen del cliente para .pad-hero (fondo neutro por defecto) */
        .pad-hero { position: relative; min-height: 260px; display: flex; align-items: center; background: url('/images/programas-fondo.jpg') center/cover; }
        .pad-hero__overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,46,.88), rgba(26,26,46,.6)); }
        .pad-hero__content { position: relative; z-index: 2; max-width: 700px; padding: clamp(32px,4vw,48px) clamp(24px,5vw,80px); }
        .pad-hero__tag { font-family: 'Source Sans 3', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: .15em; color: #D9C756; display: block; margin-bottom: 16px; }
        .pad-hero__title { font-family: 'Source Sans 3', sans-serif; font-size: clamp(28px,4vw,48px); font-weight: 700; color: white; line-height: 1.2; margin: 0 0 16px; }
        .pad-hero__sub { font-family: 'Source Sans 3', sans-serif; font-size: 16px; color: rgba(255,255,255,.7); line-height: 1.7; margin: 0; }
        @media (max-width: 768px) { .pad-hero { min-height: 200px; } }

        .pad-grid-section { background: #FFFFFF; padding: clamp(64px,8vw,120px) clamp(24px, 5vw, 80px); }
         .pad-container { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; max-width: 1200px; margin: 0 auto; }
          .pad-card { display: flex; flex-direction: column; min-height: 270px; background: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-radius: 8px; padding: 32px; box-shadow: 0 12px 30px -20px hsl(var(--secondary) / 0.35); transition: transform .3s, box-shadow .3s; }
          .pad-card:hover { transform: translateY(-4px); box-shadow: 0 16px 34px -20px hsl(var(--secondary) / 0.5); }
         .pad-card__icon { color: var(--brand-navy); margin-bottom: 20px; flex-shrink: 0; }
         .pad-card__header { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 16px; }
         .pad-card__num { font-family: 'Source Sans 3', sans-serif; font-size: 28px; font-weight: 800; color: var(--brand-gold); line-height: 1; }
         .pad-card__title { font-family: 'Source Sans 3', sans-serif; font-size: 20px; font-weight: 700; color: var(--brand-navy); margin: 0; line-height: 1.25; }
         .pad-card__desc { font-family: 'Source Sans 3', sans-serif; font-size: 14px; color: hsl(var(--muted-foreground)); line-height: 1.7; margin: 0; }

        @media (max-width: 768px) { .pad-container { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
};

export default SecProgramas;
