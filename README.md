# F. Lakardi · Nettoyage (landing statique)

Landing page vitrine artisanale pour nettoyage à Marseille et arrondissements. Priorité conversion (appel + devis), SEO local, sans dépendances frontend.

## Aperçu
- One-page verticale : hero, preuves, services, process, zone, avis, contact, mentions
- Palette claire, accent bleu/vert, typo system-ui
- Performances visées : Lighthouse >95 (Perf/Acc/Best/SEO), LCP <2s, CLS ~0
- JS minimal (progressive enhancement : ombre header + reveal), site utilisable sans JS

## Lancer en local
1) `npm install`
2) `npm run dev`
3) Ouvrir http://localhost:3000

## Personnaliser
- Mettre à jour tel/mail dans les CTA (index.html) et schema.org.
- Remplacer l image héro par une WebP locale + srcset (section hero).
- Ajuster couleurs dans styles.css (variables en haut).
- Vérifier sitemap/robots avec votre domaine réel.

## Fichiers clés
- index.html : structure, SEO (meta, OG, JSON-LD LocalBusiness)
- styles.css : styles globaux, responsive, prefers-reduced-motion respecté
- main.js : légère amélioration UX (ombre header, reveal)
- robots.txt / sitemap.xml / manifest.webmanifest / 404.html

## Stack
- HTML + CSS natifs
- JS vanilla (aucune lib)
- Express (optionnel) pour servir statiquement