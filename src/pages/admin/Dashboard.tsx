import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, PhoneCall, Mail, FileText, LucideIcon } from "lucide-react";

interface Metric { label: string; icon: LucideIcon; value: number | string; }

const Dashboard = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [chartData, setChartData] = useState<{date: string; views: number}[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const today = new Date().toISOString().split("T")[0];
      const weekStart = new Date(Date.now() - 6 * 86400000).toISOString().split("T")[0];

      const [weekEvents, newContacts, publishedPosts, recentContacts, recentPosts] = await Promise.all([
        supabase.from("page_events").select("event_type,label,created_at,metadata").gte("created_at", weekStart).limit(20000),
        supabase.from("contacts").select("id", { count: "exact", head: true }).eq("status", "nuevo"),
        supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("contacts").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("posts").select("*").order("created_at", { ascending: false }).limit(5),
      ]);

      [weekEvents, newContacts, publishedPosts, recentContacts, recentPosts].forEach((r, i) => {
        if (r.error) console.error(`[Dashboard] load query ${i} failed:`, r.error);
      });

      type Ev = { event_type: string; label: string | null; created_at: string; metadata: Record<string, unknown> | null };
      const evs = (weekEvents.data ?? []) as Ev[];
      const isContactCta = (l: string) => /^LLAMA|^WA_|WHATSAPP/.test(l);
      const todayEvs = evs.filter(e => e.created_at.startsWith(today));
      const visitorsToday = new Set(
        todayEvs.filter(e => e.event_type === "pageview").map(e => (e.metadata?.["session_id"] as string) ?? "").filter(Boolean)
      ).size;
      const contactClicksToday = todayEvs.filter(e => e.event_type === "cta_click" && isContactCta(e.label ?? "")).length;

      setMetrics([
        { label: "Visitantes hoy", icon: Users, value: visitorsToday },
        { label: "Clics de contacto hoy", icon: PhoneCall, value: contactClicksToday },
        { label: "Contactos nuevos", icon: Mail, value: newContacts.count ?? 0 },
        { label: "Posts publicados", icon: FileText, value: publishedPosts.count ?? 0 },
      ]);
      setContacts(recentContacts.data ?? []);
      setPosts(recentPosts.data ?? []);

      const buckets: Record<string, Set<string>> = {};
      for (let i = 6; i >= 0; i--) {
        buckets[new Date(Date.now() - i * 86400000).toISOString().split("T")[0]] = new Set();
      }
      evs.filter(e => e.event_type === "pageview").forEach(e => {
        const d = e.created_at.split("T")[0];
        if (buckets[d]) buckets[d].add((e.metadata?.["session_id"] as string) ?? "");
      });
      setChartData(Object.entries(buckets).map(([d, s]) => ({ date: d.slice(5), views: s.size })));
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div style={{ textAlign: "center", padding: 60, color: "#888" }}>Cargando dashboard...</div>;

  const statusColor: Record<string, string> = { nuevo: "#3B82F6", contactado: "#F59E0B", cerrado: "#22C55E" };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
        {metrics.map(m => (
          <div key={m.label} style={{ background: "white", borderRadius: 12, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,.06)" }}>
            <div style={{ marginBottom: 8, color: "#1A1A2E" }}><m.icon size={20} aria-hidden="true" /></div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#1A1A2E" }}>{m.value}</div>
            <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{m.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "white", borderRadius: 12, padding: 24, marginBottom: 32, boxShadow: "0 1px 3px rgba(0,0,0,.06)" }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 16 }}>Visitas — Últimos 7 días</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" fontSize={11} />
            <YAxis fontSize={11} />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="#C8E64A" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: "white", borderRadius: 12, padding: 24, marginBottom: 32, boxShadow: "0 1px 3px rgba(0,0,0,.06)", overflowX: "auto" }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 16 }}>Últimos Contactos</h3>
        <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
          <thead><tr style={{ borderBottom: "1px solid #E8E8E8", textAlign: "left" }}>
            <th style={{ padding: "8px 12px", fontWeight: 600, color: "#888" }}>Nombre</th>
            <th style={{ padding: "8px 12px", fontWeight: 600, color: "#888" }}>Email</th>
            <th style={{ padding: "8px 12px", fontWeight: 600, color: "#888" }}>Teléfono</th>
            <th style={{ padding: "8px 12px", fontWeight: 600, color: "#888" }}>Origen</th>
            <th style={{ padding: "8px 12px", fontWeight: 600, color: "#888" }}>Status</th>
            <th style={{ padding: "8px 12px", fontWeight: 600, color: "#888" }}>Fecha</th>
          </tr></thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                <td style={{ padding: "10px 12px" }}>{c.name || "—"}</td>
                <td style={{ padding: "10px 12px" }}>{c.email || "—"}</td>
                <td style={{ padding: "10px 12px" }}>{c.phone || "—"}</td>
                <td style={{ padding: "10px 12px" }}>{c.source || "—"}</td>
                <td style={{ padding: "10px 12px" }}>
                  <span style={{ background: statusColor[c.status] ?? "#888", color: "white", padding: "2px 10px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>{c.status}</span>
                </td>
                <td style={{ padding: "10px 12px", color: "#888" }}>{new Date(c.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {contacts.length === 0 && <tr><td colSpan={6} style={{ padding: 24, textAlign: "center", color: "#888" }}>Sin contactos aún</td></tr>}
          </tbody>
        </table>
      </div>

      <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,.06)", overflowX: "auto" }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 16 }}>Posts Recientes</h3>
        <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
          <thead><tr style={{ borderBottom: "1px solid #E8E8E8", textAlign: "left" }}>
            <th style={{ padding: "8px 12px", fontWeight: 600, color: "#888" }}>Título</th>
            <th style={{ padding: "8px 12px", fontWeight: 600, color: "#888" }}>Categoría</th>
            <th style={{ padding: "8px 12px", fontWeight: 600, color: "#888" }}>Status</th>
            <th style={{ padding: "8px 12px", fontWeight: 600, color: "#888" }}>Vistas</th>
            <th style={{ padding: "8px 12px", fontWeight: 600, color: "#888" }}>Fecha</th>
          </tr></thead>
          <tbody>
            {posts.map(p => (
              <tr key={p.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                <td style={{ padding: "10px 12px", fontWeight: 500 }}>{p.title}</td>
                <td style={{ padding: "10px 12px" }}>{p.category || "—"}</td>
                <td style={{ padding: "10px 12px" }}>
                  <span style={{ background: p.status === "published" ? "#22C55E" : "#888", color: "white", padding: "2px 10px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>{p.status}</span>
                </td>
                <td style={{ padding: "10px 12px" }}>{p.views}</td>
                <td style={{ padding: "10px 12px", color: "#888" }}>{new Date(p.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {posts.length === 0 && <tr><td colSpan={5} style={{ padding: 24, textAlign: "center", color: "#888" }}>Sin posts aún</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
