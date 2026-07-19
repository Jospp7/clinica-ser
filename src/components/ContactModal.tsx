import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { X, CheckCircle2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  source: string;
}

const ContactModal = ({ open, onClose, source }: Props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await supabase.from("contacts").insert({ name: name || null, phone: phone || null, email: email || null, message: message || null, source });
    setSending(false);
    setSent(true);
    setTimeout(() => { onClose(); setSent(false); setName(""); setPhone(""); setEmail(""); setMessage(""); }, 2000);
  };

  const inputStyle = { width: "100%", padding: "10px 14px", border: "1px solid #E8E8E8", borderRadius: 8, fontSize: 14, boxSizing: "border-box" as const, fontFamily: "'Inter',sans-serif" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0, 0, 10, 0.55)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 24 }}>
      <div style={{ background: "rgba(255, 255, 255, 0.92)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.40)", boxShadow: "0 24px 64px rgba(0,0,0,0.30)", borderRadius: 16, padding: 32, maxWidth: 440, width: "100%", position: "relative", fontFamily: "'Inter',sans-serif" }}>
        <button onClick={onClose} aria-label="Cerrar" style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "#888", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 0 }}><X size={20} /></button>
        {sent ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ marginBottom: 16, display: "flex", justifyContent: "center", color: "#8AB83A" }}><CheckCircle2 size={48} aria-hidden="true" /></div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1A1A2E" }}>¡Gracias!</h3>
            <p style={{ color: "#888", fontSize: 14 }}>Te contactaremos pronto.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1A1A2E", marginBottom: 4 }}>Contáctanos</h3>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 20 }}>Completa tus datos y nos comunicaremos contigo.</p>
            <div style={{ marginBottom: 12 }}>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre" style={inputStyle} required />
            </div>
            <div style={{ marginBottom: 12 }}>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Teléfono" type="tel" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="¿Cómo podemos ayudarte?" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <button type="submit" disabled={sending}
              style={{ width: "100%", padding: "12px", background: "#C8E64A", color: "#1A1A2E", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              {sending ? "Enviando..." : "Enviar"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
