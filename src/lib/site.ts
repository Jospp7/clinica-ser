export const SITE = {
  nombre: "Clínica SER",
  grupo: "Casa de Salud, S.A. de C.V.",
  fundacion: "29 de septiembre de 1967",
  aniosExperiencia: 58,
  direccion: "Tepeyahualco 39, Col. La Paz, Puebla, Puebla, C.P. 72160",
  telefonos: [
    "+52 222 688 4386", // principal
    "+52 222 257 0258", // emergencias y pacientes internados — 24 horas
  ],
  telefonoTel: ["+522226884386", "+522222570258"],
  whatsapp: "5212213490308",
  whatsappHorario: "Lun a Vie, 10 AM - 6 PM",
  whatsappTextoDefault: "Hola, me gustaría información sobre el tratamiento",
  email: "info@clinicaser.com",
  maps: "https://maps.google.com/?q=Tepeyahualco+39+La+Paz+Puebla",
  redes: {
    facebook: "https://www.facebook.com/serclinicapuebla",
    instagram: "https://www.instagram.com/clinicaser_puebla/",
    // TODO: URL de TikTok del cliente
    tiktok: "",
  },
  horarioIngreso: "24 horas, los 365 días del año",
  google: {
    // Datos del perfil real de Google Business. Capturados el 19 de julio de 2026.
    // TODO: revisar cada ~3 meses; la calificación y el conteo cambian con el tiempo.
    rating: 4.3,
    reviewCount: 93,
    url: "https://www.google.com/maps/place/?q=place_id:ChIJ1fY679nGz4URAsH-NllWjQY",
  },
} as const;

export const waLink = (texto: string = SITE.whatsappTextoDefault) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(texto)}`;