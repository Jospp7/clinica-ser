import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { X } from "lucide-react";

const statusColor: Record<string, string> = { nuevo: "#3B82F6", contactado: "#F59E0B", cerrado: "#22C55E" };

const Contacts = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    let q = supabase.from("contacts").select("*").order("created_at", { ascending: false });
    if (filter) q = q.eq("status", filter);
    const { data, error } = await q;
    if (error) console.error("[Contacts] load failed:", error);
    setContacts(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("contacts").update({ status }).eq("id", id);
    if (error) {
      console.error("[Contacts] updateStatus failed:", error);
      alert("No se pudo actualizar el status: " + error.message);
      return;
    }
    setSelected((s: any) => s ? { ...s, status } : null);
    load();
  };

  const exportCSV = () => {
    const headers = ["Nombre", "Email", "Teléfono", "Mensaje", "Origen", "Status", "Fecha"];
    const rows = contacts.map(c => [c.name, c.email, c.phone, c.message, c.source, c.status, new Date(c.created_at).toLocaleDateString()]);
    const csv = [headers, ...rows].map(r => r.map((v: string) => `"${(v || "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "contactos.csv"; a.click();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1A1A2E", margin: 0 }}>Contactos</h2>
        <div style={{ display: "flex", gap: 12 }}>
          <select value={filter} onChange={e => setFilter(e.target.value)}
            style={{ padding: "8px 14px", border: "1px solid #E8E8E8", borderRadius: 8, fontSize: 13 }}>
            <option value="">Todos</option>
            <option value="nuevo">Nuevo</option>
            <option value="contactado">Contactado</option>
            <option value="cerrado">Cerrado</option>
          </select>
          <button onClick={exportCSV} style={{ padding: "8px 16px", background: "#1A1A2E", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Exportar CSV</button>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,.06)", overflowX: "auto" }}>
        {loading ? <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Cargando...</div> : (
          <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: "1px solid #E8E8E8", textAlign: "left" }}>
              <th style={{ padding: "12px 16px", fontWeight: 600, color: "#888" }}>Nombre</th>
              <th style={{ padding: "12px 16px", fontWeight: 600, color: "#888" }}>Email</th>
              <th style={{ padding: "12px 16px", fontWeight: 600, color: "#888" }}>Teléfono</th>
              <th style={{ padding: "12px 16px", fontWeight: 600, color: "#888" }}>Mensaje</th>
              <th style={{ padding: "12px 16px", fontWeight: 600, color: "#888" }}>Origen</th>
              <th style={{ padding: "12px 16px", fontWeight: 600, color: "#888" }}>Status</th>
              <th style={{ padding: "12px 16px", fontWeight: 600, color: "#888" }}>Fecha</th>
            </tr></thead>
            <tbody>
              {contacts.map(c => (
                <tr key={c.id} onClick={() => setSelected(c)} style={{ borderBottom: "1px solid #f5f5f5", cursor: "pointer" }}>
                  <td style={{ padding: "12px 16px" }}>{c.name || "—"}</td>
                  <td style={{ padding: "12px 16px" }}>{c.email || "—"}</td>
                  <td style={{ padding: "12px 16px" }}>{c.phone || "—"}</td>
                  <td style={{ padding: "12px 16px", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.message || "—"}</td>
                  <td style={{ padding: "12px 16px" }}>{c.source || "—"}</td>
                  <td style={{ padding: "12px 16px" }}>
                    {(() => {
                      const status = c.status ?? "nuevo";
                      return <span style={{ background: statusColor[status] ?? statusColor.nuevo, color: "white", padding: "2px 10px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>{status}</span>;
                    })()}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#888" }}>{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {contacts.length === 0 && <tr><td colSpan={7} style={{ padding: 40, textAlign: "center", color: "#888" }}>Sin contactos</td></tr>}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 24 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 32, maxWidth: 500, width: "100%", maxHeight: "80vh", overflow: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Detalle del contacto</h3>
              <button onClick={() => setSelected(null)} aria-label="Cerrar" style={{ background: "none", border: "none", cursor: "pointer", color: "#1A1A2E", display: "inline-flex", alignItems: "center" }}>
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.8 }}>
              <p><strong>Nombre:</strong> {selected.name || "—"}</p>
              <p><strong>Email:</strong> {selected.email || "—"}</p>
              <p><strong>Teléfono:</strong> {selected.phone || "—"}</p>
              <p><strong>Origen:</strong> {selected.source || "—"}</p>
              <p><strong>Fecha:</strong> {new Date(selected.created_at).toLocaleString()}</p>
              <p><strong>Mensaje:</strong></p>
              <p style={{ background: "#f5f5f5", padding: 12, borderRadius: 8 }}>{selected.message || "Sin mensaje"}</p>
            </div>
            <div style={{ marginTop: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#888", display: "block", marginBottom: 6 }}>Cambiar status</label>
              <select value={selected.status ?? "nuevo"} onChange={e => updateStatus(selected.id, e.target.value)}
                style={{ padding: "8px 14px", border: "1px solid #E8E8E8", borderRadius: 8, fontSize: 13, width: "100%" }}>
                <option value="nuevo">Nuevo</option>
                <option value="contactado">Contactado</option>
                <option value="cerrado">Cerrado</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
