import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { ArrowRight, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type PostCard = Pick<
  Tables<"posts">,
  "id" | "title" | "slug" | "excerpt" | "category" | "cover_image" | "created_at"
>;

const PAGE_SIZE = 24;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });

const Blog = () => {
  useScrollToTop();
  const [posts, setPosts] = useState<PostCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, excerpt, category, cover_image, created_at")
        .eq("status", "published")
        .order("created_at", { ascending: false });
      if (!active) return;
      if (error) setError(error.message);
      else setPosts(data ?? []);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main>
      <Seo
        title="Blog — Recursos sobre Adicciones y Salud Mental | Clínica SER"
        description="Guías, artículos y recursos sobre adicciones, salud mental, apoyo familiar y prevención de recaídas. Contenido escrito por el equipo clínico de Clínica SER en Puebla."
        path="/blog"
      />
      <section className="blog-hero">
        <div className="blog-hero__overlay" />
        <div className="blog-hero__content" data-anim="fade-up">
          <span className="blog-hero__tag">BLOG</span>
          <h1 className="blog-hero__title">Recursos y guías<br />sobre adicciones</h1>
          <p className="blog-hero__sub">Información confiable para pacientes y familias, escrita por nuestro equipo de profesionales.</p>
        </div>
      </section>

      <section className="blog-grid-section">
        {loading && <p className="blog-state">Cargando artículos…</p>}
        {!loading && error && <p className="blog-state">No se pudieron cargar los artículos: {error}</p>}
        {!loading && !error && posts.length === 0 && <p className="blog-state">Aún no hay artículos publicados.</p>}
        {!loading && !error && posts.length > 0 && (
          <>
            <div className="blog-container">
              {posts.slice(0, visible).map((post, i) => (
                <article key={post.id} className="blog-card" data-anim="fade-up" data-anim-delay={`${(i % 3) * 0.12}s`}>
                  <Link to={`/blog/${post.slug}`} className="blog-card__anchor">
                    {post.cover_image ? (
                      <img src={post.cover_image} alt={post.title} loading="lazy" decoding="async" className="blog-card__img" />
                    ) : (
                      <div className="blog-card__img blog-card__img--ph" aria-hidden="true">
                        <FileText size={32} />
                      </div>
                    )}
                    <div className="blog-card__body">
                      <div className="blog-card__meta">
                        {post.category && <span className="blog-card__cat">{post.category}</span>}
                        <span className="blog-card__date">{formatDate(post.created_at)}</span>
                      </div>
                      <h2 className="blog-card__title">{post.title}</h2>
                      {post.excerpt && <p className="blog-card__excerpt">{post.excerpt}</p>}
                      <span className="blog-card__link">Leer más <ArrowRight size={14} aria-hidden="true" /></span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            {visible < posts.length && (
              <div className="blog-more">
                <button className="blog-more__btn" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                  VER MÁS ARTÍCULOS
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <section className="blog-newsletter">
        <div className="blog-newsletter__inner" data-anim="fade-up">
          <h2 className="blog-newsletter__title">Recibe nuestros artículos</h2>
          <p className="blog-newsletter__text">Suscríbete para recibir información útil sobre adicciones y salud mental.</p>
          <div className="blog-newsletter__form">
            <input type="email" placeholder="tu correo electrónico" className="blog-newsletter__input" />
            <button className="blog-newsletter__btn">SUSCRIBIRME</button>
          </div>
        </div>
      </section>

      <style>{`
        .blog-hero { position: relative; min-height: 50vh; display: flex; align-items: center; background: url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80') center/cover; }
        .blog-hero__overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,46,.88), rgba(26,26,46,.6)); }
        .blog-hero__content { position: relative; z-index: 2; max-width: 700px; padding: 120px clamp(24px,5vw,80px) 80px; }
        .blog-hero__tag { font-family: 'Inter', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: .15em; color: #C8E64A; display: block; margin-bottom: 16px; }
        .blog-hero__title { font-family: 'Inter', sans-serif; font-size: clamp(28px,4vw,48px); font-weight: 700; color: white; line-height: 1.2; margin: 0 0 16px; }
        .blog-hero__sub { font-family: 'Inter', sans-serif; font-size: 16px; color: rgba(255,255,255,.7); line-height: 1.7; margin: 0; }

        .blog-grid-section { background: #FFFFFF; padding: clamp(64px,8vw,120px) 24px; }
        .blog-container { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; max-width: 1200px; margin: 0 auto; }
        .blog-card { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 20px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.06); transition: transform .3s, box-shadow .3s; cursor: pointer; }
        .blog-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
        .blog-card__img { width: 100%; height: 200px; object-fit: cover; display: block; }
        .blog-card__anchor { display: block; text-decoration: none; color: inherit; }
        .blog-card__img--ph { display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #1B2A4A, #2c3f68); color: #C8E64A; }
        .blog-state { font-family: 'Inter', sans-serif; font-size: 15px; color: #666; text-align: center; margin: 0; }
        .blog-more { text-align: center; margin-top: 40px; }
        .blog-more__btn { background: #C8E64A; color: #1A1A2E; padding: 14px 28px; border-radius: 60px; border: none; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: .06em; cursor: pointer; transition: background .2s, color .2s; }
        .blog-more__btn:hover { background: #8AB83A; color: white; }
        .blog-card__body { padding: 24px; }
        .blog-card__meta { display: flex; justify-content: space-between; margin-bottom: 12px; }
        .blog-card__cat { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; color: #8AB83A; text-transform: uppercase; letter-spacing: .08em; }
        .blog-card__date { font-family: 'Inter', sans-serif; font-size: 11px; color: #999; }
        .blog-card__title { font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 700; color: #1A1A2E; margin: 0 0 8px; line-height: 1.4; }
        .blog-card__excerpt { font-family: 'Inter', sans-serif; font-size: 14px; color: #666; line-height: 1.7; margin: 0 0 16px; }
        .blog-card__link { display: inline-flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; color: #C8E64A; }

        .blog-newsletter { background: #1B2A4A; padding: clamp(64px,8vw,100px) 24px; text-align: center; }
        .blog-newsletter__inner { max-width: 500px; margin: 0 auto; }
        .blog-newsletter__title { font-family: 'Inter', sans-serif; font-size: clamp(24px,3vw,36px); font-weight: 700; color: white; margin: 0 0 12px; }
        .blog-newsletter__text { font-family: 'Inter', sans-serif; font-size: 15px; color: rgba(255,255,255,.6); margin: 0 0 24px; }
        .blog-newsletter__form { display: flex; gap: 12px; }
        .blog-newsletter__input { flex: 1; padding: 14px 16px; border: 1px solid rgba(255,255,255,.2); border-radius: 60px; background: rgba(255,255,255,.1); color: white; font-family: 'Inter', sans-serif; font-size: 14px; outline: none; }
        .blog-newsletter__input::placeholder { color: rgba(255,255,255,.4); }
        .blog-newsletter__btn { background: #C8E64A; color: #1A1A2E; padding: 14px 24px; border-radius: 60px; border: none; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; transition: background .2s; white-space: nowrap; }
        .blog-newsletter__btn:hover { background: #8AB83A; color: white; }

        @media (max-width: 900px) { .blog-container { grid-template-columns: 1fr; } }
        @media (max-width: 600px) { .blog-newsletter__form { flex-direction: column; } }
      `}</style>
    </main>
  );
};

export default Blog;
