import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { trackCTAClick } from "@/hooks/useTracking";

const GuiaIngresoInvoluntario = () => {
  useScrollToTop();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Guía del ingreso involuntario por adicciones en México",
    description:
      "Proceso legal y clínico del ingreso involuntario para tratamiento de adicciones bajo la NOM-028-SSA2-2009 en México.",
    author: { "@type": "Organization", name: "Clínica SER" },
    publisher: { "@type": "Organization", name: "Clínica SER" },
    datePublished: "2026-03-01",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
  };

  return (
    <main>
      <Seo
        title="Guía del Ingreso Involuntario por Adicciones — Clínica SER Puebla"
        description="Cuándo y cómo la familia puede intervenir legalmente cuando un paciente se niega al tratamiento. Proceso clínico, criterios médicos y NOM-028-SSA2-2009 explicados por Clínica SER."
        path="/blog/guia-ingreso-involuntario"
        jsonLd={jsonLd}
      />

      <article className="guia">
        <header className="guia__hero">
          <div className="guia__hero-overlay" />
          <div className="guia__hero-content">
            <span className="guia__tag">GUÍA PARA FAMILIAS</span>
            <h1 className="guia__title">
              Proceso de Ingreso Involuntario<br />por Adicciones en México
            </h1>
            <p className="guia__lead">
              Cuándo y cómo la familia puede intervenir legalmente cuando un ser
              querido se niega a recibir tratamiento — bajo la Norma Oficial
              Mexicana NOM-028-SSA2-2009.
            </p>
          </div>
        </header>

        <div className="guia__body">
          <section className="guia__section">
            <h2>¿Qué es el ingreso involuntario?</h2>
            <p>
              El ingreso involuntario es una intervención médico-legal que
              permite a la familia solicitar el internamiento de un ser querido
              con una adicción activa, cuando esa persona no reconoce su
              problema, se niega a recibir ayuda y su vida —o la de terceros—
              está en riesgo. En México, este procedimiento está regulado por la
              <strong> Norma Oficial Mexicana NOM-028-SSA2-2009</strong>, que
              establece los criterios clínicos y las salvaguardas éticas para
              proteger tanto al paciente como a su familia.
            </p>
          </section>

          <section className="guia__section">
            <h2>Criterios médicos que justifican el ingreso</h2>
            <p>
              La NOM-028 exige que se cumpla al menos uno de los siguientes
              criterios clínicos para autorizar un ingreso involuntario:
            </p>
            <ul>
              <li>
                <strong>Intoxicación aguda</strong> por consumo de alcohol o
                sustancias psicoactivas que ponga en riesgo la vida.
              </li>
              <li>
                <strong>Síndrome de abstinencia o supresión</strong> severo que
                requiera atención médica inmediata.
              </li>
              <li>
                <strong>Trastorno psicótico agudo</strong> inducido por el
                consumo (alucinaciones, delirios, agresividad).
              </li>
              <li>
                <strong>Riesgo suicida o de heteroagresión</strong> derivado de
                la adicción o del consumo activo.
              </li>
              <li>
                <strong>Incapacidad para tomar decisiones</strong> por deterioro
                cognitivo relacionado con el consumo.
              </li>
            </ul>
          </section>

          <section className="guia__section">
            <h2>Paso a paso del proceso</h2>
            <ol>
              <li>
                <strong>Consulta inicial con la clínica.</strong> La familia
                contacta al centro de tratamiento para explicar el caso y
                recibir orientación. En Clínica SER esta llamada es gratuita y
                confidencial, disponible 24/7.
              </li>
              <li>
                <strong>Valoración clínica.</strong> Un médico especialista
                evalúa si el paciente cumple los criterios de la NOM-028 y
                determina el nivel de urgencia.
              </li>
              <li>
                <strong>Firma del consentimiento familiar.</strong> Un familiar
                directo (cónyuge, padre, madre o hijo mayor de edad) firma la
                solicitud de ingreso involuntario, respaldada por la valoración
                médica.
              </li>
              <li>
                <strong>Traslado seguro.</strong> Un equipo de intervención
                profesional acude al domicilio para realizar el traslado con
                técnicas respetuosas y no confrontativas.
              </li>
              <li>
                <strong>Ingreso y estabilización.</strong> El paciente es
                recibido por el equipo médico, se realiza desintoxicación
                supervisada y se inicia el plan terapéutico.
              </li>
              <li>
                <strong>Notificación a las autoridades sanitarias.</strong> Como
                lo exige la NOM-028, la clínica notifica el ingreso a la
                autoridad sanitaria correspondiente dentro de las 24 horas
                siguientes.
              </li>
            </ol>
          </section>

          <section className="guia__section">
            <h2>El papel del intervencionista profesional</h2>
            <p>
              Un intervencionista es un especialista entrenado para acompañar a
              la familia y facilitar el traslado del paciente al centro de
              tratamiento. Su trabajo no es coercitivo: utiliza técnicas de
              comunicación motivacional para reducir la resistencia y preservar
              la dignidad del paciente. En la mayoría de los casos, la
              intervención profesional logra que el paciente acepte
              voluntariamente el tratamiento durante el proceso.
            </p>
          </section>

          <section className="guia__section">
            <h2>Derechos del paciente durante el internamiento</h2>
            <ul>
              <li>Recibir información clara sobre su diagnóstico y tratamiento.</li>
              <li>Ser tratado con dignidad, respeto y confidencialidad.</li>
              <li>Recibir atención médica y psicológica adecuada.</li>
              <li>Ser reevaluado periódicamente para determinar la continuidad del internamiento.</li>
              <li>Recibir visitas familiares según el plan terapéutico.</li>
            </ul>
          </section>

          <section className="guia__section">
            <h2>Preguntas frecuentes de las familias</h2>
            <h3>¿El ingreso involuntario es legal en México?</h3>
            <p>
              Sí. La NOM-028-SSA2-2009 lo regula expresamente cuando existe
              riesgo para la salud o la vida del paciente y se cuenta con
              valoración médica.
            </p>
            <h3>¿Cuánto tiempo dura el ingreso involuntario?</h3>
            <p>
              La fase involuntaria suele durar entre 3 y 15 días, tiempo
              suficiente para estabilizar al paciente. A partir de ese punto se
              busca el consentimiento del paciente para continuar con el
              tratamiento voluntario.
            </p>
            <h3>¿Puedo visitar a mi familiar durante el internamiento?</h3>
            <p>
              Sí, pero las visitas se programan de acuerdo con el plan
              terapéutico. En las primeras 72 horas suelen limitarse para
              favorecer la estabilización.
            </p>
          </section>

          <section className="guia__cta">
            <h2>¿Necesitas ayuda urgente?</h2>
            <p>
              Nuestro equipo de intervención profesional está disponible las 24
              horas para orientarte sin compromiso.
            </p>
            <div className="guia__cta-btns">
              <a
                href={`tel:${SITE.telefonoTel[0]}`}
                className="guia__btn"
                onClick={() => trackCTAClick("LLAMAR_GUIA_INVOLUNTARIO")}
              >
                📞 Llamar ahora
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="guia__btn guia__btn--wa"
                onClick={() => trackCTAClick("WA_GUIA_INVOLUNTARIO")}
              >
                💬 WhatsApp
              </a>
            </div>
            <Link to="/blog" className="guia__back">← Volver al blog</Link>
          </section>
        </div>
      </article>

      <style>{`
        .guia { background: #FFFFFF; }
        .guia__hero { position: relative; min-height: 50vh; display: flex; align-items: center; background: url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80') center/cover; }
        .guia__hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,46,.88), rgba(26,26,46,.6)); }
        .guia__hero-content { position: relative; z-index: 2; max-width: 800px; padding: 120px clamp(24px,5vw,80px) 80px; }
        .guia__tag { font-family: 'Inter', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: .15em; color: #C8E64A; display: block; margin-bottom: 16px; }
        .guia__title { font-family: 'Inter', sans-serif; font-size: clamp(28px,4vw,44px); font-weight: 700; color: white; line-height: 1.2; margin: 0 0 16px; }
        .guia__lead { font-family: 'Inter', sans-serif; font-size: 17px; color: rgba(255,255,255,.78); line-height: 1.6; margin: 0; }

        .guia__body { max-width: 780px; margin: 0 auto; padding: clamp(48px,6vw,80px) clamp(20px,4vw,32px); font-family: 'Inter', sans-serif; color: #1A1A2E; }
        .guia__section { margin-bottom: 40px; }
        .guia__section h2 { font-size: clamp(20px,2.5vw,26px); font-weight: 700; color: #1A1A2E; margin: 0 0 16px; }
        .guia__section h3 { font-size: 16px; font-weight: 700; color: #1B2A4A; margin: 24px 0 8px; }
        .guia__section p, .guia__section li { font-size: 16px; line-height: 1.7; color: #444; margin: 0 0 12px; }
        .guia__section ul, .guia__section ol { padding-left: 22px; }
        .guia__section li { margin-bottom: 10px; }

        .guia__cta { background: #F5F5F0; padding: 40px; border-radius: 16px; text-align: center; margin-top: 60px; }
        .guia__cta h2 { font-size: 24px; font-weight: 700; color: #1A1A2E; margin: 0 0 12px; }
        .guia__cta p { font-size: 15px; color: #555; margin: 0 0 24px; }
        .guia__cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px; }
        .guia__btn { display: inline-flex; align-items: center; gap: 8px; background: #C8E64A; color: #1A1A2E; padding: 14px 28px; border-radius: 60px; font-size: 13px; font-weight: 700; text-decoration: none; transition: background .2s; }
        .guia__btn:hover { background: #8AB83A; color: white; }
        .guia__btn--wa { background: #25D366; color: white; }
        .guia__btn--wa:hover { background: #1DB954; }
        .guia__back { display: inline-block; font-size: 13px; color: #888; text-decoration: none; margin-top: 12px; }
        .guia__back:hover { color: #1A1A2E; }
      `}</style>
    </main>
  );
};

export default GuiaIngresoInvoluntario;