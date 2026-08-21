import Seo from "@/components/Seo";
import { SITE } from "@/lib/site";
import Hero from "@/components/sections/Hero";
import Nosotros from "@/components/sections/Nosotros";
import PorQueElegirnosPreview from "@/components/sections/PorQueElegirnosPreview";

import TiposIngreso from "@/components/sections/TiposIngreso";
import EquipoPreview from "@/components/sections/EquipoPreview";
import BlogReciente from "@/components/sections/BlogReciente";
import Testimonios from "@/components/sections/Testimonios";
import CTAFinal from "@/components/sections/CTAFinal";
import Mapa from "@/components/sections/Mapa";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: SITE.nombre,
  alternateName: SITE.grupo,
  description:
    "Clínica de rehabilitación de adicciones en Puebla con más de 58 años de experiencia. Tratamiento integral para alcoholismo, drogadicción y otras adicciones.",
  url: "https://www.clinicaser.com",
  telephone: SITE.telefonoTel[0],
  email: SITE.email,
  foundingDate: SITE.fundacion.slice(-4),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tepeyahualco 39, Col. La Paz",
    addressLocality: "Puebla",
    addressRegion: "Puebla",
    postalCode: "72160",
    addressCountry: "MX",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(SITE.google.rating),
    reviewCount: String(SITE.google.reviewCount),
  },
  medicalSpecialty: "Psychiatric",
  sameAs: [SITE.redes.facebook, SITE.redes.instagram, SITE.redes.tiktok],
};

const Index = () => {
  return (
    <main>
      <Seo
        title="Clínica SER — Rehabilitación de Adicciones en Puebla"
        description="Clínica SER: 58 años tratando adicciones y salud mental en Puebla. Ingreso voluntario, involuntario y por intervención profesional. Atención 24/7."
        path="/"
        jsonLd={jsonLd}
      />
      <Hero />
      <hr data-anim="fade-up" className="section-divider-line" />
      <Nosotros />
      <hr data-anim="fade-up" className="section-divider-line" />
      <PorQueElegirnosPreview />
      <hr data-anim="fade-up" className="section-divider-line" />
      <TiposIngreso />
      <hr data-anim="fade-up" className="section-divider-line" />
      <EquipoPreview />
      <hr data-anim="fade-up" className="section-divider-line" />
      <BlogReciente />
      <hr data-anim="fade-up" className="section-divider-line" />
      <Testimonios />
      <CTAFinal />
      <Mapa />
    </main>
  );
};

export default Index;
