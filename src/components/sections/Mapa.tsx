import { trackCTAClick } from "@/hooks/useTracking";

const Mapa = () => {
  return (
    <section className="map-v2" data-anim="fade-up">
      <a href="https://maps.google.com/?q=Tepeyahualco+39+La+Paz+Puebla" target="_blank" rel="noopener noreferrer" className="map-v2__open-link">
        Abrir en Maps ↗
      </a>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.3980424538827!2d-98.22598372401673!3d19.04618255290637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc6c4cb21adcb%3A0xc3b44b8ddb22b10a!2sTepeyahualco%2039%2C%20La%20Paz%2C%2072160%20Heroica%20Puebla%20de%20Zaragoza%2C%20Pue.!5e0!3m2!1ses-419!2smx!4v1709664532135!5m2!1ses-419!2smx"
        width="100%"
        height="450"
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa ubicación Clínica SER"
      />

      <div className="map-v2__overlay-bar">
        <span className="map-v2__overlay-text">SIEMPRE A TU SERVICIO</span>
        <a href="https://maps.google.com/?q=Tepeyahualco+39+La+Paz+Puebla" target="_blank" rel="noopener noreferrer" className="map-v2__visit-btn" onClick={() => trackCTAClick("VISITANOS_MAPA")}>
          VISÍTANOS
        </a>
      </div>

      <style>{`
        .map-v2 { position: relative; background: #E8E8E8; }
        .map-v2__open-link { position: absolute; top: 24px; left: 24px; z-index: 10; background: white; padding: 10px 20px; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; color: #1B2A4A; text-decoration: none; box-shadow: 0 4px 16px rgba(0,0,0,0.1); transition: background 0.2s; }
        .map-v2__open-link:hover { background: #F5F5F0; }
        .map-v2__overlay-bar { position: absolute; bottom: 40px; left: 40px; background: rgba(26,26,46,0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); padding: 20px 32px; border-radius: 16px; display: flex; align-items: center; gap: 24px; z-index: 10; }
        .map-v2__overlay-text { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; color: white; letter-spacing: 0.08em; text-transform: uppercase; }
        .map-v2__visit-btn { background: #C8E64A; color: #1A1A2E; padding: 12px 28px; border-radius: 60px; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 700; text-decoration: none; letter-spacing: 0.05em; transition: all 0.3s; }
        .map-v2__visit-btn:hover { background: #8AB83A; color: white; }

        @media (max-width: 600px) {
          .map-v2__overlay-bar { left: 16px; right: 16px; bottom: 16px; flex-direction: column; gap: 12px; padding: 16px 20px; }
        }
      `}</style>
    </section>
  );
};

export default Mapa;
