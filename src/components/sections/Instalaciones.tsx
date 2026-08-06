import { trackCTAClick } from "@/hooks/useTracking";
import { SITE } from "@/lib/site";
import { Phone } from "lucide-react";
import InstalacionesCarrusel from "@/components/InstalacionesCarrusel";

const Instalaciones = () => {
  return (
    <section className="inst-v2">
      <div className="inst-v2__container">
        <h2 className="inst-v2__title" data-anim="fade-left">NUESTRAS INSTALACIONES</h2>

        <div className="inst-v2__carrusel" data-anim="fade-right">
          <InstalacionesCarrusel />
        </div>

        <div className="inst-v2__phones" data-anim="fade-left">
          <a href={`tel:${SITE.telefonoTel[0]}`} className="inst-v2__phone-btn" onClick={() => trackCTAClick("LLAMAR_INST_1")}>
            <Phone size={18} aria-hidden="true" /> {SITE.telefonos[0]}
          </a>
          <a href={`tel:${SITE.telefonoTel[1]}`} className="inst-v2__phone-btn" onClick={() => trackCTAClick("LLAMAR_INST_2")}>
            <Phone size={18} aria-hidden="true" /> {SITE.telefonos[1]}
          </a>
        </div>
      </div>

      <style>{`
        .inst-v2 { padding: clamp(60px, 8vw, 100px) 24px; background: #F5F5F0; }
        .inst-v2__container { max-width: 1300px; margin: 0 auto; }
          .inst-v2__title { font-family: 'Source Sans 3', sans-serif; font-size: clamp(2.5rem, 4.5vw, 4.6rem); line-height: 0.95; font-weight: 800; text-transform: uppercase; letter-spacing: 0; text-align: center; color: var(--brand-navy); margin: 0 auto clamp(28px, 4vw, 48px); max-width: 100%; }
         .inst-v2__carrusel { min-width: 0; }
         .inst-v2__phones { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; margin-top: clamp(24px, 3vw, 36px); }
         .inst-v2__phone-btn { display: flex; align-items: center; gap: 10px; background: var(--brand-gold); color: var(--brand-navy); padding: 16px 28px; border-radius: 60px; font-family: 'Source Sans 3', sans-serif; font-size: 15px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; min-width: 240px; }
         .inst-v2__phone-btn:hover { background: var(--brand-gold-dark); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(27,42,74,0.3); }
         @media (max-width: 600px) {
           .inst-v2__phones { align-items: stretch; flex-direction: column; }
           .inst-v2__phone-btn { justify-content: center; min-width: 0; }
         }
      `}</style>
    </section>
  );
};

export default Instalaciones;
