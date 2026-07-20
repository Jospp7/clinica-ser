import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts";
import { Eye, MousePointerClick, BarChart3, Mail, LucideIcon } from "lucide-react";

const cardStyle: React.CSSProperties = { background: "white", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,.06)" };
const titleStyle: React.CSSProperties = { fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 16 };
const emptyStyle: React.CSSProperties = { color: "#888", fontSize: 13, textAlign: "center", padding: "40px 0" };

// TODO: requiere integración con Google Search Console para posiciones de keywords.
// TODO: requiere integración con Google Business para reseñas y llamadas estimadas.
// TODO: requiere integración con Google Analytics para fuentes de tráfico, dispositivos, hora del día y tiempo promedio.

const Analytics = () => {
  const [totals, setTotals] = useState({ views: 0, ctas: 0, contacts: 0, rate: "0" });
  const [dailyViews, setDailyViews] = useState<{ date: string; views: number }[]>([]);
  const [topCtas, setTopCtas] = useState<{ element: string; clicks: number }[]>([]);
  const [pageViews, setPageViews] = useState<{ page: string; views: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [viewsRes, ctasRes, contactsRes] = await Promise.all([
        supabase.from("page_events").select("id", { count: "exact", head: true }).eq("event_type", "pageview"),
        supabase.from("page_events").select("id", { count: "exact", head: true }).eq("event_type", "cta_click"),
        supabase.from("contacts").select("id", { count: "exact", head: true }),
      ]);
      if (viewsRes.error) console.error("[Analytics] views total failed:", viewsRes.error);
      if (ctasRes.error) console.error("[Analytics] ctas total failed:", ctasRes.error);
      if (contactsRes.error) console.error("[Analytics] contacts total failed:", contactsRes.error);

      const v = viewsRes.count ?? 0;
      const c = ctasRes.count ?? 0;
      const ct = contactsRes.count ?? 0;
      setTotals({ views: v, ctas: c, contacts: ct, rate: v > 0 ? ((c / v) * 100).toFixed(1) : "0" });

      const days: { date: string; views: number }[] = [];
      for (let i = 29; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const ds = d.toISOString().split("T")[0];
        const next = new Date(d.getTime() + 86400000).toISOString().split("T")[0];
        const { count, error } = await supabase.from("page_events").select("id", { count: "exact", head: true }).eq("event_type", "pageview").gte("created_at", ds).lt("created_at", next);
        if (error) console.error("[Analytics] daily views failed:", error);
        days.push({ date: ds.slice(5), views: count ?? 0 });
      }
      setDailyViews(days);

      const { data: ctaData, error: ctaErr } = await supabase.from("page_events").select("label").eq("event_type", "cta_click");
      if (ctaErr) console.error("[Analytics] cta breakdown failed:", ctaErr);
      const ctaCounts: Record<string, number> = {};
      (ctaData ?? []).forEach(e => { ctaCounts[e.label ?? "unknown"] = (ctaCounts[e.label ?? "unknown"] || 0) + 1; });
      setTopCtas(Object.entries(ctaCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([element, clicks]) => ({ element, clicks })));

      const { data: pvData, error: pvErr } = await supabase.from("page_events").select("page").eq("event_type", "pageview");
      if (pvErr) console.error("[Analytics] page views breakdown failed:", pvErr);
      const pvCounts: Record<string, number> = {};
      (pvData ?? []).forEach(e => { pvCounts[e.page ?? "/"] = (pvCounts[e.page ?? "/"] || 0) + 1; });
      setPageViews(Object.entries(pvCounts).sort((a, b) => b[1] - a[1]).map(([page, views]) => ({ page, views })));

      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div style={{ textAlign: "center", padding: 60, color: "#888" }}>Cargando analíticas...</div>;

  const hasDailyViews = dailyViews.some(d => d.views > 0);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Visitas totales", value: totals.views.toLocaleString(), icon: Eye as LucideIcon },
          { label: "Clics en CTAs", value: totals.ctas.toLocaleString(), icon: MousePointerClick as LucideIcon },
          { label: "Tasa conversión", value: `${totals.rate}%`, icon: BarChart3 as LucideIcon },
          { label: "Contactos", value: totals.contacts.toLocaleString(), icon: Mail as LucideIcon },
        ].map(m => (
          <div key={m.label} style={{ ...cardStyle, padding: "18px 20px" }}>
            <div style={{ marginBottom: 6, color: "#1A1A2E", height: 22, display: "flex", alignItems: "center" }}>
              <m.icon size={20} aria-hidden="true" />
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#1A1A2E" }}>{m.value}</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{m.label}</div>
          </div>
        ))}
      </div>

      <div style={{ ...cardStyle, marginBottom: 24 }}>
        <h3 style={titleStyle}>Visitas por día — últimos 30 días</h3>
        {hasDailyViews ? (
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={dailyViews}>
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C8E64A" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#C8E64A" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" fontSize={10} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Area type="monotone" dataKey="views" stroke="#8AB83A" strokeWidth={2} fill="url(#viewsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : <p style={emptyStyle}>Sin datos todavía para este periodo.</p>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div style={cardStyle}>
          <h3 style={titleStyle}>Top 5 CTAs</h3>
          {topCtas.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topCtas}>
                <XAxis dataKey="element" fontSize={10} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Bar dataKey="clicks" fill="#D4A843" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <p style={emptyStyle}>Sin datos todavía.</p>}
        </div>

        <div style={cardStyle}>
          <h3 style={titleStyle}>Visitas por página</h3>
          {pageViews.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={pageViews} layout="vertical">
                <XAxis type="number" fontSize={11} />
                <YAxis dataKey="page" type="category" fontSize={10} width={100} />
                <Tooltip />
                <Bar dataKey="views" fill="#1B2A4A" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <p style={emptyStyle}>Sin datos todavía.</p>}
        </div>
      </div>
    </div>
  );
};

export default Analytics;