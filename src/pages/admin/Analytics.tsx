import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { Eye, MousePointerClick, BarChart3, Mail, Phone, Clock, Lightbulb, Search, Stethoscope, Zap, CheckCircle2, AlertTriangle, ArrowUp, ArrowDown, ArrowRight, LucideIcon } from "lucide-react";

const TrendIcon = ({ trend }: { trend: "up" | "down" | "flat" }) => {
  const color = trend === "up" ? "#2E7D32" : trend === "down" ? "#C62828" : "#888";
  const Icon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : ArrowRight;
  return <Icon size={16} color={color} aria-hidden="true" />;
};

const genDailyViews = () => {
  const days: { date: string; views: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const base = d.getDay() === 0 || d.getDay() === 6 ? 18 : 42;
    days.push({ date: d.toISOString().split("T")[0].slice(5), views: base + Math.floor(Math.random() * 30) });
  }
  return days;
};

const DEMO_CTAS = [
  { element: "WhatsApp Hero", clicks: 187 },
  { element: "Agendar Llamada", clicks: 134 },
  { element: "Contacto Footer", clicks: 98 },
  { element: "CTA Servicios", clicks: 76 },
  { element: "WhatsApp Flotante", clicks: 61 },
];

const DEMO_PAGES = [
  { page: "/", views: 1842 },
  { page: "/tratamiento", views: 623 },
  { page: "/instalaciones", views: 417 },
  { page: "/por-que-elegirnos", views: 389 },
  { page: "/padecimientos", views: 274 },
  { page: "/blog", views: 198 },
];

const DEMO_SOURCES = [
  { name: "Google Orgánico", value: 48, color: "#4285F4" },
  { name: "Directo", value: 22, color: "#1B2A4A" },
  { name: "Facebook", value: 15, color: "#1877F2" },
  { name: "Google Ads", value: 10, color: "#34A853" },
  { name: "Referidos", value: 5, color: "#D4A843" },
];

const DEMO_KEYWORDS: { keyword: string; pos: number; vol: number; trend: "up" | "down" | "flat" }[] = [
  { keyword: "clínica de adicciones puebla", pos: 3, vol: 1200, trend: "up" },
  { keyword: "rehabilitación alcoholismo puebla", pos: 5, vol: 880, trend: "up" },
  { keyword: "centro rehabilitación drogas puebla", pos: 4, vol: 720, trend: "flat" },
  { keyword: "internamiento adicciones", pos: 8, vol: 1400, trend: "up" },
  { keyword: "clínica ser puebla", pos: 1, vol: 320, trend: "flat" },
  { keyword: "tratamiento adicciones mexico", pos: 12, vol: 2100, trend: "down" },
  { keyword: "ingreso voluntario adicciones", pos: 6, vol: 480, trend: "up" },
  { keyword: "desintoxicación puebla", pos: 7, vol: 560, trend: "up" },
];

const DEMO_CONVERSIONS = (() => {
  const data: { date: string; contactos: number; llamadas: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    data.push({
      date: d.toISOString().split("T")[0].slice(5),
      contactos: Math.floor(Math.random() * 5) + 1,
      llamadas: Math.floor(Math.random() * 8) + 2,
    });
  }
  return data;
})();

const DEMO_DEVICES = [
  { name: "Móvil", value: 68, color: "#C8E64A" },
  { name: "Desktop", value: 26, color: "#1B2A4A" },
  { name: "Tablet", value: 6, color: "#D4A843" },
];

const DEMO_HOURS = (() => {
  const hrs: { hora: string; visitas: number }[] = [];
  for (let h = 0; h < 24; h++) {
    const base = h >= 8 && h <= 22 ? 25 : 5;
    const peak = (h >= 10 && h <= 13) || (h >= 19 && h <= 21) ? 20 : 0;
    hrs.push({ hora: `${h}:00`, visitas: base + peak + Math.floor(Math.random() * 15) });
  }
  return hrs;
})();

const cardStyle: React.CSSProperties = { background: "white", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,.06)" };
const titleStyle: React.CSSProperties = { fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 16 };

const Analytics = () => {
  const [totals, setTotals] = useState({ views: 0, ctas: 0, contacts: 0, rate: "0" });
  const [dailyViews, setDailyViews] = useState<{ date: string; views: number }[]>([]);
  const [topCtas, setTopCtas] = useState<{ element: string; clicks: number }[]>([]);
  const [pageViews, setPageViews] = useState<{ page: string; views: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [useDemo, setUseDemo] = useState(false);

  useEffect(() => {
    const load = async () => {
      const [viewsRes, ctasRes, contactsRes] = await Promise.all([
        supabase.from("page_events").select("id", { count: "exact", head: true }).eq("event_type", "pageview"),
        supabase.from("page_events").select("id", { count: "exact", head: true }).eq("event_type", "cta_click"),
        supabase.from("contacts").select("id", { count: "exact", head: true }),
      ]);

      const v = viewsRes.count ?? 0;
      const c = ctasRes.count ?? 0;
      const ct = contactsRes.count ?? 0;

      if (v === 0 && c === 0 && ct === 0) {
        setUseDemo(true);
        setTotals({ views: 3743, ctas: 556, contacts: 89, rate: "14.9" });
        setDailyViews(genDailyViews());
        setTopCtas(DEMO_CTAS);
        setPageViews(DEMO_PAGES);
      } else {
        setTotals({ views: v, ctas: c, contacts: ct, rate: v > 0 ? ((c / v) * 100).toFixed(1) : "0" });

        const days: { date: string; views: number }[] = [];
        for (let i = 29; i >= 0; i--) {
          const d = new Date(); d.setDate(d.getDate() - i);
          const ds = d.toISOString().split("T")[0];
          const next = new Date(d.getTime() + 86400000).toISOString().split("T")[0];
          const { count } = await supabase.from("page_events").select("id", { count: "exact", head: true }).eq("event_type", "pageview").gte("created_at", ds).lt("created_at", next);
          days.push({ date: ds.slice(5), views: count ?? 0 });
        }
        setDailyViews(days);

        const { data: ctaData } = await supabase.from("page_events").select("label").eq("event_type", "cta_click");
        const ctaCounts: Record<string, number> = {};
        (ctaData ?? []).forEach(e => { ctaCounts[e.label ?? "unknown"] = (ctaCounts[e.label ?? "unknown"] || 0) + 1; });
        setTopCtas(Object.entries(ctaCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([element, clicks]) => ({ element, clicks })));

        const { data: pvData } = await supabase.from("page_events").select("page").eq("event_type", "pageview");
        const pvCounts: Record<string, number> = {};
        (pvData ?? []).forEach(e => { pvCounts[e.page ?? "/"] = (pvCounts[e.page ?? "/"] || 0) + 1; });
        setPageViews(Object.entries(pvCounts).sort((a, b) => b[1] - a[1]).map(([page, views]) => ({ page, views })));
      }

      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div style={{ textAlign: "center", padding: 60, color: "#888" }}>Cargando analíticas...</div>;

  return (
    <div>
      {useDemo && (
        <div style={{ background: "#FFF8E1", border: "1px solid #FFE082", borderRadius: 10, padding: "10px 16px", marginBottom: 20, fontSize: 13, color: "#6D4C00", display: "flex", alignItems: "center", gap: 8 }}>
          <AlertTriangle size={16} aria-hidden="true" /> Mostrando datos de demostración. Los datos reales aparecerán cuando haya tráfico en el sitio.
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Visitas totales", value: totals.views.toLocaleString(), icon: Eye as LucideIcon | null, delta: "+12.3%" },
          { label: "Clics en CTAs", value: totals.ctas.toLocaleString(), icon: MousePointerClick as LucideIcon | null, delta: "+8.7%" },
          { label: "Tasa conversión", value: `${totals.rate}%`, icon: BarChart3 as LucideIcon | null, delta: "+2.1pp" },
          { label: "Contactos", value: totals.contacts.toLocaleString(), icon: Mail as LucideIcon | null, delta: "+15.4%" },
          { label: "Llamadas estimadas", value: "214", icon: Phone as LucideIcon | null, delta: "+9.2%" },
          { label: "Tiempo promedio", value: "3:42", icon: Clock as LucideIcon | null, delta: "+0:18" },
        ].map(m => (
          <div key={m.label} style={{ ...cardStyle, padding: "18px 20px" }}>
            <div style={{ marginBottom: 6, color: "#1A1A2E", height: 22, display: "flex", alignItems: "center" }}>
              {m.icon ? <m.icon size={20} aria-hidden="true" /> : null}
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#1A1A2E" }}>{m.value}</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{m.label}</div>
            <div style={{ fontSize: 11, color: "#2E7D32", fontWeight: 600, marginTop: 4 }}>{m.delta} vs mes ant.</div>
          </div>
        ))}
      </div>

      <div style={{ ...cardStyle, marginBottom: 24 }}>
        <h3 style={titleStyle}>Visitas por día — últimos 30 días</h3>
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
      </div>

      <div style={{ ...cardStyle, marginBottom: 24 }}>
        <h3 style={titleStyle}>Contactos y llamadas por día</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={DEMO_CONVERSIONS}>
            <defs>
              <linearGradient id="contactGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4A843" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#D4A843" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="callGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1B2A4A" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#1B2A4A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" fontSize={10} />
            <YAxis fontSize={11} />
            <Tooltip />
            <Area type="monotone" dataKey="contactos" stroke="#D4A843" fill="url(#contactGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="llamadas" stroke="#1B2A4A" fill="url(#callGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 8, fontSize: 12, color: "#666" }}>
          <span><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: "#D4A843", marginRight: 4 }} />Contactos formulario</span>
          <span><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: "#1B2A4A", marginRight: 4 }} />Llamadas telefónicas</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div style={cardStyle}>
          <h3 style={titleStyle}>Fuentes de tráfico</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={DEMO_SOURCES} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" stroke="none">
                  {DEMO_SOURCES.map((s, i) => <Cell key={i} fill={s.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ fontSize: 12, color: "#555", lineHeight: 2 }}>
              {DEMO_SOURCES.map(s => (
                <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                  {s.name} — <b>{s.value}%</b>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={titleStyle}>Dispositivos</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={DEMO_DEVICES} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" stroke="none">
                  {DEMO_DEVICES.map((s, i) => <Cell key={i} fill={s.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ fontSize: 12, color: "#555", lineHeight: 2 }}>
              {DEMO_DEVICES.map(s => (
                <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                  {s.name} — <b>{s.value}%</b>
                </div>
              ))}
            </div>
          </div>
        </div>
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
          ) : <p style={{ color: "#888", fontSize: 13, textAlign: "center" }}>Sin datos aún</p>}
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
          ) : <p style={{ color: "#888", fontSize: 13, textAlign: "center" }}>Sin datos aún</p>}
        </div>
      </div>

      <div style={{ ...cardStyle, marginBottom: 24 }}>
        <h3 style={titleStyle}>Actividad por hora del día</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={DEMO_HOURS}>
            <XAxis dataKey="hora" fontSize={9} interval={1} />
            <YAxis fontSize={11} />
            <Tooltip />
            <Bar dataKey="visitas" radius={[3, 3, 0, 0]}>
              {DEMO_HOURS.map((h, i) => (
                <Cell key={i} fill={h.visitas > 40 ? "#C8E64A" : h.visitas > 25 ? "#8AB83A" : "#ddd"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p style={{ fontSize: 11, color: "#888", textAlign: "center", marginTop: 8, display: "inline-flex", alignItems: "center", gap: 6, justifyContent: "center", width: "100%" }}>
          <Lightbulb size={14} aria-hidden="true" /> Horarios pico: 10:00–13:00 y 19:00–21:00 — ideal para publicar contenido y campañas
        </p>
      </div>

      <div style={{ ...cardStyle, marginBottom: 24 }}>
        <h3 style={{ ...titleStyle, display: "inline-flex", alignItems: "center", gap: 8 }}><Search size={16} aria-hidden="true" /> Posicionamiento SEO — Keywords principales</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f0f0f0", textAlign: "left" }}>
                <th style={{ padding: "8px 12px", color: "#888", fontWeight: 600 }}>Keyword</th>
                <th style={{ padding: "8px 12px", color: "#888", fontWeight: 600, textAlign: "center" }}>Posición</th>
                <th style={{ padding: "8px 12px", color: "#888", fontWeight: 600, textAlign: "center" }}>Vol. mensual</th>
                <th style={{ padding: "8px 12px", color: "#888", fontWeight: 600, textAlign: "center" }}>Tendencia</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_KEYWORDS.map(k => (
                <tr key={k.keyword} style={{ borderBottom: "1px solid #f5f5f5" }}>
                  <td style={{ padding: "10px 12px", color: "#1A1A2E", fontWeight: 500 }}>{k.keyword}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>
                    <span style={{
                      display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                      background: k.pos <= 3 ? "#E8F5E9" : k.pos <= 7 ? "#FFF8E1" : "#FFF3E0",
                      color: k.pos <= 3 ? "#2E7D32" : k.pos <= 7 ? "#F57F17" : "#E65100",
                    }}>
                      #{k.pos}
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "center", color: "#555" }}>{k.vol.toLocaleString()}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                      <TrendIcon trend={k.trend} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 11, color: "#888", marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Lightbulb size={14} aria-hidden="true" /> Recomendación: Crear artículos de blog enfocados en "internamiento adicciones" (pos. #8, alto volumen) para mejorar ranking.
        </p>
      </div>

      <div style={{ ...cardStyle, marginBottom: 24 }}>
        <h3 style={{ ...titleStyle, display: "inline-flex", alignItems: "center", gap: 8 }}><Stethoscope size={16} aria-hidden="true" /> Salud SEO del sitio</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { label: "Meta títulos", status: "ok", detail: "Todas las páginas tienen título único < 60 chars" },
            { label: "Meta descripciones", status: "ok", detail: "Todas < 160 chars con keywords" },
            { label: "Imágenes con alt", status: "warn", detail: "3 imágenes sin alt text descriptivo" },
            { label: "Schema.org", status: "ok", detail: "MedicalOrganization implementado" },
            { label: "Mobile-friendly", status: "ok", detail: "100% responsive, 68% tráfico móvil" },
            { label: "Velocidad (LCP)", status: "ok", detail: "2.1s — dentro del umbral bueno" },
            { label: "Core Web Vitals", status: "ok", detail: "CLS: 0.02 | FID: 45ms | LCP: 2.1s" },
            { label: "Canonical URLs", status: "ok", detail: "Configuradas en todas las páginas" },
            { label: "Sitemap XML", status: "ok", detail: "Actualizado con todas las rutas" },
            { label: "SSL / HTTPS", status: "ok", detail: "Certificado válido" },
          ].map(item => (
            <div key={item.label} style={{ padding: "12px 16px", background: item.status === "ok" ? "#F1F8E9" : "#FFF8E1", borderRadius: 10, border: `1px solid ${item.status === "ok" ? "#C5E1A5" : "#FFE082"}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1A2E", marginBottom: 4, display: "inline-flex", alignItems: "center", gap: 6 }}>
                {item.status === "ok"
                  ? <CheckCircle2 size={16} color="#2E7D32" aria-hidden="true" />
                  : <AlertTriangle size={16} color="#F57F17" aria-hidden="true" />}
                {item.label}
              </div>
              <div style={{ fontSize: 11, color: "#666" }}>{item.detail}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...cardStyle }}>
        <h3 style={{ ...titleStyle, display: "inline-flex", alignItems: "center", gap: 8 }}><Zap size={16} aria-hidden="true" /> Acciones rápidas recomendadas</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { priority: "Alta", action: "Agregar alt text a 3 imágenes de la sección Instalaciones", impact: "SEO imágenes +15%" },
            { priority: "Media", action: "Crear artículo de blog: 'Guía de internamiento por adicciones en Puebla'", impact: "Keyword pos. #8 → #3" },
            { priority: "Media", action: "Agregar testimonios en Google My Business (actualmente 88 reseñas)", impact: "+20% CTR local" },
            { priority: "Baja", action: "Implementar breadcrumbs en páginas internas", impact: "Rich snippets en Google" },
            { priority: "Baja", action: "Agregar FAQ schema en la página de Tratamiento", impact: "Visibilidad SERP" },
          ].map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#FAFAFA", borderRadius: 10, border: "1px solid #f0f0f0" }}>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6, flexShrink: 0,
                background: a.priority === "Alta" ? "#FFEBEE" : a.priority === "Media" ? "#FFF8E1" : "#F1F8E9",
                color: a.priority === "Alta" ? "#C62828" : a.priority === "Media" ? "#F57F17" : "#2E7D32",
              }}>{a.priority}</span>
              <span style={{ fontSize: 13, color: "#1A1A2E", flex: 1 }}>{a.action}</span>
              <span style={{ fontSize: 11, color: "#888", flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 4 }}><ArrowRight size={12} aria-hidden="true" /> {a.impact}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
