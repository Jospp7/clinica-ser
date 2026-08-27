import { trackCTAClick } from "@/hooks/useTracking";
import { SITE } from "@/lib/site";

const CTA_IMG = "/images/cta-fondo.jpg";

const CTAFinal = () => {
  return (
    <section className="cta-v2">
      <div className="cta-v2__grid">
        {/* Left: text + testimonial */}
        <div className="cta-v2__left">
          <h2 className="cta-v2__title" data-anim="fade-up">
            Somos expertos<br />recuperando vidas
          </h2>
          {/* TODO: restaurar con testimonios reales del cliente. */}
          <a
            href={`tel:${SITE.telefonoTel[0]}`}
            className="cta-v2__call-btn"
            onClick={() => trackCTAClick("LLAMA_AHORA_CTA")}
          >
            LLAMA AHORA
          </a>
        </div>

        {/* Right: image */}
        <div className="cta-v2__right" data-anim="fade-left">
          <img src={CTA_IMG} alt="Bienestar y recuperación" className="cta-v2__img" loading="lazy" />
        </div>
      </div>

      <style>{`
        .cta-v2 { background: var(--brand-navy); }
        .cta-v2__grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 600px; }
        .cta-v2__left { padding: clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px); display: flex; flex-direction: column; justify-content: center; }
        .cta-v2__title { font-family: 'Source Sans 3', sans-serif; font-size: clamp(32px, 4vw, 52px); font-weight: 800; color: white; margin: 0 0 40px; line-height: 1.1; letter-spacing: -0.02em; }

        .cta-v2__testimonial { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; backdrop-filter: blur(10px); }
        .cta-v2__quote-mark { font-size: 40px; color: var(--brand-gold); line-height: 1; display: block; margin-bottom: 12px; }
        .cta-v2__quote-text { font-family: 'Source Sans 3', sans-serif; font-size: 15px; color: rgba(255,255,255,0.75); line-height: 1.7; font-style: italic; margin: 0 0 20px; }
        .cta-v2__quote-author { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .cta-v2__author-img { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
        .cta-v2__author-name { font-family: 'Source Sans 3', sans-serif; font-size: 14px; font-weight: 700; color: white; display: block; margin-bottom: 2px; }
        .cta-v2__stars { display: flex; gap: 2px; }
        .cta-v2__call-btn { display: inline-block; background: var(--brand-gold); color: var(--brand-navy); padding: 14px 32px; border-radius: 60px; font-family: 'Source Sans 3', sans-serif; font-size: 13px; font-weight: 700; text-decoration: none; transition: all 0.3s; letter-spacing: 0.05em; }
        .cta-v2__call-btn:hover { background: #B8A63F; color: var(--brand-navy); transform: translateY(-2px); }

        .cta-v2__right { overflow: hidden; }
        .cta-v2__img { width: 100%; height: 100%; object-fit: cover; object-position: center center; display: block; }

        @media (max-width: 900px) {
          .cta-v2 { background: var(--brand-navy); position: relative; overflow: hidden; }
          .cta-v2::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,48,87,.25), rgba(0,48,87,.65)); z-index: 1; }
          .cta-v2__grid { grid-template-columns: 1fr; min-height: 92vh; position: relative; z-index: 2; }
          .cta-v2__left { justify-content: flex-end; text-shadow: 0 2px 14px rgba(0,0,0,.45); position: relative; z-index: 2; }
          .cta-v2__right { position: absolute; inset: 0; display: block; z-index: 0; }
          .cta-v2__img { width: 100%; height: 100%; object-fit: cover; object-position: center center; }
        }
      `}</style>
    </section>
  );
};

export default CTAFinal;
