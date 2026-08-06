import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts";
import { Users, PhoneCall, Mail, TrendingUp, LucideIcon } from "lucide-react";

const cardStyle: React.CSSProperties = { background: "white", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,.06)" };
const titleStyle: React.CSSProperties = { fontSize: 14, fontWeight: 700, color: "#003057", marginBottom: 16 };
const emptyStyle: React.CSSProperties = { color: "#888", fontSize: 13, textAlign: "center", padding: "40px 0" };

const RANGES = [
  { key: "1", label: "Hoy", days: 1 },
  { key: "7", label: "7 días", days: 7 },
  { key: "30", label: "30 días", days: 30 },
  { key: "90", label: "90 días", days: 90 },
];

type EventRow = {
  event_type: string;
  label: string | null;
  page: string | null;
  created_at: string;
  metadata: Record<string, unknown> | null;
};
type ContactRow = { id: string; source: string | null; status: string | null; created_at: string };

const CTA_LABELS: Record<string, string> = {
  AGENDAR_HERO: "Agendar (Hero)",
  CONTACTANOS_TIPOS: "Contáctanos (Tipos de ingreso)",
  LLAMAR_24H: "Llamar 24h (Navbar)",
  LLAMAR_AHORA_MOBILE: "Llamar ahora (Móvil)",
  LLAMA_AHORA_CTA: "Llama ahora (CTA final)",
  WHATSAPP_FLOTANTE: "WhatsApp flotante",
  WA_HERO_BUBBLE: "WhatsApp (Hero)",
  WHATSAPP_FOOTER: "WhatsApp (Footer)",
  SOLICITAR_CONTACTO_FOOTER: "Formulario footer",
  DESCARGAR_GUIA_INGRESO: "Descargar guía de ingreso",
  DESCARGAR_GUIA_INTERVENCION: "Descargar guía de intervención",
  GOOGLE_REVIEWS: "Reseñas de Google",
  VISITANOS_MAPA: "Cómo llegar (Mapa)",
};
const prettyCta = (l: string) =>
  CTA_LABELS[l] ?? l.replace(/_/g, " ").toLowerCase().replace(/^./, c => c.toUpperCase());

const isPhoneCta = (l: string) => /^LLAMA/.test(l);
const isWhatsappCta = (l: string) => /^WA_|WHATSAPP/.test(l);
const isContactCta = (l: string) => isPhoneCta(l) || isWhatsappCta(l);

const sessionOf = (e: EventRow) => (e.metadata?.["session_id"] as string) ?? "";

const Analytics = () => {
  const [rangeKey, setRangeKey] = useState("30");
  const [events, setEvents] = useState<EventRow[]>([]);
  const [prevEvents, setPrevEvents] = useState<EventRow[]>([]);
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [prevContacts, setPrevContacts] = useState<ContactRow[]>([]);
  const [loading, setLoading] = useState(true);

  const days = RANGES.find(r => r.key === rangeKey)?.days ?? 30;

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      const now = new Date();
      const start = new Date(now.getTime() - days * 86400000);
      const prevStart = new Date(now.getTime() - 2 * days * 86400000);

      const [evRes, prevEvRes, ctRes, prevCtRes] = await Promise.all([
        supabase.from("page_events").select("event_type,label,page,created_at,metadata").gte("created_at", start.toISOString()).order("created_at", { ascending: true }).limit(20000),
        supabase.from("page_events").select("event_type,label,page,created_at,metadata").gte("created_at", prevStart.toISOString()).lt("created_at", start.toISOString()).limit(20000),
        supabase.from("contacts").select("id,source,status,created_at").gte("created_at", start.toISOString()).limit(5000),
        supabase.from("contacts").select("id,source,status,created_at").gte("created_at", prevStart.toISOString()).lt("created_at", start.toISOString()).limit(5000),
      ]);
      [evRes, prevEvRes, ctRes, prevCtRes].forEach((r, i) => { if (r.error) console.error(`[Analytics] query ${i} failed:`, r.error); });
      if (cancelled) return;
      setEvents((evRes.data ?? []) as EventRow[]);
      setPrevEvents((prevEvRes.data ?? []) as EventRow[]);
      setContacts((ctRes.data ?? []) as ContactRow[]);
      setPrevContacts((prevCtRes.data ?? []) as ContactRow[]);
      setLoading(false);
    };
    load();
    return () => { cancelled = true; };
  }, [days]);

  const stats = useMemo(() => {
    const compute = (ev: EventRow[], ct: ContactRow[]) => {
      const visitors = new Set(ev.filter(e => e.event_type === "pageview").map(sessionOf).filter(Boolean)).size;
      const ctas = ev.filter(e => e.event_type === "cta_click");
      const directContacts = ctas.filter(e => isContactCta(e.label ?? "")).length;
      const forms = ct.length;
      const conversions = directContacts + forms;
      return {
        visitors,
        forms,
        directContacts,
        rate: visitors > 0 ? (conversions / visitors) * 100 : 0,
      };
    };
    return { current: compute(events, contacts), previous: compute(prevEvents, prevContacts) };
  }, [events, prevEvents, contacts, prevContacts]);

  const daily = useMemo(() => {
    const buckets: Record<string, { date: string; visitantes: Set<string>; conversiones: number }> = {};
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().split("T")[0];
      buckets[d] = { date: d, visitantes: new Set(), conversiones: 0 };
    }
    events.forEach(e => {
      const d = e.created_at.split("T")[0];
      if (!buckets[d]) return;
      if (e.event_type === "pageview") buckets[d].visitantes.add(sessionOf(e));
      if (e.event_type === "cta_click" && isContactCta(e.label ?? "")) buckets[d].conversiones += 1;
    });
    contacts.forEach(c => {
      const d = c.created_at.split("T")[0];
      if (buckets[d]) buckets[d].conversiones += 1;
    });
    return Object.values(buckets).map(b => ({ date: b.date.slice(5), visitantes: b.visitantes.size, conversiones: b.conversiones }));
  }, [events, contacts, days]);

  const canales = useMemo(() => {
    const ctas = events.filter(e => e.event_type === "cta_click");
    return [
      { canal: "Teléfono", total: ctas.filter(e => isPhoneCta(e.label ?? "")).length },
      { canal: "WhatsApp", total: ctas.filter(e => isWhatsappCta(e.label ?? "")).length },
      { canal: "Formulario", total: contacts.length },
    ];
  }, [events, contacts]);

  const paginasConversion = useMemo(() => {
    const counts: Record<string, number> = {};
    events.forEach(e => {
      if (e.event_type !== "cta_click" || !isContactCta(e.label ?? "")) return;
      const p = e.page ?? "/";
      counts[p] = (counts[p] ?? 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([page, total]) => ({ page, total }));
  }, [events]);

  const origenes = useMemo(() => {
    const bySession: Record<string, string> = {};
    events.filter(e => e.event_type === "pageview").forEach(e => {
      const sid = sessionOf(e);
      if (!sid || bySession[sid]) return;
      bySession[sid] = (e.metadata?.["referrer_source"] as string) ?? "desconocido";
    });
    const counts: Record<string, number> = {};
    Object.values(bySession).forEach(o => { counts[o] = (counts[o] ?? 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([origen, total]) => ({ origen, total }));
  }, [events]);

  const paginasVistas = useMemo(() => {
    const counts: Record<string, number> = {};
    events.forEach(e => {
      if (e.event_type !== "pageview") return;
      const p = e.page ?? "/";
      counts[p] = (counts[p] ?? 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([page, vistas]) => ({ page, vistas }));
  }, [events]);

  const dispositivos = useMemo(() => {
    const bySession: Record<string, string> = {};
    events.filter(e => e.event_type === "pageview").forEach(e => {
      const sid = sessionOf(e);
      if (!sid || bySession[sid]) return;
      bySession[sid] = (e.metadata?.["device"] as string) ?? "desconocido";
    });
    const counts: Record<string, number> = {};
    Object.values(bySession).forEach(o => { counts[o] = (counts[o] ?? 0) + 1; });
    return Object.entries(counts).map(([dispositivo, total]) => ({ dispositivo, total }));
  }, [events]);

  const topCtas = useMemo(() => {
    const counts: Record<string, number> = {};
    events.filter(e => e.event_type === "cta_click").forEach(e => {
      const l = e.label ?? "desconocido";
      counts[l] = (counts[l] ?? 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([l, clicks]) => ({ cta: prettyCta(l), clicks }));
  }, [events]);

  const embudo = useMemo(() => {
    const status = (c: ContactRow) => c.status ?? "nuevo";
    const nuevos = contacts.filter(c => status(c) === "nuevo");
    const masAntiguoSinAtender = nuevos.length
      ? nuevos.reduce((a, b) => (a.created_at < b.created_at ? a : b))
      : null;
    return {
      nuevo: nuevos.length,
      contactado: contacts.filter(c => status(c) === "contactado").length,
      cerrado: contacts.filter(c => status(c) === "cerrado").length,
      esperaHoras: masAntiguoSinAtender
        ? Math.floor((Date.now() - new Date(masAntiguoSinAtender.created_at).getTime()) / 3600000)
        : null,
    };
  }, [contacts]);

  if (loading) return <div style={{ textAlign: "center", padding: 60, color: "#888" }}>Cargando analíticas...</div>;

  const delta = (cur: number, prev: number) => {
    if (prev === 0) return cur === 0 ? null : null;
    return ((cur - prev) / prev) * 100;
  };

  const cards: { label: string; value: string; icon: LucideIcon; change: number | null; hint: string }[] = [
    { label: "Visitantes únicos", value: stats.current.visitors.toLocaleString(), icon: Users, change: delta(stats.current.visitors, stats.previous.visitors), hint: "Sesiones distintas" },
    { label: "Contactos (formulario)", value: stats.current.forms.toLocaleString(), icon: Mail, change: delta(stats.current.forms, stats.previous.forms), hint: "Solicitudes recibidas" },
    { label: "Clics de contacto", value: stats.current.directContacts.toLocaleString(), icon: PhoneCall, change: delta(stats.current.directContacts, stats.previous.directContacts), hint: "Llamadas + WhatsApp" },
    { label: "Tasa de conversión", value: `${stats.current.rate.toFixed(1)}%`, icon: TrendingUp, change: delta(stats.current.rate, stats.previous.rate), hint: "Contactos / visitantes" },
  ];

  const noData = events.length === 0 && contacts.length === 0;

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {RANGES.map(r => (
          <button key={r.key} onClick={() => setRangeKey(r.key)}
            style={{
              padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer",
              border: "1px solid " + (rangeKey === r.key ? "#003057" : "#E2E2E2"),
              background: rangeKey === r.key ? "#003057" : "white",
              color: rangeKey === r.key ? "white" : "#555",
            }}>{r.label}</button>
        ))}
      </div>

      {noData && (
        <div style={{ ...cardStyle, marginBottom: 20, color: "#888", fontSize: 13 }}>
          Aún no hay datos suficientes en este periodo. Las métricas se llenan conforme los visitantes navegan el sitio.
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
        {cards.map(m => (
          <div key={m.label} style={{ ...cardStyle, padding: "18px 20px" }}>
            <div style={{ marginBottom: 6, color: "#003057", height: 22, display: "flex", alignItems: "center" }}>
              <m.icon size={20} aria-hidden="true" />
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#003057" }}>{m.value}</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{m.label}</div>
            <div style={{ fontSize: 11, marginTop: 6, color: m.change == null ? "#AAA" : m.change >= 0 ? "#1E9E5A" : "#C0392B" }}>
              {m.change == null ? "Sin comparación previa" : `${m.change >= 0 ? "▲" : "▼"} ${Math.abs(m.change).toFixed(0)}% vs. periodo anterior`}
            </div>
            <div style={{ fontSize: 10, color: "#BBB", marginTop: 2 }}>{m.hint}</div>
          </div>
        ))}
      </div>

      <div style={{ ...cardStyle, marginBottom: 24 }}>
        <h3 style={titleStyle}>Visitantes y conversiones por día</h3>
        {daily.some(d => d.visitantes > 0 || d.conversiones > 0) ? (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={daily}>
              <defs>
                <linearGradient id="visGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D9C756" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#D9C756" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#003057" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#003057" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" fontSize={10} />
              <YAxis fontSize={11} allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="visitantes" stroke="#B8A63F" strokeWidth={2} fill="url(#visGrad)" />
              <Area type="monotone" dataKey="conversiones" stroke="#003057" strokeWidth={2} fill="url(#convGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : <p style={emptyStyle}>Sin datos todavía para este periodo.</p>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginBottom: 24 }}>
        <div style={cardStyle}>
          <h3 style={titleStyle}>Canal de contacto</h3>
          {canales.some(c => c.total > 0) ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={canales}>
                <XAxis dataKey="canal" fontSize={11} />
                <YAxis fontSize={11} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="total" fill="#D4A843" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <p style={emptyStyle}>Sin datos todavía.</p>}
        </div>

        <div style={cardStyle}>
          <h3 style={titleStyle}>Páginas que más contactos generan</h3>
          {paginasConversion.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={paginasConversion} layout="vertical">
                <XAxis type="number" fontSize={11} allowDecimals={false} />
                <YAxis dataKey="page" type="category" fontSize={10} width={120} />
                <Tooltip />
                <Bar dataKey="total" fill="#003057" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <p style={emptyStyle}>Sin datos todavía.</p>}
        </div>

        <div style={cardStyle}>
          <h3 style={titleStyle}>Origen del tráfico</h3>
          {origenes.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={origenes} layout="vertical">
                <XAxis type="number" fontSize={11} allowDecimals={false} />
                <YAxis dataKey="origen" type="category" fontSize={10} width={120} />
                <Tooltip />
                <Bar dataKey="total" fill="#B8A63F" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <p style={emptyStyle}>Sin datos todavía.</p>}
        </div>

        <div style={cardStyle}>
          <h3 style={titleStyle}>Dispositivos</h3>
          {dispositivos.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={dispositivos}>
                <XAxis dataKey="dispositivo" fontSize={11} />
                <YAxis fontSize={11} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="total" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <p style={emptyStyle}>Sin datos todavía.</p>}
        </div>

        <div style={cardStyle}>
          <h3 style={titleStyle}>Top CTAs</h3>
          {topCtas.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topCtas} layout="vertical">
                <XAxis type="number" fontSize={11} allowDecimals={false} />
                <YAxis dataKey="cta" type="category" fontSize={10} width={150} />
                <Tooltip />
                <Bar dataKey="clicks" fill="#D4A843" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <p style={emptyStyle}>Sin datos todavía.</p>}
        </div>

        <div style={cardStyle}>
          <h3 style={titleStyle}>Embudo de contactos</h3>
          <div style={{ display: "grid", gap: 10 }}>
            {[
              { l: "Nuevos sin atender", v: embudo.nuevo, c: "#3B82F6" },
              { l: "Contactados", v: embudo.contactado, c: "#F59E0B" },
              { l: "Cerrados", v: embudo.cerrado, c: "#22C55E" },
            ].map(row => (
              <div key={row.l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "#FAFAFA", borderRadius: 8 }}>
                <span style={{ fontSize: 13, color: "#444" }}>{row.l}</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: row.c }}>{row.v}</span>
              </div>
            ))}
            <p style={{ fontSize: 12, color: embudo.esperaHoras != null && embudo.esperaHoras > 24 ? "#C0392B" : "#888", margin: "4px 0 0" }}>
              {embudo.esperaHoras == null
                ? "No hay contactos pendientes de atender."
                : `El contacto sin atender más antiguo lleva ${embudo.esperaHoras} h en espera.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
