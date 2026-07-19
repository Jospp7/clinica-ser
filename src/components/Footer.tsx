import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { trackCTAClick } from "@/hooks/useTracking";
import { Facebook, Instagram, Twitter, Linkedin, Star, StarHalf } from "lucide-react";
import { SITE } from "@/lib/site";

const Footer = () => {
  const [footerEmail, setFooterEmail] = useState("");
  const [footerSent, setFooterSent] = useState(false);

  const handleFooterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail.trim()) return;
    trackCTAClick("PREGUNTANOS_FOOTER");
    await supabase.from("contacts").insert({ email: footerEmail, source: "footer" } as any);
    setFooterSent(true);
    setFooterEmail("");
    setTimeout(() => setFooterSent(false), 3000);
  };

  return (
    <footer className="footer-v2">
      {/* Top section - CENADIC certified */}
      {/* TODO: confirmar vigencia de certificación con cliente (CENADIC se disolvió ~2011, hoy es CONADIC) */}
      <div className="footer-v2__top">
        <div className="footer-v2__top-grid">
          <div className="footer-v2__top-col">
            <span className="footer-v2__label">CERTIFICADO</span>
            <h3 className="footer-v2__cenadic">CENADIC</h3>
            <p className="footer-v2__address">
              {SITE.direccion}
            </p>
            <p className="footer-v2__phones">
              <a href={`tel:${SITE.telefonoTel[0]}`} className="footer-v2__link" onClick={() => trackCTAClick("LLAMAR_FOOTER_1")}>{SITE.telefonos[0]}</a><br/>
              <a href={`tel:${SITE.telefonoTel[1]}`} className="footer-v2__link" onClick={() => trackCTAClick("LLAMAR_FOOTER_2")}>{SITE.telefonos[1]}</a><br/>
              <a href={`tel:${SITE.telefonoTel[2]}`} className="footer-v2__link" onClick={() => trackCTAClick("LLAMAR_FOOTER_3")}>{SITE.telefonos[2]}</a>
            </p>
            <p className="footer-v2__email">{SITE.email}</p>
            <div className="footer-v2__socials">
              <a href={SITE.redes.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                 className="footer-v2__social-icon" onClick={() => trackCTAClick("SOCIAL_FACEBOOK")}>
                <Facebook size={18} />
              </a>
              <a href={SITE.redes.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                 className="footer-v2__social-icon" onClick={() => trackCTAClick("SOCIAL_INSTAGRAM")}>
                <Instagram size={18} />
              </a>
              <a href={SITE.redes.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                 className="footer-v2__social-icon" onClick={() => trackCTAClick("SOCIAL_TWITTER")}>
                <Twitter size={18} />
              </a>
              <a href={SITE.redes.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                 className="footer-v2__social-icon" onClick={() => trackCTAClick("SOCIAL_LINKEDIN")}>
                <Linkedin size={18} />
              </a>
              {/* TODO: preguntar al cliente si tienen canal de YouTube (mencionan videos de testimonios en el sitio anterior). */}
            </div>
            <div className="footer-v2__circle-deco" />
            <a
              href={SITE.google.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-v2__stars-row"
              aria-label={`Calificación ${SITE.google.rating} de 5 basada en ${SITE.google.reviewCount} reseñas en Google`}
              onClick={() => trackCTAClick("GOOGLE_REVIEWS")}
              style={{ textDecoration: "none" }}
            >
              {[0, 1, 2, 3].map((i) => (
                <Star key={i} size={16} fill="#C8E64A" color="#C8E64A" />
              ))}
              <StarHalf size={16} fill="#C8E64A" color="#C8E64A" />
              <span className="footer-v2__stars-text">
                {SITE.google.rating} · {SITE.google.reviewCount} reseñas en Google
              </span>
            </a>
          </div>

          <div className="footer-v2__top-col">
            <span className="footer-v2__label">MAPA DEL SITIO</span>
            <div className="footer-v2__sitemap">
              <div>
                <Link to="/" className="footer-v2__sitemap-link">Inicio</Link>
                <Link to="/instalaciones" className="footer-v2__sitemap-link">Instalaciones</Link>
                <Link to="/equipo" className="footer-v2__sitemap-link">Nuestro Equipo</Link>
              </div>
              <div>
                <Link to="/por-que-elegirnos" className="footer-v2__sitemap-link">Por qué elegirnos</Link>
                <Link to="/padecimientos" className="footer-v2__sitemap-link">Padecimientos</Link>
                <Link to="/guia-intervencion" className="footer-v2__sitemap-link">Guía de Intervención</Link>
                <Link to="/guia-ingreso" className="footer-v2__sitemap-link">Guía de Ingreso</Link>
                <Link to="/preguntas-frecuentes" className="footer-v2__sitemap-link">Preguntas Frecuentes</Link>
                {/* TODO: la ruta /aviso-de-privacidad no existe en el repo — pedir contenido al cliente y crear página antes de re-enlazar */}
              </div>
            </div>
          </div>

          <div className="footer-v2__top-col">
            <span className="footer-v2__label">¿TIENES ALGUNA CONSULTA?</span>
            {footerSent ? (
              <p style={{ color: "#C8E64A", fontFamily: "'Inter',sans-serif", fontSize: 14 }}>¡Gracias! Te contactaremos pronto.</p>
            ) : (
              <form onSubmit={handleFooterSubmit} className="footer-v2__form">
                <input
                  value={footerEmail}
                  onChange={e => setFooterEmail(e.target.value)}
                  type="email"
                  placeholder="tu correo electrónico"
                  required
                  className="footer-v2__input"
                />
                <button type="submit" className="footer-v2__submit">PREGÚNTANOS</button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-v2__bottom">
        <div className="footer-v2__bottom-grid">
          <div className="footer-v2__bottom-col">
            <h4 className="footer-v2__bottom-heading">{SITE.nombre}</h4>
            <p className="footer-v2__bottom-text">{SITE.direccion}</p>
            <p className="footer-v2__bottom-text">
              <a href={`tel:${SITE.telefonoTel[0]}`} className="footer-v2__bottom-link">{SITE.telefonos[0]}</a><br/>
              <a href={`tel:${SITE.telefonoTel[1]}`} className="footer-v2__bottom-link">{SITE.telefonos[1]}</a><br/>
              <a href={`tel:${SITE.telefonoTel[2]}`} className="footer-v2__bottom-link">{SITE.telefonos[2]}</a>
            </p>
          </div>
          <div className="footer-v2__bottom-col">
            <h4 className="footer-v2__bottom-heading">Mapa del sitio</h4>
            <Link to="/" className="footer-v2__bottom-link">Inicio</Link>
            <Link to="/por-que-elegirnos" className="footer-v2__bottom-link">Por qué elegirnos</Link>
            <Link to="/instalaciones" className="footer-v2__bottom-link">Instalaciones</Link>
          </div>
          <div className="footer-v2__bottom-col">
            <h4 className="footer-v2__bottom-heading">¿Tienes alguna consulta?</h4>
            <div style={{ display: "flex", gap: 8 }}>
              <input placeholder="Tu email" className="footer-v2__bottom-input" />
              <button className="footer-v2__bottom-btn">PREGÚNTANOS</button>
            </div>
          </div>
        </div>
        <div className="footer-v2__copyright">
          <span>Copyright © 2024 SER Clínica</span>
          <span style={{ display: "flex", gap: 8 }}>
            <Link to="/admin/login" className="footer-v2__bottom-link" style={{ opacity: 0.4, fontSize: 11 }}>🔒 Admin</Link>
          </span>
        </div>
      </div>

      <style>{`
        .footer-v2__top { background: #1B2A4A; padding: 60px 24px 40px; }
        .footer-v2__top-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 48px; }
        .footer-v2__label { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(255,255,255,0.5); display: block; margin-bottom: 16px; }
        .footer-v2__cenadic { font-family: 'Inter', sans-serif; font-size: 24px; font-weight: 800; color: #C8E64A; margin: 0 0 16px; }
        .footer-v2__address { font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.5; margin: 0 0 16px; }
        .footer-v2__phones { font-family: 'Inter', sans-serif; font-size: 14px; margin: 0 0 12px; line-height: 1.8; }
        .footer-v2__email { font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(255,255,255,0.5); margin: 0 0 16px; }
        .footer-v2__link { color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.2s; }
        .footer-v2__link:hover { color: #C8E64A; }
        .footer-v2__socials { display: flex; gap: 10px; margin-bottom: 12px; }
        .footer-v2__social-icon { width: 36px; height: 36px; border-radius: 50%; border: 1px solid #C8E64A; color: #C8E64A; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; cursor: pointer; transition: background 0.2s, color 0.2s; text-decoration: none; }
        .footer-v2__social-icon:hover { background: rgba(200,230,74,0.15); color: #C8E64A; }
        .footer-v2__circle-deco { width: 60px; height: 60px; border-radius: 50%; border: 1px solid rgba(200,230,74,0.2); margin-bottom: 12px; }
        .footer-v2__stars-row { display: flex; align-items: center; gap: 6px; }
        .footer-v2__stars-text { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.5); margin-left: 8px; }
        .footer-v2__sitemap { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 40px; }
        .footer-v2__sitemap-link { display: block; font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(255,255,255,0.7); text-decoration: none; padding: 6px 0; transition: color 0.2s; }
        .footer-v2__sitemap-link:hover { color: #C8E64A; }
        .footer-v2__form { display: flex; flex-direction: column; gap: 12px; }
        .footer-v2__input { padding: 12px 16px; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; background: rgba(255,255,255,0.05); color: white; font-family: 'Inter', sans-serif; font-size: 14px; }
        .footer-v2__input::placeholder { color: rgba(255,255,255,0.4); }
        .footer-v2__submit { padding: 14px 24px; background: #C8E64A; color: #1A1A2E; border: none; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; letter-spacing: 0.08em; transition: background 0.2s; }
        .footer-v2__submit:hover { background: #8AB83A; color: white; }

        .footer-v2__bottom { background: #141E33; padding: 40px 24px 20px; }
        .footer-v2__bottom-grid { max-width: 1200px; margin: 0 auto 24px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; }
        .footer-v2__bottom-heading { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; color: white; margin: 0 0 12px; }
        .footer-v2__bottom-text { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.4); margin: 0 0 4px; line-height: 1.5; }
        .footer-v2__bottom-link { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.4); text-decoration: none; display: block; padding: 2px 0; transition: color 0.2s; }
        .footer-v2__bottom-link:hover { color: #C8E64A; }
        .footer-v2__bottom-input { flex: 1; padding: 8px 12px; border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; background: rgba(255,255,255,0.05); color: white; font-size: 12px; font-family: 'Inter', sans-serif; }
        .footer-v2__bottom-btn { padding: 8px 14px; background: #C8E64A; color: #1A1A2E; border: none; border-radius: 6px; font-size: 11px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; }
        .footer-v2__copyright { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px; font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.35); }

        @media (max-width: 900px) {
          .footer-v2__top-grid, .footer-v2__bottom-grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
