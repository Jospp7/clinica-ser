import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { trackCTAClick } from "@/hooks/useTracking";
import { SITE, waLink } from "@/lib/site";

const GuiaIntervencion = () => {
  useScrollToTop();

  return (
    <main>
      <Seo
        title="Guía de Intervención — Clínica SER"
        description="Guía para familias sobre cómo llevar a cabo una intervención cuando un ser querido sufre una adicción y se niega a recibir ayuda."
        path="/guia-intervencion"
      />

      <article className="guia">
        <header className="guia__hero">
          <div className="guia__hero-overlay" />
          <div className="guia__hero-content">
            <span className="guia__tag">GUÍA PARA FAMILIAS</span>
            <h1 className="guia__title">Guía de Intervención</h1>
            <p className="guia__lead">
              En Clínica SER® sabemos que la persona que sufre por una adicción no
              tiene conciencia de la enfermedad. La negación, excusas, pretextos,
              chantajes o promesas de que por sí mismo podrá dejarla son comunes y
              se presentan en la mayoría de los casos. Esto lleva a la familia a
              entrar en desesperación y vivir caos, miedo y desolación.
            </p>
            {/* TODO: subir el PDF a /public y habilitar el CTA "Versión Descargable" */}
          </div>
        </header>

        <div className="guia__body">
          <section className="guia__section">
            <h2>¿Qué puedo hacer?</h2>
            <p>
              Las familias pueden ayudar a que las cosas mejoren. La familia y
              amigos no pueden detener la dependencia química o las apuestas, pero
              pueden tener un impacto muy positivo en el problema y en la decisión
              de la persona de aceptar la ayuda. Habla con la persona, formal o
              informalmente. A esto se le llama «intervención».
            </p>
            <p>
              No esperes a que la persona querida llegue al «fondo», tenga un
              accidente o desarrolle un problema serio de salud antes de hacer
              frente al problema. Recuerda, existe una solución: la
              rehabilitación.
            </p>
          </section>

          <section className="guia__section">
            <h2>Guía para ayudar a tu ser querido</h2>
            <p>
              El objetivo principal de una intervención es lograr que la persona
              que sufre una o varias adicciones acepte recibir ayuda profesional.
            </p>
          </section>

          <section className="guia__section">
            <h2>Cómo llevar a cabo una intervención</h2>
            <p>
              La intervención consiste en reunir a un grupo de personas para
              exponerle a quien sufre una adicción cómo su consumo ha afectado su
              vida y la de quienes lo rodean. Este método se utiliza cuando la
              persona ha rechazado repetidamente la ayuda.
            </p>
            <p>
              Reúnanse para hablar con la persona de tres a ocho miembros de la
              familia que tengan relación directa con él o ella. Incluyan a
              alguien que tenga trascendencia e influencia (madre, padre, esposa,
              hijos, etc.). A veces se invita a participar a una persona ajena a
              la familia que se considere que pueda servir de apoyo.
            </p>
            <p>
              No se recomienda la presencia de personas que sean alcohólicas o
              drogadictas activas. Es posible la presencia de personas
              rehabilitadas o limpias. Es importante escoger un momento en el que
              la persona querida no esté tomada o drogada (y cuando tú no estés
              muy disgustado). Un día propicio puede ser cuando la persona se
              encuentra en la llamada «cruda» o «resaca», ya que presentará una
              mayor disposición.
            </p>

            <h3>Algunas sugerencias:</h3>
            <ul>
              <li>Hablen cuando la persona esté sobria.</li>
              <li>Mantengan la calma.</li>
              <li>Expresen sus comentarios con preocupación.</li>
              <li>
                Hablen en primera persona: expliquen cómo la conducta de la
                persona les ha afectado. Ejemplos: «Si estás tomado y conduces, yo
                no puedo dormir en toda la noche»; «A mí me preocupa tu estado de
                salud»; «Yo estoy muy preocupado porque…».
              </li>
              <li>Hablen abierta y honestamente con la persona sobre el problema.</li>
              <li>Eviten clasificar a la persona como un «alcohólico» o «drogadicto».</li>
              <li>Apéguense a los hechos y no juzguen.</li>
              <li>Hablen de sus propios sentimientos, pero no traten de infligir culpa.</li>
              <li>No regañen o recriminen.</li>
              <li>No moralicen, calificando a la persona de malo, ruin, desconsiderado, etc.</li>
              <li>Citen incidentes específicos que han resultado de la conducta de la persona adicta.</li>
              <li>Limítense a decir lo que han visto, no lo que han oído.</li>
              <li>No se «enganchen» en discusiones.</li>
            </ul>

            <p>
              Hablen sobre lo que harán para ayudarlo y apoyarlo, y también de lo
              que ya no harán para que el problema continúe, como seguirle dando o
              prestando dinero para la adicción o para cubrir las deudas causadas
              por ella. De lo contrario, es sólo comprar el próximo trago, droga o
              apuesta. Incluyan la puesta de límites y consecuencias si la
              persona se niega a entrar en un tratamiento.
            </p>
            <ul>
              <li>Prepárense para oír negación, resentimiento, chantajes y excusas.</li>
              <li>Ofrezcan apoyo y sean optimistas cuando se trate de cambios.</li>
              <li>Mantengan firmeza y pidan a la persona que acepte la ayuda y reciba un tratamiento.</li>
            </ul>

            <h3>Consejos adicionales:</h3>
            <ul>
              <li>
                Habla abierta y honestamente con otros miembros de la familia
                sobre el problema, para que todo el mundo tenga la misma postura.
              </li>
              <li>
                Previo a la intervención, pide a las personas que estarán
                presentes que escriban cartas manifestando sus sentimientos de
                preocupación de forma afectuosa, haciendo énfasis en cómo el
                alcoholismo o drogadicción de la persona los ha afectado, sin
                recriminar. Incluyan la puesta de límites y consecuencias si se
                niega al tratamiento. Al finalizar deben pedir que acepte la
                ayuda. Las cartas deben ser leídas durante la intervención por
                quien las escriba.
              </li>
              <li>
                Mantengan la presión para lograr que la persona acuda a un centro
                de rehabilitación.
              </li>
            </ul>
          </section>

          <section className="guia__section">
            <h2>No pudimos lograr el convencimiento, ¿qué debemos hacer?</h2>
            <p>Llámanos. Tu llamada es confidencial y no constituye compromiso alguno.</p>
            <p>
              <a
                href={`tel:${SITE.telefonoTel[0]}`}
                onClick={() => trackCTAClick("LLAMAR_GUIA_INTERVENCION_1")}
              >
                {SITE.telefonos[0]}
              </a>
              {" · "}
              <a
                href={`tel:${SITE.telefonoTel[1]}`}
                onClick={() => trackCTAClick("LLAMAR_GUIA_INTERVENCION_2")}
              >
                {SITE.telefonos[1]}
              </a>
              {" · "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
            {/* TODO: el sitio original lista además un 800 sin costo y 3 líneas más pendientes de confirmar con el cliente. No agregar hasta confirmar. */}
            <p>
              O acude directamente a Clínica SER®: {SITE.direccion}. A un costado
              de la Secretaría de Comunicaciones y Transportes.
            </p>
            <p>
              En Clínica SER® uno de nuestros especialistas les orientará y
              ayudará para conseguir una adecuada intervención, y lograr que su
              familiar o amigo acepte la ayuda profesional que necesita.
            </p>
            {/* TODO: confirmar con el cliente si sigue vigente la referencia a "Lic. Marisol García" y sus horarios de atención antes de publicar un nombre propio. */}
          </section>

          <section className="guia__cta">
            <h2>En Clínica SER® todos los días, a toda hora, la ayuda está lista.</h2>
            <div className="guia__cta-btns">
              <a
                href={`tel:${SITE.telefonoTel[0]}`}
                className="guia__btn"
                onClick={() => trackCTAClick("LLAMAR_GUIA_INTERVENCION_CTA")}
              >
                📞 Llamar ahora
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="guia__btn guia__btn--wa"
                onClick={() => trackCTAClick("WA_GUIA_INTERVENCION")}
              >
                💬 WhatsApp
              </a>
            </div>
            <Link to="/blog/guia-ingreso-involuntario" className="guia__back">
              → Guía de Ingreso
            </Link>
          </section>
        </div>
      </article>

      <style>{`
        .guia { background: #FFFFFF; }
        .guia__hero { position: relative; min-height: 50vh; display: flex; align-items: center; background: #1A1A2E; }
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
        .guia__section a { color: #1B2A4A; text-decoration: underline; }
        .guia__section ul, .guia__section ol { padding-left: 22px; }
        .guia__section li { margin-bottom: 10px; }

        .guia__cta { background: #F5F5F0; padding: 40px; border-radius: 16px; text-align: center; margin-top: 60px; }
        .guia__cta h2 { font-size: 24px; font-weight: 700; color: #1A1A2E; margin: 0 0 20px; }
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

export default GuiaIntervencion;