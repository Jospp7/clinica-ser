import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { trackCTAClick } from "@/hooks/useTracking";

type Post = Pick<Tables<"posts">, "id" | "title" | "slug" | "category" | "cover_image" | "created_at">;

const formatFecha = (iso: string) =>
  new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });

const BlogReciente = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    supabase
      .from("posts")
      .select("id, title, slug, category, cover_image, created_at")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          setFailed(true);
          return;
        }
        setPosts(data ?? []);
      });
    return () => {
      active = false;
    };
  }, []);

  if (failed) return null;
  if (posts !== null && posts.length === 0) return null;

  return (
    <section className="blogrec deco-host">
      <span className="brand-deco brand-deco--gold brand-deco--a" aria-hidden="true" />
      <span className="brand-deco brand-deco--navy brand-deco--b" aria-hidden="true" />
      <div className="blogrec__inner">
        <h2 className="blogrec__title" data-anim="fade-up">Recursos e información para tu familia</h2>
        <p className="blogrec__sub" data-anim="fade-up">
          Artículos sobre adicciones, tratamiento y apoyo familiar.
        </p>

        <div className="blogrec__grid">
          {posts === null
            ? [0, 1, 2].map((i) => <div key={i} className="blogrec__skeleton" aria-hidden="true" />)
            : posts.map((p, i) => (
                <Link
                  key={p.id}
                  to={`/blog/${p.slug}`}
                  className="blogrec__card"
                  data-anim="fade-up"
                  data-anim-delay={`${i * 0.12}s`}
                >
                  <div className="blogrec__media">
                    {p.cover_image ? (
                      <img src={p.cover_image} alt={p.title} loading="lazy" />
                    ) : (
                      <div className="blogrec__media-fallback" aria-hidden="true" />
                    )}
                  </div>
                  <div className="blogrec__body">
                    {p.category && <span className="blogrec__cat">{p.category}</span>}
                    <h3 className="blogrec__card-title">{p.title}</h3>
                    <span className="blogrec__date">{formatFecha(p.created_at)}</span>
                  </div>
                </Link>
              ))}
        </div>

        <div className="blogrec__cta" data-anim="fade-up">
          <Link to="/blog" className="blogrec__btn" onClick={() => trackCTAClick("HOME_A_BLOG")}>
            Ver todos los artículos
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <style>{`
        .blogrec { background: hsl(var(--muted) / 0.35); padding: clamp(64px,8vw,120px) 24px; }
        .blogrec__inner { max-width: 1200px; margin: 0 auto; }
        .blogrec__title { font-family: 'Source Sans 3', sans-serif; font-size: clamp(32px,5vw,60px); font-weight: 800; color: var(--brand-navy); line-height: 1.1; margin: 0 0 16px; text-align: center; letter-spacing: -0.02em; }
        .blogrec__sub { font-family: 'Source Sans 3', sans-serif; font-size: clamp(15px,1.6vw,18px); color: hsl(var(--muted-foreground)); line-height: 1.7; margin: 0 auto clamp(40px,5vw,56px); text-align: center; max-width: 640px; }
        .blogrec__grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .blogrec__card { display: flex; flex-direction: column; background: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-radius: 8px; overflow: hidden; text-decoration: none; box-shadow: 0 12px 30px -20px hsl(var(--secondary) / 0.35); transition: transform .3s, box-shadow .3s; }
        .blogrec__card:hover { transform: translateY(-4px); box-shadow: 0 16px 34px -20px hsl(var(--secondary) / 0.5); }
        .blogrec__media { aspect-ratio: 16 / 9; overflow: hidden; }
        .blogrec__media img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .blogrec__media-fallback { width: 100%; height: 100%; background: linear-gradient(135deg, var(--brand-navy), var(--brand-gold)); opacity: .85; }
        .blogrec__body { display: flex; flex-direction: column; gap: 10px; padding: 24px; }
        .blogrec__cat { font-family: 'Source Sans 3', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--brand-navy); }
        .blogrec__card-title { font-family: 'Source Sans 3', sans-serif; font-size: 18px; font-weight: 700; color: var(--brand-navy); margin: 0; line-height: 1.35; }
        .blogrec__date { font-family: 'Source Sans 3', sans-serif; font-size: 13px; color: hsl(var(--muted-foreground)); }
        .blogrec__skeleton { min-height: 300px; border-radius: 8px; background: hsl(var(--muted)); animation: blogrecPulse 1.4s ease-in-out infinite; }
        @keyframes blogrecPulse { 0%,100% { opacity: .55; } 50% { opacity: .9; } }
        .blogrec__cta { text-align: center; margin-top: clamp(40px,5vw,56px); }
        .blogrec__btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: var(--brand-gold); color: var(--brand-navy); padding: 16px 32px; border-radius: 60px; font-family: 'Source Sans 3', sans-serif; font-size: 15px; font-weight: 700; text-decoration: none; transition: background .2s, transform .2s; }
        .blogrec__btn:hover { background: #B8A63F; color: var(--brand-navy); transform: translateY(-2px); }
        @media (max-width: 768px) { .blogrec__grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
};

export default BlogReciente;
