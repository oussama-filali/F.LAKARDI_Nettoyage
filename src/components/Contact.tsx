import { useState, type FormEvent } from "react";
import { buildWhatsAppUrl } from "../utils/whatsapp";

export default function Contact() {
  const [form, setForm] = useState({
    nom: "",
    type: "Fin de chantier",
    surface: "",
    urgence: "Normal",
    adresse: "",
    message: "",
  });

  const [photoCount, setPhotoCount] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = buildWhatsAppUrl(form);
    window.open(url, "_blank", "noopener");
  };

  return (
    <section
      id="contact"
      className="h-full bg-cream bg-grain relative flex items-center overflow-y-auto"
      data-scroll-inner
    >
      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-dark-deep">
            Devis WhatsApp
          </h2>
          <p className="text-dark/60 mt-2">
            Remplissez. On ouvre WhatsApp avec le message prêt. Ajoutez vos photos dans la conv.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-dark/10 rounded-2xl bg-white/60 backdrop-blur-sm p-6 md:p-8 space-y-5 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {/* Nom */}
            <label className="block">
              <span className="text-sm text-dark/70 mb-1 block">Nom</span>
              <input
                name="nom"
                type="text"
                value={form.nom}
                onChange={handleChange}
                placeholder="Votre nom"
                autoComplete="name"
                className="w-full bg-sage/20 border border-dark/10 rounded-xl px-4 py-3 text-dark-deep placeholder:text-dark/30 transition-colors"
              />
            </label>

            {/* Type */}
            <label className="block">
              <span className="text-sm text-dark/70 mb-1 block">Type d&apos;intervention</span>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full bg-sage/20 border border-dark/10 rounded-xl px-4 py-3 text-dark-deep appearance-none cursor-pointer transition-colors"
              >
                <option value="Fin de chantier">Fin de chantier</option>
                <option value="Bureaux / tertiaire">Bureaux / tertiaire</option>
                <option value="Fin de bail">Fin de bail</option>
                <option value="Vitrerie">Vitrerie technique</option>
                <option value="Conciergerie Airbnb">Conciergerie Airbnb</option>
              </select>
            </label>

            {/* Surface */}
            <label className="block">
              <span className="text-sm text-dark/70 mb-1 block">Surface estimée</span>
              <input
                name="surface"
                type="text"
                value={form.surface}
                onChange={handleChange}
                placeholder="Ex: 45m², T2, 3 pièces..."
                className="w-full bg-sage/20 border border-dark/10 rounded-xl px-4 py-3 text-dark-deep placeholder:text-dark/30 transition-colors"
              />
            </label>

            {/* Urgence */}
            <label className="block">
              <span className="text-sm text-dark/70 mb-1 block">Urgence</span>
              <select
                name="urgence"
                value={form.urgence}
                onChange={handleChange}
                className="w-full bg-sage/20 border border-dark/10 rounded-xl px-4 py-3 text-dark-deep appearance-none cursor-pointer transition-colors"
              >
                <option value="Normal">Normal (sous 48h)</option>
                <option value="Urgent">Urgent (sous 24h)</option>
                <option value="Très urgent">Très urgent (même jour si dispo)</option>
              </select>
            </label>

            {/* Adresse */}
            <label className="block md:col-span-2">
              <span className="text-sm text-dark/70 mb-1 block">Adresse / arrondissement</span>
              <input
                name="adresse"
                type="text"
                value={form.adresse}
                onChange={handleChange}
                placeholder="Ex: 13006 / Castellane / rue Paradis"
                autoComplete="address-line1"
                className="w-full bg-sage/20 border border-dark/10 rounded-xl px-4 py-3 text-dark-deep placeholder:text-dark/30 transition-colors"
              />
            </label>

            {/* Message */}
            <label className="block md:col-span-2">
              <span className="text-sm text-dark/70 mb-1 block">
                Message (optionnel)
              </span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                placeholder="Accès, contraintes, date souhaitée..."
                className="w-full bg-sage/20 border border-dark/10 rounded-xl px-4 py-3 text-dark-deep placeholder:text-dark/30 resize-y transition-colors"
              />
            </label>
          </div>

          {/* Photo counter */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-dark/50">Photos à joindre :</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPhotoCount(Math.max(0, photoCount - 1))}
                className="w-8 h-8 rounded-lg border border-dark/10 bg-sage/20 text-dark/70 flex items-center justify-center hover:bg-sage/40 transition-colors"
              >
                −
              </button>
              <span className="w-8 h-8 flex items-center justify-center text-dark-deep font-semibold">
                {photoCount}
              </span>
              <button
                type="button"
                onClick={() => setPhotoCount(photoCount + 1)}
                className="w-8 h-8 rounded-lg border border-dark/10 bg-sage/20 text-dark/70 flex items-center justify-center hover:bg-sage/40 transition-colors"
              >
                +
              </button>
            </div>
            {photoCount > 0 && (
              <span className="text-xs text-dark/40">
                → Ajoutez-les dans WhatsApp après envoi
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-mint text-dark-deep font-bold text-lg hover:bg-mint-dark hover:text-white transition-colors shadow-lg shadow-mint/25"
          >
            Ouvrir WhatsApp avec le message
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <a
              href="tel:+33783289113"
              className="text-dark/50 hover:text-dark-deep transition-colors text-sm"
            >
              Préférez appeler ? 07 83 28 91 13
            </a>
            <span className="text-dark/30 text-xs">
              Pas de tracking. Pas de stockage.
            </span>
          </div>
        </form>

        {/* Footer / legal */}
        <div className="mt-8 text-center text-dark/30 text-xs space-y-1">
          <p>F. Lakardi Nettoyage · Marseille (13003) · SIRET : 98931605400018</p>
          <p>Optez pour un nettoyage professionnel, précis et respectueux de l&apos;environnement. Devis rapide, intervention flexible, résultats impeccables.</p>
        </div>
      </div>
    </section>
  );
}
