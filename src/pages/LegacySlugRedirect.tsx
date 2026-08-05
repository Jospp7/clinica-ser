import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import NotFound from "./NotFound";

// Rutas reales del sitio: nunca deben tratarse como slug heredado de WordPress.
const KNOWN_ROUTES = new Set([
  "",
  "tratamiento",
  "instalaciones",
  "programas",
  "padecimientos",
  "guias",
  "equipo",
  "por-que-elegirnos",
  "guia-ingreso",
  "guia-intervencion",
  "preguntas-frecuentes",
  "blog",
  "admin",
]);

type State = "checking" | "not-found";

const LegacySlugRedirect = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const slug = segments.length === 1 ? segments[0] : "";
  const eligible = Boolean(slug) && !KNOWN_ROUTES.has(slug);

  const [state, setState] = useState<State>(eligible ? "checking" : "not-found");
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    if (!eligible) {
      setState("not-found");
      setTarget(null);
      return;
    }
    let cancelled = false;
    setState("checking");
    setTarget(null);

    supabase
      .from("posts")
      .select("slug")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !data) {
          setState("not-found");
          return;
        }
        setTarget(`/blog/${data.slug}`);
      });

    return () => {
      cancelled = true;
    };
  }, [eligible, slug]);

  if (target) return <Navigate to={target} replace />;

  if (state === "checking") {
    return (
      <div className="lsr">
        <span className="lsr__spinner" aria-label="Cargando" role="status" />
        <style>{`
          .lsr { min-height: 60vh; display: flex; align-items: center; justify-content: center; background: #F5F5F5; }
          .lsr__spinner { width: 28px; height: 28px; border-radius: 50%; border: 3px solid rgba(0,0,0,0.1); border-top-color: #8A7826; animation: lsr-spin .7s linear infinite; }
          @keyframes lsr-spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return <NotFound />;
};

export default LegacySlugRedirect;