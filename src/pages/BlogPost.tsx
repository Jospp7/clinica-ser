import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, Calendar, Tag } from "lucide-react";
import DOMPurify from "dompurify";
import Seo from "@/components/Seo";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { SITE, waLink } from "@/lib/site";
import { trackCTAClick } from "@/hooks/useTracking";
import { useScrollToTop } from "@/hooks/useScrollToTop";

type Post = Tables<"posts">;
type Status = "loading" | "ok" | "not-found" | "error";

/**
 * SEGURIDAD — NO ELIMINAR.
 * El contenido de `posts.content` se renderiza con dangerouslySetInnerHTML.
 * Proviene de: (a) migración masiva de ~500 artículos WordPress cuyo HTML no
 * controlamos (puede traer <script>, iframes de plugins muertos, pixeles),
 * y (b) un editor admin que acepta HTML crudo — si esa cuenta se compromete,
 * cualquier <script> se ejecutaría en todo el blog.
 *
 * La sanitización ocurre en RENDER (no solo al guardar) porque hay contenido
 * que ya entró a la BD antes de esta protección y porque la migración inserta
 * directo a Supabase sin pasar por el editor. No la quites "porque estorba".
 */
const ALLOWED_TAGS = [
  "p","h2","h3","h4","h5","ul","ol","li","strong","em","b","i","u","a","img",
  "blockquote","figure","figcaption","br","hr","span","div",
  "table","thead","tbody","tr","th","td","pre","code",
];
const FORBIDDEN_TAGS = ["script","style","iframe","object","embed","form","input","button","link","meta","base"];
const ALLOWED_ATTR = ["href","title","target","src","alt","width","height","loading","class","id","rel"];

const sanitizeArticleHtml = (dirty: string, currentHost: string) => {
  // Fuerza rel="noopener noreferrer" en <a> externos y no permite target sin rel.
  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName === "A") {
      const href = node.getAttribute("href") || "";
      let isExternal = false;
      try {
        const u = new URL(href, `https://${currentHost}`);
        isExternal = u.host !== "" && u.host !== currentHost;
      } catch { /* href relativo o inválido */ }
      if (isExternal || node.getAttribute("target")) {
        node.setAttribute("rel", "noopener noreferrer");
        if (!node.getAttribute("target")) node.setAttribute("target", "_blank");
      }
    }
  });
  const clean = DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    FORBID_TAGS: FORBIDDEN_TAGS,
    FORBID_ATTR: ["onerror","onload","onclick","onmouseover","onmouseout","onfocus","onblur","onchange","onsubmit","onkeydown","onkeyup","onkeypress"],
    // Bloquea javascript:, vbscript:, file:, etc. Permite http(s), mailto, tel, y data:image para <img>.
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel|ftp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    ADD_DATA_URI_TAGS: ["img"],
  });
  DOMPurify.removeHook("afterSanitizeAttributes");
  return clean;
};

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("es-MX", {
      day: "numeric", month: "long", year: "numeric",
    });
  } catch {
    return "";
  }
};

const BlogPost = () => {
  useScrollToTop();
  const { slug } = useParams<{ slug: string }>();
  const [status, setStatus] = useState<Status>("loading");
  const [post, setPost] = useState<Post | null>(null);

  const safeContent = useMemo(() => {
    if (!post?.content) return "";
    const host = typeof window !== "undefined" ? window.location.hostname : "";
    return sanitizeArticleHtml(post.content, host);
  }, [post?.content]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!slug) {
        setStatus("not-found");
        return;
      }
      setStatus("loading");
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("[BlogPost] fetch failed:", error);
        setStatus("error");
        return;
      }
      if (!data) {
        setStatus("not-found");
        return;
      }
      setPost(data);
      setStatus("ok");
    };
    load();
    return () => { cancelled = true; };
  }, [slug]);

  const seoTitle = post ? `${post.title} — Blog Clínica SER` : "Blog — Clínica SER Puebla";
  const seoDesc = post?.excerpt ?? "";

  return (
    <main className="bp">
      <Seo
        title={seoTitle}
        description={seoDesc}
        path={`/blog/${slug ?? ""}`}
        noindex={status !== "ok"}
      />

      <div className="bp__inner">
        <Link to="/blog" className="bp__back">
          <ArrowLeft size={16} aria-hidden="true" /> Volver al blog
        </Link>

        {status === "loading" && (
          <p className="bp__state">Cargando…</p>
        )}

        {status === "not-found" && (
          <div className="bp__state-block">
            <h1 className="bp__state-title">No encontramos este artículo</h1>
            <p className="bp__state-text">
              Es posible que se haya movido o que el enlace esté desactualizado.
            </p>
            <Link to="/blog" className="bp__cta bp__cta--primary">
              <ArrowLeft size={16} aria-hidden="true" /> Ver todos los artículos
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="bp__state-block">
            <h1 className="bp__state-title">No pudimos cargar el artículo</h1>
            <p className="bp__state-text">
              Revisa tu conexión e inténtalo nuevamente. Si necesitas atención,
              podemos ayudarte por teléfono o WhatsApp.
            </p>
            <div className="bp__ctas">
              <a
                href={`tel:${SITE.telefonoTel[0]}`}
                className="bp__cta bp__cta--primary"
                onClick={() => trackCTAClick("LLAMAR_BLOG_ERROR")}
              >
                <Phone size={16} aria-hidden="true" /> Llamar
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bp__cta bp__cta--wa"
                onClick={() => trackCTAClick("WHATSAPP_BLOG_ERROR")}
              >
                <MessageCircle size={16} aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </div>
        )}

        {status === "ok" && post && (
          <article className="bp__article">
            <header className="bp__header">
              <div className="bp__meta">
                {post.category && (
                  <span className="bp__meta-item"><Tag size={14} aria-hidden="true" /> {post.category}</span>
                )}
                {post.created_at && (
                  <span className="bp__meta-item"><Calendar size={14} aria-hidden="true" /> {formatDate(post.created_at)}</span>
                )}
              </div>
              <h1 className="bp__title">{post.title}</h1>
              {post.author && <p className="bp__author">Por {post.author}</p>}
            </header>

            {post.content && (
              <div
                className="bp__content"
                // SEGURIDAD: `safeContent` viene de DOMPurify — ver comentario arriba. NO quitar.
                dangerouslySetInnerHTML={{ __html: safeContent }}
              />
            )}

            <div className="bp__foot-cta">
              <h2 className="bp__foot-title">¿Necesitas ayuda ahora?</h2>
              <p className="bp__foot-text">
                Nuestro equipo atiende las 24 horas, los 365 días del año.
              </p>
              <div className="bp__ctas">
                <a
                  href={`tel:${SITE.telefonoTel[0]}`}
                  className="bp__cta bp__cta--primary"
                  onClick={() => trackCTAClick("LLAMAR_BLOG_POST")}
                >
                  <Phone size={16} aria-hidden="true" /> {SITE.telefonos[0]}
                </a>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bp__cta bp__cta--wa"
                  onClick={() => trackCTAClick("WHATSAPP_BLOG_POST")}
                >
                  <MessageCircle size={16} aria-hidden="true" /> WhatsApp
                </a>
              </div>
            </div>
          </article>
        )}
      </div>

      <style>{`
        .bp { background: #FFFFFF; min-height: 100vh; padding: clamp(80px,10vw,120px) clamp(20px,4vw,32px); }
        .bp__inner { max-width: 760px; margin: 0 auto; }
        .bp__back { display: inline-flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 14px; color: #555; text-decoration: none; margin-bottom: 32px; }
        .bp__back:hover { color: #1A1A2E; }
        .bp__state { font-family: 'Inter', sans-serif; color: #555; text-align: center; padding: 48px 0; }
        .bp__state-block { text-align: center; padding: 48px 0; }
        .bp__state-title { font-family: 'Inter', sans-serif; font-size: clamp(22px,3vw,32px); font-weight: 700; color: #1A1A2E; margin: 0 0 12px; }
        .bp__state-text { font-family: 'Inter', sans-serif; color: #555; margin: 0 0 24px; line-height: 1.7; }
        .bp__ctas { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .bp__cta { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 60px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; transition: all .2s; }
        .bp__cta--primary { background: #C8E64A; color: #1A1A2E; }
        .bp__cta--primary:hover { background: #8AB83A; color: white; }
        .bp__cta--wa { background: #25D366; color: white; }
        .bp__cta--wa:hover { background: #1DA851; }

        .bp__header { margin-bottom: 40px; }
        .bp__meta { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 16px; }
        .bp__meta-item { display: inline-flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 13px; color: #777; text-transform: uppercase; letter-spacing: .05em; }
        .bp__title { font-family: 'Inter', sans-serif; font-size: clamp(28px,4vw,44px); font-weight: 700; color: #1A1A2E; line-height: 1.2; margin: 0 0 12px; }
        .bp__author { font-family: 'Inter', sans-serif; font-size: 14px; color: #666; margin: 0; }
        .bp__content { font-family: 'Inter', sans-serif; font-size: 17px; color: #333; line-height: 1.8; }
        .bp__content :is(h2, h3) { color: #1A1A2E; margin-top: 1.6em; }
        .bp__content p { margin: 0 0 1.2em; }
        .bp__content a { color: #8AB83A; }
        .bp__content img { max-width: 100%; height: auto; border-radius: 12px; }

        .bp__foot-cta { margin-top: 64px; padding: 32px; background: #F5F5F5; border-radius: 20px; text-align: center; }
        .bp__foot-title { font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 700; color: #1A1A2E; margin: 0 0 8px; }
        .bp__foot-text { font-family: 'Inter', sans-serif; color: #555; margin: 0 0 20px; }
      `}</style>
    </main>
  );
};

export default BlogPost;