import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const DEDUPE_MS = 30_000;
const DOMINIOS_PRODUCCION = ["clinicaser.com", "www.clinicaser.com"];

const esProduccion = () =>
  typeof window !== "undefined" &&
  DOMINIOS_PRODUCCION.includes(window.location.hostname);

/** Hosts de desarrollo/preview: su tráfico NO debe contaminar las analíticas. */
export function isInternalHost(host: string): boolean {
  return /(^|\.)lovable\.dev$|(^|\.)lovable\.app$|(^|\.)lovableproject\.com$|localhost|^127\.0\.0\.1$|^0\.0\.0\.0$/.test(host);
}

function getSessionId(): string {
  let sid = sessionStorage.getItem("ser_session");
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem("ser_session", sid);
  }
  return sid;
}

function isReturningVisitor(): boolean {
  const seen = localStorage.getItem("ser_visitor");
  if (!seen) {
    localStorage.setItem("ser_visitor", new Date().toISOString());
    return false;
  }
  return true;
}

function getDevice(): "mobile" | "tablet" | "desktop" {
  const w = window.innerWidth;
  if (w < 640) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function getReferrerSource(): string {
  const ref = document.referrer;
  if (!ref) return "directo";
  try {
    const host = new URL(ref).hostname.replace(/^www\./, "");
    if (host === window.location.hostname) return "interno";
    if (/google\./.test(host)) return "google";
    if (/bing\.|duckduckgo\.|yahoo\./.test(host)) return "otros buscadores";
    if (/facebook\.|instagram\.|t\.co|twitter\.|x\.com|linkedin\.|tiktok\./.test(host)) return "redes sociales";
    if (/whatsapp|wa\.me/.test(host)) return "whatsapp";
    return host;
  } catch {
    return "otros";
  }
}

function baseMetadata() {
  return {
    session_id: getSessionId(),
    device: getDevice(),
    referrer_source: getReferrerSource(),
    returning: isReturningVisitor(),
    host: window.location.hostname,
  };
}

/** Evita duplicados del mismo evento en la misma ruta dentro de una ventana corta. */
function shouldSkip(key: string): boolean {
  try {
    const raw = sessionStorage.getItem("ser_track_dedupe");
    const map: Record<string, number> = raw ? JSON.parse(raw) : {};
    const now = Date.now();
    if (map[key] && now - map[key] < DEDUPE_MS) return true;
    map[key] = now;
    sessionStorage.setItem("ser_track_dedupe", JSON.stringify(map));
    return false;
  } catch {
    return false;
  }
}

async function sendEvent(
  eventType: string,
  opts: { label?: string; page?: string; dedupeKey?: string; extra?: Record<string, unknown> } = {}
) {
  const page = opts.page ?? window.location.pathname;
  if (page.startsWith("/admin")) return;
  if (isInternalHost(window.location.hostname)) return;
  if (opts.dedupeKey && shouldSkip(opts.dedupeKey)) return;
  try {
    const { error } = await supabase.from("page_events").insert({
      event_type: eventType,
      label: opts.label ?? null,
      page,
      metadata: { ...baseMetadata(), ...(opts.extra ?? {}) },
    });
    if (error) console.error(`[tracking] ${eventType} insert failed:`, error);
  } catch (err) {
    console.error(`[tracking] ${eventType} threw:`, err);
  }
}

/** Se monta UNA sola vez en el layout público: registra pageviews por cambio de ruta. */
export function usePageTracking() {
  const location = useLocation();
  const depthSent = useRef<string | null>(null);

  useEffect(() => {
    if (!esProduccion()) return;

    const page = location.pathname;
    sendEvent("pageview", { page, dedupeKey: `pageview:${page}` });

    depthSent.current = null;
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = window.scrollY / total;
      if (pct >= 0.75 && depthSent.current !== page) {
        depthSent.current = page;
        sendEvent("scroll_depth", { page, label: "75", dedupeKey: `scroll75:${page}` });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);
}

export function trackCTAClick(element: string) {
  if (!esProduccion()) return;

  void sendEvent("cta_click", { label: element });
}

export function trackFormSubmit(source: string) {
  void sendEvent("form_submit", { label: source });
}
