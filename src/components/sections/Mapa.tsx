const Mapa = () => {
  return (
    <section className="map-sec" data-anim="fade-up">
      <div className="map-sec__info">
        <h3 className="map-sec__title">Encuéntranos en Puebla</h3>
        <p className="map-sec__text">Tepeyahualco 39, Col. La Paz, Puebla, Pue. 72160</p>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.3980424538827!2d-98.22598372401673!3d19.04618255290637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc6c4cb21adcb%3A0xc3b44b8ddb22b10a!2sTepeyahualco%2039%2C%20La%20Paz%2C%2072160%20Heroica%20Puebla%20de%20Zaragoza%2C%20Pue.!5e0!3m2!1ses-419!2smx!4v1709664532135!5m2!1ses-419!2smx"
        width="100%"
        height="400"
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa ubicación Clínica SER"
      />
      <style>{`
        .map-sec { position: relative; background: #E8E8E8; }
        .map-sec__info { position: absolute; top: 24px; left: 24px; background: white; padding: 24px; border-radius: 12px; z-index: 10; box-shadow: 0 4px 20px rgba(0,0,0,0.1); max-width: 300px; }
        .map-sec__title { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 700; color: #1A1A2E; margin: 0 0 8px; }
        .map-sec__text { font-family: 'Inter', sans-serif; font-size: 13px; color: #555; margin: 0; }
        @media (max-width: 600px) { .map-sec__info { display: none; } }
      `}</style>
    </section>
  );
};

export default Mapa;
