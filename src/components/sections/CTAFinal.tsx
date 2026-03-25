import { useState } from "react";
import ContactModal from "../ContactModal";

const CTAFinal = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="cta-fin">
      <div className="cta-fin__inner" data-anim="fade-up">
        <h2 className="cta-fin__title">¿Listo para dar el primer paso?</h2>
        <p className="cta-fin__sub">Nuestros consejeros están disponibles 24/7 para orientarte sin compromiso.</p>
        <button onClick={() => setOpen(true)} className="cta-fin__btn">SOLICITAR INFORMACIÓN</button>
      </div>
      <ContactModal open={open} onClose={() => setOpen(false)} source="cta_final" />

      <style>{`
        .cta-fin { padding: clamp(80px, 10vw, 120px) 24px; background: #C8E64A; text-align: center; }
        .cta-fin__inner { max-width: 600px; margin: 0 auto; }
        .cta-fin__title { font-family: 'Inter', sans-serif; font-size: clamp(28px, 4vw, 44px); font-weight: 800; color: #1A1A2E; margin: 0 0 16px; letter-spacing: -0.02em; }
        .cta-fin__sub { font-family: 'Inter', sans-serif; font-size: 16px; color: rgba(26,26,46,0.8); margin: 0 0 32px; }
        .cta-fin__btn { background: #1A1A2E; color: white; border: none; padding: 18px 40px; border-radius: 60px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; transition: transform 0.2s, background 0.2s; }
        .cta-fin__btn:hover { transform: translateY(-2px); background: #2A2A4E; }
      `}</style>
    </section>
  );
};

export default CTAFinal;
