import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { trackCTAClick } from "@/hooks/useTracking";

const Footer = () => {
  const [footerEmail, setFooterEmail] = useState("");
  const [footerSent, setFooterSent] = useState(false);

  const handleFooterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail.trim()) return;
    trackCTAClick("PREGUNTANOS_FOOTER");
    await supabase.from("contacts").insert({ email: footerEmail, source: "footer" });
    setFooterSent(true);
    setFooterEmail("");
    setTimeout(() => setFooterSent(false), 3000);
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__col">
          <h4 className="site-footer__heading">Clínica SER</h4>
          <p className="site-footer__text">Tepeyahualco 39, Col. La Paz, Puebla, Pue. 72160</p>
          <p className="site-footer__text">
            <a href="tel:+522226884386" className="site-footer__link" onClick={() => trackCTAClick("LLAMAR_FOOTER_1")}>+52 (222) 688-4386</a><br/>
            <a href="tel:+522222570258" className="site-footer__link" onClick={() => trackCTAClick("LLAMAR_FOOTER_2")}>+52 (222) 257-0258</a>
          </p>
        </div>
        <div className="site-footer__col">
          <h4 className="site-footer__heading">Mapa del sitio</h4>
          <a href="/" className="site-footer__link">Inicio</a>
          <a href="/por-que-elegirnos" className="site-footer__link">Por qué elegirnos</a>
          <a href="/instalaciones" className="site-footer__link">Instalaciones</a>
          <a href="/padecimientos" className="site-footer__link">Padecimientos</a>
          <a href="/blog" className="site-footer__link">Blog</a>
        </div>
        <div className="site-footer__col">
          <h4 className="site-footer__heading">¿Tienes alguna consulta?</h4>
          {footerSent ? (
            <p className="site-footer__text" style={{ color: "#C8E64A" }}>¡Gracias! Te contactaremos pronto.</p>
          ) : (
            <form onSubmit={handleFooterSubmit} style={{ display: "flex", gap: 8 }}>
              <input value={footerEmail} onChange={e => setFooterEmail(e.target.value)} type="email" placeholder="Tu email" required
                style={{ flex: 1, padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(255,255,255,.2)", background: "rgba(255,255,255,.1)", color: "white", fontSize: 13, fontFamily: "'Inter',sans-serif" }} />
              <button type="submit" style={{ padding: "8px 16px", background: "#C8E64A", color: "#1A1A2E", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>PREGÚNTANOS</button>
            </form>
          )}
        </div>
      </div>
      <div className="site-footer__inner">
        <span>Copyright © 2024 SER Clínica</span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href="/admin/login" className="site-footer__link" style={{ opacity: 0.4, fontSize: 11 }}>🔒 Admin</a>
          {" | "}
          <a href="#" className="site-footer__link">Terms of Use</a>
          {" | "}
          <a href="#" className="site-footer__link">Privacy Policy</a>
        </span>
      </div>
      <style>{`
        .site-footer { background: #1A1A2E; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-top: 1px solid rgba(255, 255, 255, 0.10); padding: 48px 24px 20px; }
        .site-footer__main { max-width: 1200px; margin: 0 auto 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px; }
        .site-footer__col { display: flex; flex-direction: column; gap: 6px; }
        .site-footer__heading { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; color: white; margin: 0 0 8px; }
        .site-footer__text { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,.5); margin: 0; line-height: 1.5; }
        .site-footer__inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,.5); border-top: 1px solid rgba(255,255,255,.1); padding-top: 20px; }
        .site-footer__link { color: rgba(255,255,255,.5); text-decoration: none; transition: color .2s ease; font-family: 'Inter', sans-serif; font-size: 12px; }
        .site-footer__link:hover { color: #C8E64A; }
      `}</style>
    </footer>
  );
};

export default Footer;
