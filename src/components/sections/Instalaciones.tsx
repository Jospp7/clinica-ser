import { trackCTAClick } from "@/hooks/useTracking";
import { SITE } from "@/lib/site";
import { Phone } from "lucide-react";

const Instalaciones = () => {
  return (
    <section className="inst-v2">
      <div className="inst-v2__container">
        <div className="inst-v2__grid">
          {/* Left: large photo placeholder */}
          {/* TODO: imagen del cliente */}
          <div className="inst-v2__large inst-v2__placeholder" data-anim="fade-right" aria-hidden="true" />

          {/* Center: two stacked placeholders */}
          <div className="inst-v2__stack" data-anim="fade-up">
            {/* TODO: imagen del cliente */}
            <div className="inst-v2__stack-img inst-v2__placeholder" aria-hidden="true" />
            {/* TODO: imagen del cliente */}
            <div className="inst-v2__stack-img inst-v2__placeholder" aria-hidden="true" />
          </div>

          {/* Right: info panel */}
          <div className="inst-v2__info" data-anim="fade-left">
            <div className="inst-v2__circle-deco" />
            <span className="inst-v2__tag">NUESTRAS INSTALACIONES</span>
            <a href={`tel:${SITE.telefonoTel[0]}`} className="inst-v2__phone-btn" onClick={() => trackCTAClick("LLAMAR_INST_1")}>
              <Phone size={18} aria-hidden="true" /> {SITE.telefonos[0]}
            </a>
            <a href={`tel:${SITE.telefonoTel[1]}`} className="inst-v2__phone-btn" onClick={() => trackCTAClick("LLAMAR_INST_2")}>
              <Phone size={18} aria-hidden="true" /> {SITE.telefonos[1]}
            </a>
            <a href={`tel:${SITE.telefonoTel[2]}`} className="inst-v2__phone-btn" onClick={() => trackCTAClick("LLAMAR_INST_3")}>
              <Phone size={18} aria-hidden="true" /> {SITE.telefonos[2]}
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .inst-v2 { padding: clamp(60px, 8vw, 100px) 24px; background: #F5F5F0; }
        .inst-v2__container { max-width: 1300px; margin: 0 auto; }
        .inst-v2__grid { display: grid; grid-template-columns: 1.2fr 1fr 1fr; gap: 24px; align-items: start; }
        .inst-v2__large { border-radius: 12px; overflow: hidden; }
        .inst-v2__large img { width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 12px; min-height: 500px; }
        .inst-v2__stack { display: flex; flex-direction: column; gap: 24px; }
        .inst-v2__stack-img { border-radius: 12px; overflow: hidden; }
        .inst-v2__stack-img img { width: 100%; height: 240px; object-fit: cover; display: block; border-radius: 12px; }
        .inst-v2__placeholder { background: #E8E8E0; border-radius: 12px; }
        .inst-v2__large.inst-v2__placeholder { min-height: 500px; }
        .inst-v2__stack-img.inst-v2__placeholder { height: 240px; }
        @media (max-width: 900px) {
          .inst-v2__large.inst-v2__placeholder { min-height: 300px; }
          .inst-v2__stack-img.inst-v2__placeholder { height: 180px; }
        }
        .inst-v2__info { display: flex; flex-direction: column; align-items: flex-start; gap: 20px; padding-top: 40px; position: relative; }
        .inst-v2__circle-deco { width: 80px; height: 80px; border-radius: 50%; border: 1px solid rgba(200,230,74,0.3); position: absolute; top: 0; right: 0; }
        .inst-v2__tag { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; color: #888; margin-top: 40px; }
        .inst-v2__phone-btn { display: flex; align-items: center; gap: 10px; background: #1B2A4A; color: white; padding: 16px 28px; border-radius: 60px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; min-width: 240px; }
        .inst-v2__phone-btn:hover { background: #2A3D66; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(27,42,74,0.3); }

        @media (max-width: 900px) {
          .inst-v2__grid { grid-template-columns: 1fr; }
          .inst-v2__large img { min-height: 300px; }
          .inst-v2__stack { flex-direction: row; }
          .inst-v2__stack-img img { height: 180px; }
        }
        @media (max-width: 600px) {
          .inst-v2__stack { flex-direction: column; }
        }
      `}</style>
    </section>
  );
};

export default Instalaciones;
