import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { trackCTAClick } from "@/hooks/useTracking";
import logoSer from "@/assets/logo-ser.png";
import { SITE } from "@/lib/site";
import { Phone, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "INICIO", href: "/" },
  { label: "POR QUÉ ELEGIRNOS", href: "/por-que-elegirnos" },
  { label: "PROGRAMAS", href: "/programas" },
  { label: "TRATAMIENTOS", href: "/tratamiento" },
  { label: "INSTALACIONES", href: "/instalaciones" },
  { label: "EQUIPO", href: "/equipo" },
  { label: "GUÍAS", href: "/guias" },
  { label: "BLOG", href: "/blog" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const isActive = (href: string) =>
    href === "/guias"
      ? location.pathname.startsWith("/guia")
      : location.pathname === href;

  return (
    <nav aria-label="Navegación principal" className="nav-ser">
      <div className={`nav-ser__bar ${scrolled ? "nav-ser__bar--scrolled" : ""}`}>
        <Link to="/" aria-label="Clínica SER — Inicio" className="nav-ser__logo">
          <img src={logoSer} alt="Logo Clínica SER" className="nav-ser__logo-img" />
        </Link>

        <ul className="nav-ser__links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link to={link.href} className={`nav-ser__link ${isActive(link.href) ? "nav-ser__link--active" : ""}`}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <div className="nav-ser__right">
          <a href={`tel:${SITE.telefonoTel[0]}`} className="nav-ser__cta" onClick={() => trackCTAClick("LLAMAR_24H")}><Phone size={16} aria-hidden="true" /> Llamar 24h</a>
          <button className="nav-ser__menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div ref={menuRef} className={`nav-ser__dropdown ${menuOpen ? "nav-ser__dropdown--open" : ""}`}>
        <ul className="nav-ser__dropdown-list">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} style={{ animationDelay: menuOpen ? `${i * 0.06}s` : "0s" }}>
              <Link to={link.href} onClick={() => setMenuOpen(false)} className="nav-ser__dropdown-link">{link.label}</Link>
            </li>
          ))}
        </ul>
        <a href={`tel:${SITE.telefonoTel[0]}`} onClick={() => { trackCTAClick("LLAMAR_AHORA_MOBILE"); setMenuOpen(false); }} className="nav-ser__dropdown-cta"><Phone size={16} aria-hidden="true" /> Llamar ahora — 24h</a>
      </div>

      <style>{`
        .nav-ser { position: fixed; top: 0; left: 0; right: 0; z-index: 100; }
         .nav-ser__bar { display: flex; align-items: center; justify-content: space-between; height: 104px; padding: 0 clamp(16px,3vw,48px); background: #FFFFFF; backdrop-filter: blur(24px) saturate(1.4); -webkit-backdrop-filter: blur(24px) saturate(1.4); border-bottom: 1px solid rgba(0, 0, 0, 0.08); box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08); transition: all .3s ease; }
         .nav-ser__bar--scrolled { background: rgba(255, 255, 255, 0.99); box-shadow: 0 4px 24px rgba(0, 0, 0, 0.16); }
         .nav-ser__logo { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; text-decoration: none; flex-shrink: 0; align-self: stretch; margin-left: calc(-1 * clamp(16px,3vw,48px)); background: #FFFFFF; border: none; border-radius: 0; padding: 0 clamp(24px,3vw,56px); box-shadow: none; transition: background .3s ease; }
         
         .nav-ser__logo:hover { background: #FFFFFF; }
         .nav-ser__logo-img { position: relative; z-index: 1; height: 92px; width: auto; display: block; }
         .nav-ser__links { display: flex; gap: 22px; list-style: none; margin: 0; padding: 0; }
         .nav-ser__link { font-family: 'Source Sans 3', sans-serif; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: .08em; color: var(--brand-navy); text-decoration: none; padding: 4px 0; position: relative; transition: color .2s ease; }
         .nav-ser__link:hover, .nav-ser__link--active { color: var(--brand-gold-dark); }
         .nav-ser__link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100%; height: 2px; background: var(--brand-gold); transform: scaleX(0); transform-origin: left; transition: transform .3s ease; }
         .nav-ser__link:hover::after, .nav-ser__link--active::after { transform: scaleX(1); }
         .nav-ser__right { display: flex; align-items: center; gap: 12px; }
         .nav-ser__cta { display: inline-flex; align-items: center; gap: 8px; background: rgba(217,199,86,.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(0,0,0,.08); color: var(--brand-navy); border-radius: 60px; padding: 8px 20px; font-family: 'Source Sans 3', sans-serif; font-size: 12px; font-weight: 600; text-decoration: none; transition: all .3s ease; white-space: nowrap; box-shadow: 0 4px 16px rgba(217,199,86,.2); }
         .nav-ser__cta:hover { background: rgba(184,166,63,.95); color: var(--brand-navy); box-shadow: 0 6px 20px rgba(184,166,63,.35); }
         .nav-ser__menu-btn { display: none; align-items: center; justify-content: center; background: rgba(0,48,87,.06); border: 1px solid rgba(0,48,87,.18); color: var(--brand-navy); border-radius: 8px; padding: 8px 14px; font-size: 16px; cursor: pointer; transition: background .2s ease; }
         .nav-ser__menu-btn:hover { background: rgba(0,48,87,.12); }
 
         .nav-ser__dropdown { position: absolute; top: 100%; left: 0; right: 0; background: #FFFFFF; backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px); padding: 24px; opacity: 0; transform: translateY(-8px); pointer-events: none; transition: opacity .3s ease, transform .3s ease; border-bottom: 1px solid rgba(0,0,0,.08); box-shadow: 0 12px 40px rgba(0,0,0,.16); }
         .nav-ser__dropdown--open { opacity: 1; transform: translateY(0); pointer-events: auto; }
         .nav-ser__dropdown-list { list-style: none; margin: 0 0 16px; padding: 0; display: grid; gap: 4px; }
         .nav-ser__dropdown-list li { opacity: 0; transform: translateY(8px); animation: navDropIn .3s ease forwards; }
         .nav-ser__dropdown--open .nav-ser__dropdown-list li { animation: navDropIn .3s ease forwards; }
         @keyframes navDropIn { to { opacity: 1; transform: translateY(0); } }
         .nav-ser__dropdown-link { display: block; font-family: 'Source Sans 3', sans-serif; font-size: 15px; font-weight: 500; color: var(--brand-navy); text-decoration: none; padding: 12px 16px; border-radius: 8px; transition: background .2s ease, color .2s ease; }
         .nav-ser__dropdown-link:hover { background: rgba(0,48,87,.06); color: var(--brand-gold-dark); }
         .nav-ser__dropdown-cta { display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; text-align: center; background: var(--brand-gold); color: var(--brand-navy); border-radius: 60px; padding: 14px 24px; font-family: 'Source Sans 3', sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; transition: background .2s ease; }
         .nav-ser__dropdown-cta:hover { background: #B8A63F; color: var(--brand-navy); }

         @media (max-width: 900px) {
           .nav-ser__links { display: none; }
           .nav-ser__cta { display: none; }
           .nav-ser__menu-btn { display: inline-flex; }
           .nav-ser__bar { height: 80px; }
           .nav-ser__logo-img { height: 64px; }
           .nav-ser__logo { padding: 0 20px; border-radius: 0; }
         }
        @media (min-width: 901px) { .nav-ser__menu-btn { display: none; } }
      `}</style>
    </nav>
  );
};

export default Navbar;
