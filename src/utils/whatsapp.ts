const WHATSAPP_NUMBER = "33783289113";

export function buildWhatsAppUrl(fields: {
  nom: string;
  type: string;
  surface: string;
  urgence: string;
  adresse: string;
  message: string;
}) {
  const lines = [
    `Bonjour, je souhaite une intervention.`,
    ``,
    `Nom : ${fields.nom || "—"}`,
    `Type : ${fields.type || "—"}`,
    `Surface : ${fields.surface || "—"}`,
    `Urgence : ${fields.urgence || "—"}`,
    `Adresse : ${fields.adresse || "—"}`,
    ``,
    fields.message ? `Message : ${fields.message}` : "",
    ``,
    `(Photos à ajouter dans la conversation WhatsApp)`,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;
}
