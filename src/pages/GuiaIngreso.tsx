import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { trackCTAClick } from "@/hooks/useTracking";
import { SITE, waLink } from "@/lib/site";

const GuiaIngreso = () => {
  useScrollToTop();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "¡Entra con confianza! Guía de ingreso a Clínica SER",
    description:
      "Modalidades de ingreso a Clínica SER conforme a la NOM-028-SSA2-2009: voluntario, involuntario y obligatorio.",
    author: { "@type": "Organization", name: "Clínica SER" },
    publisher: { "@type": "Organization", name: "Clínica SER" },
  };

  return (
    <main>
      <Seo
        title="Guía de ingreso a Clínica SER — Modalidades bajo la NOM-028"
        description="Modalidades de ingreso a Clínica SER (voluntario, involuntario y obligatorio) conforme a la NOM-028-SSA2-2009."
        path="/guia-ingreso"
        jsonLd={jsonLd}
      />

      <article className="guia">
        <header className="guia__hero">
          <div className="guia__hero-overlay" />
          <div className="guia__hero-content">
            <span className="guia__tag">GUÍA PARA FAMILIAS</span>
            <h1 className="guia__title">
              ¡Entra con confianza!<br />Guía de ingreso a Clínica SER
            </h1>
            {/* TODO: subir clinica-ser-guia-de-ingreso.pdf a /public y enlazar aquí */}
            <a
              href="#"
              className="guia__btn"
              onClick={(e) => { e.preventDefault(); trackCTAClick("DESCARGAR_GUIA_INGRESO"); }}
              style={{ marginTop: 8 }}
            >
              Versión Descargable
            </a>
          </div>
        </header>

        <div className="guia__body">
          <section className="guia__section">
            <p>
              En Clínica SER, nos apegamos a la legislación más estricta que
              establece el Estado mexicano en relación a la prevención,
              tratamiento y control de las adicciones.
            </p>
            <p>
              De acuerdo a la Norma Oficial Mexicana, NOM-028-SSA2-2009, que nos
              regula, las modalidades de ingreso a nuestro centro de
              rehabilitación pueden ser tres:
            </p>
            <ul>
              <li>
                <strong>Ingreso voluntario:</strong> el ingreso voluntario a
                Clínica SER requiere del consentimiento del individuo, quien, en
                caso de ser menor de edad, necesita de la solicitud por escrito
                de sus padres, representante legal o tutor.
              </li>
              <li>
                <strong>Ingreso involuntario:</strong> el ingreso involuntario,
                por otro lado, se presenta en el caso de quienes precisan
                atención urgente o representan un peligro grave e inminente para
                sí mismos o para la sociedad. Se requiere la indicación médica
                de un especialista de Clínica SER y la solicitud de un familiar
                responsable, tutor o representante legal, ambas por escrito.
              </li>
              <li>
                <strong>Ingreso obligatorio:</strong> el ingreso obligatorio se
                lleva a cabo cuando lo solicite la autoridad legal competente,
                siempre y cuando el estado de salud del paciente lo amerite.
              </li>
            </ul>
          </section>

          <section className="guia__section">
            <h2>Ingreso a Clínica SER</h2>
            <p>
              Cuando se realiza un ingreso en Clínica SER, lo ideal es que la
              persona acuda por voluntad propia, pues esto favorece la
              recuperación e incrementa su compromiso con nuestro programa de
              rehabilitación.
            </p>
            <p>
              No obstante, no todos los casos son así, pues, cuando se trata de
              un ingreso involuntario, la familia está facultada legalmente para
              llevar a cabo dicho procedimiento.
            </p>
            <p>
              Asimismo, esta modalidad de ingreso se encuentra contemplada
              dentro de la Norma Oficial Mexicana, debido a que, en algunos
              casos, la vida de la persona intoxicada y de quienes lo rodean se
              encuentra bajo amenaza.
            </p>
            <p>
              Es por ello que, al llevar a cabo un ingreso involuntario, hay que
              tener en mente que se realiza en beneficio de la salud del
              paciente y de su grupo familiar más cercano.
            </p>
            <p>
              No hacerlo a tiempo, puede desencadenar terribles consecuencias,
              las cuales, en ocasiones, podrían ser irreversibles.
            </p>
          </section>

          <section className="guia__section">
            <h2>Importancia de acudir a tratamiento por adicciones</h2>
            <p>
              En nuestra clínica de rehabilitación, contarás con el apoyo y la
              profesionalidad de nuestros especialistas desde el primer día,
              quienes tendrán a su cargo la valiosa labor de estabilizar y{" "}
              <Link to="/tratamiento">desintoxicar</Link> a tu ser querido, con
              el respeto que todo ser humano merece.
            </p>
            <p>
              Y cuando las condiciones de salud de tu familiar adicto lo
              permitan, nuestros terapeutas se encargarán de realizar una
              intervención dentro de la clínica para conseguir su autorización
              para recibir ayuda profesional.
            </p>
            <p>
              ¿El objetivo? Hacer de la rehabilitación para adictos una
              experiencia acogedora y llena de apoyo, guiándoles en todo momento
              en este nuevo comienzo.
            </p>
          </section>

          <section className="guia__cta">
            <h2>¡Transformamos vidas, recuperamos familias!</h2>
            <p>En Clínica SER, la AYUDA está LISTA</p>
            <p>Tu llamada es confidencial y no constituye compromiso alguno</p>
            <p>En Clínica SER, todos los días y a toda hora, la AYUDA está LISTA.</p>
            <div className="guia__cta-btns">
              <a
                href={`tel:${SITE.telefonoTel[0]}`}
                className="guia__btn"
                onClick={() => trackCTAClick("LLAMAR_GUIA_INGRESO")}
              >
                📞 Llamar ahora
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="guia__btn guia__btn--wa"
                onClick={() => trackCTAClick("WA_GUIA_INGRESO")}
              >
                💬 WhatsApp
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="guia__btn"
                onClick={() => trackCTAClick("EMAIL_GUIA_INGRESO")}
              >
                ✉ {SITE.email}
              </a>
            </div>
            <Link to="/guia-intervencion" className="guia__back">
              Ver también: Guía de Intervención →
            </Link>
          </section>
        </div>
      </article>

      <style>{`
        .guia { background: #FFFFFF; }
        /* TODO: imagen del cliente — reemplazar background neutro por foto oficial */
        .guia__hero { position: relative; min-height: 50vh; display: flex; align-items: center; background: linear-gradient(135deg, #1A1A2E 0%, #1B2A4A 100%); }
        .guia__hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,46,.4), rgba(26,26,46,.15)); }
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

export default GuiaIngreso;