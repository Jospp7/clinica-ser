import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { trackCTAClick } from "@/hooks/useTracking";
import { SITE, waLink } from "@/lib/site";
import { Phone, MessageCircle } from "lucide-react";

type FaqItem = {
  q: string;
  a: React.ReactNode;
  // plain text version for JSON-LD (schema.org FAQPage requires string answer)
  aText: string;
};

const FAQS: FaqItem[] = [
  {
    q: "¿Por qué elegir Clínica SER Puebla?",
    a: (
      <>
        <p>
          Esta es la pregunta más importante que puedes hacerte acerca de
          Clínica SER Puebla. Muchos centros de rehabilitación de adicciones en
          México se describen de manera similar, promocionando sus servicios
          como especialistas o expertos en la rehabilitación de adicciones,
          personal profesional o los mismos modelos de atención. Otras
          mencionan que manejan el Modelo Minnesota, lo que provoca confusión
          en las familias que están en crisis y necesitadas de apoyo, cuando
          todos los programas suenan parecidos o iguales.
        </p>
        <p>
          Clínica SER es un centro de adicciones en Puebla. Nace de nuestro
          hospital de salud mental Casa de Salud, S.A. de C.V., fundado en
          1967, con una sólida y reputada trayectoria en el tratamiento de
          adicciones. Contamos con un equipo médico multidisciplinario con
          estudios, capacitación y entrenamiento en las mejores y más
          reconocidas instituciones y clínicas del mundo.
        </p>
        <p>
          La mayoría de las personas con problemas de adicciones o alcoholismo
          presentan, además, una enfermedad de salud mental. SER® es la única
          clínica privada en México que cuenta con más de 50 años de
          experiencia ayudando a personas con estos padecimientos, sumando a
          miles las familias que se han beneficiado con nuestra esmerada
          atención.
        </p>
        <p>
          En Clínica SER Puebla, te ofrecemos un servicio con los más altos
          estándares de calidad, a cuotas accesibles.
        </p>
        <p>
          Recomendamos que, antes de tomar cualquier decisión de internamiento,
          visiten las clínicas de adicciones que consideren apropiadas,
          conozcan sus <Link to="/instalaciones">instalaciones</Link> y{" "}
          <Link to="/tratamiento">programas</Link>, platiquen con sus
          terapeutas y soliciten las acreditaciones pertinentes de su personal,
          con el fin de comprobar la preparación de las personas que estarán a
          cargo de tu ser querido.
        </p>
      </>
    ),
    aText:
      "Esta es la pregunta más importante que puedes hacerte acerca de Clínica SER Puebla. Muchos centros de rehabilitación de adicciones en México se describen de manera similar, promocionando sus servicios como especialistas o expertos en la rehabilitación de adicciones, personal profesional o los mismos modelos de atención. Otras mencionan que manejan el Modelo Minnesota, lo que provoca confusión en las familias que están en crisis y necesitadas de apoyo, cuando todos los programas suenan parecidos o iguales. Clínica SER es un centro de adicciones en Puebla. Nace de nuestro hospital de salud mental Casa de Salud, S.A. de C.V., fundado en 1967, con una sólida y reputada trayectoria en el tratamiento de adicciones. Contamos con un equipo médico multidisciplinario con estudios, capacitación y entrenamiento en las mejores y más reconocidas instituciones y clínicas del mundo. La mayoría de las personas con problemas de adicciones o alcoholismo presentan, además, una enfermedad de salud mental. SER® es la única clínica privada en México que cuenta con más de 50 años de experiencia ayudando a personas con estos padecimientos, sumando a miles las familias que se han beneficiado con nuestra esmerada atención. En Clínica SER Puebla, te ofrecemos un servicio con los más altos estándares de calidad, a cuotas accesibles. Recomendamos que, antes de tomar cualquier decisión de internamiento, visiten las clínicas de adicciones que consideren apropiadas, conozcan sus instalaciones y programas, platiquen con sus terapeutas y soliciten las acreditaciones pertinentes de su personal, con el fin de comprobar la preparación de las personas que estarán a cargo de tu ser querido.",
  },
  {
    q: "¿Qué debe llevar el paciente a Clínica SER?",
    a: (
      <ul>
        <li>Ropa casual y deportiva.</li>
        <li>
          Crema de rasurar, chanclas de baño y desodorante (en Clínica SER
          proporcionamos los artículos de aseo personal esenciales, como son:
          shampoo, pasta y cepillo de dientes, jabón, esponja, toalla y bata de
          baño. Los rastrillos se deben entregar a la Central de Enfermeras
          para su control y seguridad)
        </li>
        <li>
          Si el paciente fuma, puede traer sus propios cigarros, los cuales se
          deberán entregar a la Central de Enfermeras de la clínica para su
          administración y control. En Clínica SER no vendemos cigarrillos.
          Está permitido fumar en las áreas de jardines de la clínica.
        </li>
        <li>Credencial de elector del IFE.</li>
        <li>
          En Clínica SER proporcionamos a nuestros pacientes —sin costo
          adicional— una despensa de alimentos las 24 horas del día, que
          incluye: jamón, fruta, queso, leche, cereal, galletas, palomitas,
          jugos, sopas, café descafeinado, miel, cátsup, mayonesa y pan; de
          forma independiente al desayuno, comida y cena que servimos a diario.
          Sin embargo, si el paciente desea contar con dinero para golosinas o
          artículos personales, este deberá ser depositado en la administración
          de la clínica para su control.
        </li>
      </ul>
    ),
    aText:
      "Ropa casual y deportiva. Crema de rasurar, chanclas de baño y desodorante (en Clínica SER proporcionamos los artículos de aseo personal esenciales, como son: shampoo, pasta y cepillo de dientes, jabón, esponja, toalla y bata de baño. Los rastrillos se deben entregar a la Central de Enfermeras para su control y seguridad). Si el paciente fuma, puede traer sus propios cigarros, los cuales se deberán entregar a la Central de Enfermeras de la clínica para su administración y control. En Clínica SER no vendemos cigarrillos. Está permitido fumar en las áreas de jardines de la clínica. Credencial de elector del IFE. En Clínica SER proporcionamos a nuestros pacientes —sin costo adicional— una despensa de alimentos las 24 horas del día, que incluye: jamón, fruta, queso, leche, cereal, galletas, palomitas, jugos, sopas, café descafeinado, miel, cátsup, mayonesa y pan; de forma independiente al desayuno, comida y cena que servimos a diario. Sin embargo, si el paciente desea contar con dinero para golosinas o artículos personales, este deberá ser depositado en la administración de la clínica para su control.",
  },
  {
    q: "¿Qué NO debe llevar el paciente a Clínica SER Puebla?",
    a: (
      <ul>
        <li>Televisiones portátiles.</li>
        <li>Planchas.</li>
        <li>Armas de fuego.</li>
        <li>Artículos punzocortantes.</li>
        <li>Cobertores o calentadores eléctricos.</li>
        <li>Ordenadores portátiles.</li>
        <li>Teléfonos celulares.</li>
        <li>Radios de comunicación.</li>
        <li>Material pornográfico.</li>
        <li>Artículos de valor.</li>
        <li>Vitaminas o productos naturistas.</li>
        <li>Instrumentos musicales.</li>
        <li>Estupefacientes, drogas o ninguna sustancia que contenga alcohol.</li>
        <li>Medicamentos.</li>
      </ul>
    ),
    aText:
      "Televisiones portátiles · Planchas · Armas de fuego · Artículos punzocortantes · Cobertores o calentadores eléctricos · Ordenadores portátiles · Teléfonos celulares · Radios de comunicación · Material pornográfico · Artículos de valor · Vitaminas o productos naturistas · Instrumentos musicales · Estupefacientes, drogas o ninguna sustancia que contenga alcohol · Medicamentos.",
  },
  {
    q: "¿Puede el paciente recibir/hacer llamadas a sus familiares y enviar/recibir correspondencia y/o correos electrónicos durante el internamiento?",
    a: (
      <p>
        Sí, nuestros pacientes pueden recibir y hacer llamadas en horarios
        específicos, en el momento en que su Consejero lo considere apropiado.
        Además, pueden enviar y recibir correspondencia física. Sin embargo, no
        tendrán acceso al correo electrónico durante el internamiento.
      </p>
    ),
    aText:
      "Sí, nuestros pacientes pueden recibir y hacer llamadas en horarios específicos, en el momento en que su Consejero lo considere apropiado. Además, pueden enviar y recibir correspondencia física. Sin embargo, no tendrán acceso al correo electrónico durante el internamiento.",
  },
  {
    q: "¿Puede el paciente recibir visitas familiares durante el internamiento?",
    a: (
      <p>
        El Consejero determinará a partir de cuándo nuestros pacientes pueden
        recibir visitas, sea el día 21 del internamiento o antes, y la
        administración de la clínica informará a los familiares los horarios y
        días para realizar dicho encuentro.
      </p>
    ),
    aText:
      "El Consejero determinará a partir de cuándo nuestros pacientes pueden recibir visitas, sea el día 21 del internamiento o antes, y la administración de la clínica informará a los familiares los horarios y días para realizar dicho encuentro.",
  },
  {
    q: "¿Cuenta el personal profesional de Clínica SER con las acreditaciones que avalan su preparación académica (títulos, cédulas y/o diplomas)?",
    a: (
      <p>
        Sí, el 100% de nuestro personal profesional cuenta con los documentos
        que acreditan su formación académica. Específicamente, contamos con{" "}
        <Link to="/equipo">personal de primer nivel</Link> con grados de
        Especialidad, Maestría y Licenciatura, entrenados en las clínicas e
        institutos de salud más reconocidos del mundo en materia de atención de
        adicciones.
      </p>
    ),
    aText:
      "Sí, el 100% de nuestro personal profesional cuenta con los documentos que acreditan su formación académica. Específicamente, contamos con personal de primer nivel con grados de Especialidad, Maestría y Licenciatura, entrenados en las clínicas e institutos de salud más reconocidos del mundo en materia de atención de adicciones.",
  },
];

const PreguntasFrecuentes = () => {
  useScrollToTop();
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.aText },
    })),
  };

  return (
    <main>
      <Seo
        title="Preguntas Frecuentes — Clínica SER Puebla"
        description="Resuelve tus dudas sobre el internamiento en Clínica SER Puebla: qué llevar, visitas, llamadas, acreditaciones del personal y por qué elegirnos."
        path="/preguntas-frecuentes"
        jsonLd={jsonLd}
      />

      <article className="guia">
        <header className="guia__hero">
          <div className="guia__hero-overlay" />
          <div className="guia__hero-content">
            <span className="guia__tag">PREGUNTAS FRECUENTES</span>
            <h1 className="guia__title">
              Preguntas Frecuentes — Clínica SER Puebla
            </h1>
            <p className="guia__lead">
              Resolvemos las dudas más comunes de las familias antes y durante
              el internamiento.
            </p>
          </div>
        </header>

        <div className="guia__body">
          <section className="faq__list">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className={`faq__item ${isOpen ? "faq__item--open" : ""}`}>
                  <button
                    type="button"
                    className="faq__q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{f.q}</span>
                    <span className="faq__icon" aria-hidden>{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && <div className="faq__a">{f.a}</div>}
                </div>
              );
            })}
          </section>

          <section className="guia__cta">
            <h2>¿Necesitas hablar con nosotros?</h2>
            <div className="guia__cta-btns">
              <a
                href={`tel:${SITE.telefonoTel[0]}`}
                className="guia__btn"
                onClick={() => trackCTAClick("LLAMAR_FAQ")}
              >
                <Phone size={16} aria-hidden="true" /> Llamar ahora
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="guia__btn guia__btn--wa"
                onClick={() => trackCTAClick("WA_FAQ")}
              >
                <MessageCircle size={16} aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </section>
        </div>
      </article>

      <style>{`
        .guia { background: #FFFFFF; }
        .guia__hero { position: relative; min-height: 40vh; display: flex; align-items: center; background: #1A1A2E; }
        .guia__hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,46,.88), rgba(26,26,46,.6)); }
        .guia__hero-content { position: relative; z-index: 2; max-width: 800px; padding: 120px clamp(24px,5vw,80px) 60px; }
        .guia__tag { font-family: 'Inter', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: .15em; color: #C8E64A; display: block; margin-bottom: 16px; }
        .guia__title { font-family: 'Inter', sans-serif; font-size: clamp(28px,4vw,44px); font-weight: 700; color: white; line-height: 1.2; margin: 0 0 16px; }
        .guia__lead { font-family: 'Inter', sans-serif; font-size: 17px; color: rgba(255,255,255,.78); line-height: 1.6; margin: 0; }

        .guia__body { max-width: 820px; margin: 0 auto; padding: clamp(48px,6vw,80px) clamp(20px,4vw,32px); font-family: 'Inter', sans-serif; color: #1A1A2E; }

        .faq__list { display: flex; flex-direction: column; gap: 12px; }
        .faq__item { border: 1px solid #E5E7EB; border-radius: 12px; background: #FFFFFF; overflow: hidden; transition: box-shadow .2s, border-color .2s; }
        .faq__item--open { border-color: #1B2A4A; box-shadow: 0 4px 20px rgba(27,42,74,.08); }
        .faq__q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 16px; text-align: left; background: transparent; border: 0; padding: 20px 24px; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; color: #1A1A2E; line-height: 1.4; }
        .faq__q:hover { color: #1B2A4A; }
        .faq__icon { flex-shrink: 0; width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; background: #F5F5F0; color: #1B2A4A; font-size: 18px; font-weight: 700; }
        .faq__item--open .faq__icon { background: #C8E64A; color: #1A1A2E; }
        .faq__a { padding: 0 24px 22px; font-size: 15.5px; line-height: 1.7; color: #444; }
        .faq__a p { margin: 0 0 12px; }
        .faq__a p:last-child { margin-bottom: 0; }
        .faq__a a { color: #1B2A4A; text-decoration: underline; }
        .faq__a ul { padding-left: 22px; margin: 0; }
        .faq__a li { margin-bottom: 10px; }

        .guia__cta { background: #F5F5F0; padding: 40px; border-radius: 16px; text-align: center; margin-top: 48px; }
        .guia__cta h2 { font-size: 22px; font-weight: 700; color: #1A1A2E; margin: 0 0 20px; }
        .guia__cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .guia__btn { display: inline-flex; align-items: center; gap: 8px; background: #C8E64A; color: #1A1A2E; padding: 14px 28px; border-radius: 60px; font-size: 13px; font-weight: 700; text-decoration: none; transition: background .2s; }
        .guia__btn:hover { background: #8AB83A; color: white; }
        .guia__btn--wa { background: #25D366; color: white; }
        .guia__btn--wa:hover { background: #1DB954; }
      `}</style>
    </main>
  );
};

export default PreguntasFrecuentes;