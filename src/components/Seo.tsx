import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.clinicaser.com";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  jsonLd?: object;
  noindex?: boolean;
  type?: "website" | "article";
  image?: string;
}

export default function Seo({ title, description, path, jsonLd, noindex, type = "website", image }: SeoProps) {
  const canonicalUrl = /^https?:\/\//i.test(path)
    ? path
    : `${SITE_URL}/${path.replace(/^\/+/, "")}`;
  // TODO: subir /public/images/og-default.jpg — imagen por defecto para compartir (logo o fachada de la clínica, 1200x630px).
  const ogImage = image
    ? (/^https?:\/\//i.test(image) ? image : `${SITE_URL}/${image.replace(/^\/+/, "")}`)
    : `${SITE_URL}/images/og-default.jpg`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Clínica SER" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}