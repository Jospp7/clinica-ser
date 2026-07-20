import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Phone, MessageCircle, Stethoscope, Building2, Users, HelpCircle, BookOpen, ArrowLeft } from "lucide-react";
import Seo from "@/components/Seo";
import { SITE, waLink } from "@/lib/site";
import { trackCTAClick } from "@/hooks/useTracking";

const SECCIONES = [
  { to: "/tratamiento", label: "Tratamiento", Icon: Stethoscope },
  { to: "/instalaciones", label: "Instalaciones", Icon: Building2 },
  { to: "/equipo", label: "Equipo", Icon: Users },
  { to: "/preguntas-frecuentes", label: "Preguntas frecuentes", Icon: HelpCircle },
  { to: "/blog", label: "Blog", Icon: BookOpen },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: ruta no encontrada:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="nf">
      <Seo
        title="Página no encontrada — Clínica SER Puebla"
        description="La página que buscas no existe o cambió de dirección. Contáctanos o explora las secciones principales de Clínica SER."
        path="/404"
        noindex
      />

      <section className="nf__hero">
        <div className="nf__inner">
          <span className="nf__code">404</span>
          <h1 className="nf__title">Esta página no existe o cambió de dirección</h1>
          <p className="nf__lead">
            Es posible que el enlace esté desactualizado o que la información se haya movido.
            Si necesitas atención ahora, estamos disponibles las 24 horas, los 365 días del año.
          </p>

          <div className="nf__ctas">
            <a
              href={`tel:${SITE.telefonoTel[0]}`}
              className="nf__cta nf__cta--primary"
              onClick={() => trackCTAClick("LLAMAR_404")}
            >
              <Phone size={18} aria-hidden="true" /> Llamar ahora
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="nf__cta nf__cta--wa"
              onClick={() => trackCTAClick("WHATSAPP_404")}
            >
              <MessageCircle size={18} aria-hidden="true" /> Escribir por WhatsApp
            </a>
          </div>

          <div className="nf__back">
            <Link to="/" className="nf__back-link">
              <ArrowLeft size={16} aria-hidden="true" /> Volver al inicio
            </Link>
          </div>
        </div>
      </section>

      <section className="nf__sections">
        <div className="nf__inner">
          <h2 className="nf__sections-title">¿Qué buscabas?</h2>
          <ul className="nf__grid">
            {SECCIONES.map(({ to, label, Icon }) => (
              <li key={to}>
                <Link to={to} className="nf__card">
                  <Icon size={20} aria-hidden="true" />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <style>{`
        .nf { background: #F5F5F5; min-height: 100vh; }
        .nf__inner { max-width: 900px; margin: 0 auto; padding: 0 clamp(24px,5vw,48px); }
        .nf__hero { padding: clamp(80px,12vw,140px) 0 clamp(48px,6vw,80px); text-align: center; }
        .nf__code { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; letter-spacing: .2em; color: #8AB83A; text-transform: uppercase; display: block; margin-bottom: 16px; }
        .nf__title { font-family: 'Inter', sans-serif; font-size: clamp(28px,4vw,44px); font-weight: 700; color: #1A1A2E; line-height: 1.2; margin: 0 0 20px; }
        .nf__lead { font-family: 'Inter', sans-serif; font-size: 16px; color: #555; line-height: 1.7; margin: 0 auto 32px; max-width: 620px; }
        .nf__ctas { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 24px; }
        .nf__cta { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; border-radius: 60px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; transition: all .2s; }
        .nf__cta--primary { background: #C8E64A; color: #1A1A2E; }
        .nf__cta--primary:hover { background: #8AB83A; color: white; }
        .nf__cta--wa { background: #25D366; color: white; }
        .nf__cta--wa:hover { background: #1DA851; }
        .nf__back { margin-top: 8px; }
        .nf__back-link { display: inline-flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 14px; color: #555; text-decoration: none; }
        .nf__back-link:hover { color: #1A1A2E; }

        .nf__sections { padding: 0 0 clamp(80px,10vw,120px); }
        .nf__sections-title { font-family: 'Inter', sans-serif; font-size: clamp(20px,2.5vw,26px); font-weight: 700; color: #1A1A2E; text-align: center; margin: 0 0 32px; }
        .nf__grid { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
        .nf__card { display: flex; align-items: center; gap: 12px; background: white; border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; padding: 18px 20px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600; color: #1A1A2E; text-decoration: none; transition: all .2s; }
        .nf__card:hover { border-color: #C8E64A; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
      `}</style>
    </main>
  );
};

export default NotFound;
