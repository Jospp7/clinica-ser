import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { trackCTAClick, trackFormSubmit } from "@/hooks/useTracking";
import { Facebook, Instagram, Music2, Star, StarHalf, Lock, MessageCircle } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

const Footer = () => {
  const [footerEmail, setFooterEmail] = useState("");
  const [footerSent, setFooterSent] = useState(false);

  const handleFooterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail.trim()) return;
    trackCTAClick("SOLICITAR_CONTACTO_FOOTER");
    const { error } = await supabase.from("contacts").insert({ email: footerEmail, source: "footer", status: "nuevo" });
    if (error) {
      console.error("[Footer] newsletter insert failed:", error);
      alert(`No pudimos registrar tu correo. Por favor llámanos al ${SITE.telefonos[0]} o escríbenos por WhatsApp.`);
      return;
    }
    setFooterSent(true);
    trackFormSubmit("footer");
    setFooterEmail("");
    setTimeout(() => setFooterSent(false), 3000);
  };

  return (
    <footer className="footer-v2">
      {/* Top section - CENADIC certified */}
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
              <a href={`tel:${SITE.telefonoTel[1]}`} className="footer-v2__link" onClick={() => trackCTAClick("LLAMAR_FOOTER_2")}>{SITE.telefonos[1]} (emergencias 24 h)</a><br/>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-v2__link"
                onClick={() => trackCTAClick("WHATSAPP_FOOTER")}
                title={`WhatsApp · ${SITE.whatsappHorario}`}
                aria-label={`WhatsApp · ${SITE.whatsappHorario}`}
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                <MessageCircle size={14} aria-hidden="true" /> WhatsApp <span style={{ color: "rgba(255,255,255,0.85)" }}>({SITE.whatsappHorario})</span>
              </a>
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
              {/* TODO: reemplazar por ícono oficial de TikTok */}
              {SITE.redes.tiktok && (
                <a href={SITE.redes.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                   className="footer-v2__social-icon" onClick={() => trackCTAClick("SOCIAL_TIKTOK")}>
                  <Music2 size={18} />
                </a>
              )}
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
                <Star key={i} size={16} fill="#F5A623" color="#F5A623" />
              ))}
              <StarHalf size={16} fill="#F5A623" color="#F5A623" />
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
                <Link to="/programas" className="footer-v2__sitemap-link">Programas</Link>
                <Link to="/guias" className="footer-v2__sitemap-link">Guías</Link>
                <Link to="/guia-intervencion" className="footer-v2__sitemap-link">Guía de Intervención</Link>
                <Link to="/guia-ingreso" className="footer-v2__sitemap-link">Guía de Ingreso</Link>
                <Link to="/preguntas-frecuentes" className="footer-v2__sitemap-link">Preguntas Frecuentes</Link>
              </div>
            </div>
          </div>

          <div className="footer-v2__top-col">
            <span className="footer-v2__label">¿TIENES ALGUNA CONSULTA?</span>
            {footerSent ? (
              <p style={{ color: "var(--brand-gold)", fontFamily: "'Source Sans 3',sans-serif", fontSize: 14 }}>¡Gracias! Te contactaremos pronto.</p>
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
                <button type="submit" className="footer-v2__submit">SOLICITAR CONTACTO</button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-v2__copyright">
        <span>© {new Date().getFullYear()} {SITE.nombre}. Todos los derechos reservados.</span>
        <span style={{ display: "flex", gap: 8 }}>
          <Link to="/admin/login" className="footer-v2__admin-link"><Lock size={12} aria-hidden="true" /> Admin</Link>
        </span>
      </div>

      <style>{`
        .footer-v2 { background: var(--brand-navy); }
        .footer-v2__top { padding: 60px 24px 40px; }

        .footer-v2__top-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 48px; }
        .footer-v2__label { font-family: 'Source Sans 3', sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(255,255,255,0.5); display: block; margin-bottom: 16px; }
        .footer-v2__cenadic { font-family: 'Source Sans 3', sans-serif; font-size: 24px; font-weight: 800; color: var(--brand-gold); margin: 0 0 16px; }
        .footer-v2__address { font-family: 'Source Sans 3', sans-serif; font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.5; margin: 0 0 16px; }
        .footer-v2__phones { font-family: 'Source Sans 3', sans-serif; font-size: 14px; margin: 0 0 12px; line-height: 1.8; }
        .footer-v2__email { font-family: 'Source Sans 3', sans-serif; font-size: 13px; color: rgba(255,255,255,0.5); margin: 0 0 16px; }
        .footer-v2__link { color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.2s; }
        .footer-v2__link:hover { color: var(--brand-gold); }
        .footer-v2__socials { display: flex; gap: 10px; margin-bottom: 12px; }
        .footer-v2__social-icon { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--brand-gold); color: var(--brand-gold); display: inline-flex; align-items: center; justify-content: center; font-size: 14px; cursor: pointer; transition: background 0.2s, color 0.2s; text-decoration: none; }
        .footer-v2__social-icon:hover { background: rgba(217,199,86,0.15); color: var(--brand-gold); }
        .footer-v2__circle-deco { width: 60px; height: 60px; border-radius: 50%; border: 1px solid rgba(217,199,86,0.2); margin-bottom: 12px; }
        .footer-v2__stars-row { display: flex; align-items: center; gap: 6px; }
        .footer-v2__stars-text { font-family: 'Source Sans 3', sans-serif; font-size: 12px; color: rgba(255,255,255,0.5); margin-left: 8px; }
        .footer-v2__sitemap { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 40px; }
        .footer-v2__sitemap-link { display: block; font-family: 'Source Sans 3', sans-serif; font-size: 14px; color: rgba(255,255,255,0.7); text-decoration: none; padding: 6px 0; transition: color 0.2s; }
        .footer-v2__sitemap-link:hover { color: var(--brand-gold); }
        .footer-v2__form { display: flex; flex-direction: column; gap: 12px; }
        .footer-v2__input { padding: 12px 16px; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; background: rgba(255,255,255,0.05); color: white; font-family: 'Source Sans 3', sans-serif; font-size: 14px; }
        .footer-v2__input::placeholder { color: rgba(255,255,255,0.4); }
        .footer-v2__submit { padding: 14px 24px; background: var(--brand-gold); color: var(--brand-navy); border: none; border-radius: 8px; font-family: 'Source Sans 3', sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; letter-spacing: 0.08em; transition: background 0.2s; }
        .footer-v2__submit:hover { background: #B8A63F; color: var(--brand-navy); }

        .footer-v2__copyright { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.08); padding: 24px; font-family: 'Source Sans 3', sans-serif; font-size: 12px; color: rgba(255,255,255,0.55); }
        .footer-v2__admin-link { font-family: 'Source Sans 3', sans-serif; color: rgba(255,255,255,0.4); text-decoration: none; opacity: 0.4; font-size: 11px; display: inline-flex; align-items: center; gap: 6px; transition: color 0.2s; }
        .footer-v2__admin-link:hover { color: var(--brand-gold); }

        @media (max-width: 900px) {
          .footer-v2__top-grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
