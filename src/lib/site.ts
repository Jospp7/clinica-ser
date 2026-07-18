export const SITE = {
  nombre: "Clínica SER",
  grupo: "Casa de Salud, S.A. de C.V.",
  fundacion: "29 de septiembre de 1967",
  aniosExperiencia: 58,
  direccion: "Tepeyahualco 39, Col. La Paz, Puebla, Puebla, C.P. 72160",
  telefonos: [
    "+52 222 688 4386", // general
    "+52 222 257 0258", // general
    "+52 222 231 7626", // usada como línea de emergencia en el sitio original
  ],
  telefonoTel: ["+522226884386", "+522222570258", "+522222317626"],
  whatsapp: "5212213490308",
  whatsappTextoDefault: "Hola, me gustaría información sobre el tratamiento",
  email: "info@clinicaser.com",
  maps: "https://maps.google.com/?q=Tepeyahualco+39+La+Paz+Puebla",
  redes: {
    facebook: "https://www.facebook.com/serclinicapuebla",
    instagram: "https://www.instagram.com/clinicaser_puebla/",
    twitter: "https://mobile.twitter.com/clinica_ser",
    linkedin: "https://www.linkedin.com/company/clínica-ser-puebla",
  },
  horarioIngreso: "24 horas, los 365 días del año",
} as const;

export const waLink = (texto: string = SITE.whatsappTextoDefault) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(texto)}`;