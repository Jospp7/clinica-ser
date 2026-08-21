import { Phone, MessageCircle } from "lucide-react";
import { SITE, waLink } from "@/lib/site";
import { trackCTAClick } from "@/hooks/useTracking";

type Props = {
  /** Etiqueta de tracking: se envía como CONTACTO_CTA_${ubicacion} */
  ubicacion: string;
  variant?: "azul" | "claro";
  texto?: string;
};

const ContactoCTA = ({
  ubicacion,
  variant = "azul",
  texto = "¿Necesitas ayuda? Estamos disponibles las 24 horas.",
}: Props) => {
  const label = `CONTACTO_CTA_${ubicacion}`;

  return (
    <aside className={`ccta ccta--${variant}`}>
      <div className="ccta__inner">
        <p className="ccta__text">{texto}</p>
        <div className="ccta__actions">
          <a
            className="ccta__btn ccta__btn--call"
            href={`tel:${SITE.telefonoTel[1]}`}
            onClick={() => trackCTAClick(`${label}_LLAMAR`)}
          >
            <Phone size={18} aria-hidden="true" />
            Llamar ahora
          </a>
          <a
            className="ccta__btn ccta__btn--wa"
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick(`${label}_WHATSAPP`)}
          >
            <MessageCircle size={18} aria-hidden="true" />
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>

      <style>{`
        .ccta {
          padding: clamp(22px,3vw,32px) 24px;
          /* Full-bleed: se extiende de borde a borde aunque esté dentro de un contenedor */
          width: 100vw;
          max-width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          /* Margen para que no toque los elementos vecinos */
          margin-top: clamp(40px,6vw,72px);
          margin-bottom: clamp(40px,6vw,72px);
          box-sizing: border-box;
        }
        .ccta--azul { background: #003057; }
        .ccta--claro { background: #F2F6E0; border-top: 1px solid #E4E9CE; border-bottom: 1px solid #E4E9CE; }
        .ccta__inner { max-width: 980px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
        .ccta__text { font-family: 'Source Sans 3', sans-serif; font-size: clamp(16px,2vw,19px); font-weight: 600; margin: 0; }
        .ccta--azul .ccta__text { color: #FFFFFF; }
        .ccta--claro .ccta__text { color: #003057; }
        .ccta__actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .ccta__btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 22px; border-radius: 999px; font-family: 'Source Sans 3', sans-serif; font-size: 15px; font-weight: 700; text-decoration: none; transition: transform .2s ease, box-shadow .2s ease, opacity .2s ease; }
        .ccta__btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,.18); }
        .ccta__btn--call { background: #D9C756; color: #003057; }
        .ccta--claro .ccta__btn--call { background: #003057; color: #FFFFFF; }
        .ccta__btn--wa { background: #25D366; color: #073B22; }
        @media (max-width: 640px) {
          .ccta__inner { flex-direction: column; align-items: stretch; text-align: center; }
          .ccta__actions { flex-direction: column; }
          .ccta__btn { width: 100%; }
        }
      `}</style>
    </aside>
  );
};

export default ContactoCTA;
