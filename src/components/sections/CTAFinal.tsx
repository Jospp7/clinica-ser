import { Star } from "lucide-react";
import { trackCTAClick } from "@/hooks/useTracking";
import { SITE } from "@/lib/site";

const CTA_IMG = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80";

const CTAFinal = () => {
  return (
    <section className="cta-v2">
      <div className="cta-v2__grid">
        {/* Left: text + testimonial */}
        <div className="cta-v2__left">
          <h2 className="cta-v2__title" data-anim="fade-up">
            Somos expertos<br />recuperando vidas
          </h2>

          <div className="cta-v2__testimonial" data-anim="fade-up" data-anim-delay="0.1s">
            <span className="cta-v2__quote-mark">❝</span>
            <p className="cta-v2__quote-text">
              "El equipo no solo trató la adicción, sino que entendió mi historia. Me devolvieron la esperanza y las ganas de vivir."
            </p>
            <div className="cta-v2__quote-author">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80" alt="Violeta J." className="cta-v2__author-img" />
              <div>
                <span className="cta-v2__author-name">Violeta J.</span>
                <div className="cta-v2__stars">
                  {[1,2,3,4,5].map(s => <Star key={s} fill="#D4A843" color="#D4A843" size={14} />)}
                </div>
              </div>
            </div>
            <a href={`tel:${SITE.telefonoTel[0]}`} className="cta-v2__call-btn" onClick={() => trackCTAClick("LLAMA_AHORA_CTA")}>
              LLAMA AHORA
            </a>
          </div>
        </div>

        {/* Right: image */}
        <div className="cta-v2__right" data-anim="fade-left">
          <img src={CTA_IMG} alt="Bienestar y recuperación" className="cta-v2__img" loading="lazy" />
        </div>
      </div>

      <style>{`
        .cta-v2 { background: #1B2A4A; }
        .cta-v2__grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 600px; }
        .cta-v2__left { padding: clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px); display: flex; flex-direction: column; justify-content: center; }
        .cta-v2__title { font-family: 'Inter', sans-serif; font-size: clamp(32px, 4vw, 52px); font-weight: 800; color: white; margin: 0 0 40px; line-height: 1.1; letter-spacing: -0.02em; }

        .cta-v2__testimonial { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; backdrop-filter: blur(10px); }
        .cta-v2__quote-mark { font-size: 40px; color: #C8E64A; line-height: 1; display: block; margin-bottom: 12px; }
        .cta-v2__quote-text { font-family: 'Inter', sans-serif; font-size: 15px; color: rgba(255,255,255,0.75); line-height: 1.7; font-style: italic; margin: 0 0 20px; }
        .cta-v2__quote-author { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .cta-v2__author-img { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
        .cta-v2__author-name { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; color: white; display: block; margin-bottom: 2px; }
        .cta-v2__stars { display: flex; gap: 2px; }
        .cta-v2__call-btn { display: inline-block; background: #C8E64A; color: #1A1A2E; padding: 14px 32px; border-radius: 60px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700; text-decoration: none; transition: all 0.3s; letter-spacing: 0.05em; }
        .cta-v2__call-btn:hover { background: #8AB83A; color: white; transform: translateY(-2px); }

        .cta-v2__right { overflow: hidden; }
        .cta-v2__img { width: 100%; height: 100%; object-fit: cover; display: block; }

        @media (max-width: 900px) {
          .cta-v2__grid { grid-template-columns: 1fr; }
          .cta-v2__right { height: 300px; }
        }
      `}</style>
    </section>
  );
};

export default CTAFinal;
