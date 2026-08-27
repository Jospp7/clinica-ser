interface Env {
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_PUBLISHABLE_KEY?: string;
}

interface PublishedPost {
  slug: string;
  updated_at: string;
}

const STATIC_URLS = [
  { loc: "https://www.clinicaser.com/", changefreq: "weekly", priority: "1.0" },
  { loc: "https://www.clinicaser.com/equipo", changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.clinicaser.com/guia-ingreso", changefreq: "monthly", priority: "0.7" },
  { loc: "https://www.clinicaser.com/guia-intervencion", changefreq: "monthly", priority: "0.7" },
  { loc: "https://www.clinicaser.com/preguntas-frecuentes", changefreq: "monthly", priority: "0.7" },
  { loc: "https://www.clinicaser.com/blog", changefreq: "weekly", priority: "0.8" },
  { loc: "https://www.clinicaser.com/aviso-privacidad", changefreq: "yearly", priority: "0.3" },
];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatDate(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
}

async function fetchPublishedPosts(env: Env): Promise<PublishedPost[]> {
  const url = `${env.VITE_SUPABASE_URL}/rest/v1/posts?select=slug,updated_at&status=eq.published&order=updated_at.desc`;

  const res = await fetch(url, {
    headers: {
      apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY || "",
      Authorization: `Bearer ${env.VITE_SUPABASE_PUBLISHABLE_KEY || ""}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) return [];
  return (await res.json()) as PublishedPost[];
}

function buildSitemap(posts: PublishedPost[]): string {
  const staticEntries = STATIC_URLS.map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  ).join("\n");

  const postEntries = posts
    .map((post) => {
      const lastmod = formatDate(post.updated_at);
      const lastmodLine = lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : "";
      return `  <url>
    <loc>${escapeXml(`https://www.clinicaser.com/blog/${post.slug}`)}</loc>
${lastmodLine}    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${postEntries}
</urlset>`;
}

export const onRequestGet = async (context: { env: Env }): Promise<Response> => {
  const env = context.env;
  let posts: PublishedPost[] = [];

  if (env.VITE_SUPABASE_URL && env.VITE_SUPABASE_PUBLISHABLE_KEY) {
    try {
      posts = await fetchPublishedPosts(env);
    } catch {
      posts = [];
    }
  }

  const sitemap = buildSitemap(posts);

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=3600",
    },
  });
};
