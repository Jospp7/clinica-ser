import Hero from "@/components/sections/Hero";
import Nosotros from "@/components/sections/Nosotros";
import Instalaciones from "@/components/sections/Instalaciones";
import TiposIngreso from "@/components/sections/TiposIngreso";
import Testimonios from "@/components/sections/Testimonios";
import CTAFinal from "@/components/sections/CTAFinal";
import Mapa from "@/components/sections/Mapa";
import { usePageView } from "@/hooks/useTracking";

const Index = () => {
  usePageView();

  return (
    <main>
      <Hero />
      <hr data-anim="fade-up" className="section-divider-line" />
      <Nosotros />
      <hr data-anim="fade-up" className="section-divider-line" />
      <Instalaciones />
      <hr data-anim="fade-up" className="section-divider-line" />
      <TiposIngreso />
      <hr data-anim="fade-up" className="section-divider-line" />
      <Testimonios />
      <hr data-anim="fade-up" className="section-divider-line" />
      <CTAFinal />
      <Mapa />
    </main>
  );
};

export default Index;
