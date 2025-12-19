import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const policySections = [
  {
    id: "responsable",
    title: "Responsable du traitement",
    intro:
      "La présente politique décrit la façon dont LA GUINCHEUSE collecte et utilise vos données personnelles lorsque vous naviguez sur notre site, effectuez une réservation ou nous contactez.",
    bullets: [
      "Adresse : 266 Rue du Faubourg Saint-Martin, 75010 Paris.",
      "Email : guincheuse@gmail.com.",
      "Téléphone : 09 56 67 14 72.",
    ],
  },
  {
    id: "donnees",
    title: "Données collectées",
    intro:
      "Nous collectons uniquement les données nécessaires à la gestion de nos services.",
    bullets: [
      "Données d'identité et de contact : nom, prénom, email, téléphone.",
      "Données de réservation : date, heure, nombre de convives, préférences.",
      "Contenus de messages : informations transmises via nos formulaires ou emails.",
      "Données techniques : adresse IP, logs, informations de navigation.",
    ],
  },
  {
    id: "finalites",
    title: "Finalités et bases légales",
    intro:
      "Les traitements reposent sur votre consentement, l'exécution d'un contrat ou notre intérêt légitime à améliorer l'expérience client.",
    bullets: [
      "Gérer les réservations et la relation client.",
      "Répondre à vos demandes via le formulaire de contact.",
      "Envoyer des informations si vous y avez consenti (actualités, événements).",
      "Mesurer l'audience et améliorer le site.",
    ],
  },
  {
    id: "destinataires",
    title: "Destinataires",
    intro:
      "Vos données sont destinées aux équipes LA GUINCHEUSE et à nos prestataires techniques strictement nécessaires.",
    bullets: [
      "Prestataires de réservation, d'hébergement et d'emailing.",
      "Autorités compétentes lorsque la loi l'exige.",
      "Aucune vente ou cession de données à des tiers.",
    ],
  },
  {
    id: "conservation",
    title: "Durées de conservation",
    intro:
      "Nous conservons vos données pour la durée strictement nécessaire aux finalités du traitement.",
    bullets: [
      "Réservations : durée de la relation commerciale puis archivage légal.",
      "Demandes de contact : 12 mois maximum.",
      "Newsletter : jusqu'à retrait du consentement.",
      "Données techniques : durée limitée selon les obligations légales.",
    ],
  },
  {
    id: "droits",
    title: "Vos droits",
    intro:
      "Conformément au RGPD, vous disposez de droits sur vos données personnelles.",
    bullets: [
      "Droit d'accès, de rectification, d'effacement et de portabilité.",
      "Droit d'opposition ou de limitation du traitement.",
      "Retrait du consentement à tout moment.",
      "Réclamation auprès de la CNIL (www.cnil.fr).",
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    intro:
      "Notre site utilise des cookies pour assurer son fonctionnement et mesurer l'audience.",
    bullets: [
      "Cookies essentiels : nécessaires au bon fonctionnement du site.",
      "Cookies de mesure : statistiques d'audience et amélioration continue.",
      "Vous pouvez configurer vos préférences depuis votre navigateur.",
    ],
  },
  {
    id: "securite",
    title: "Sécurité",
    intro:
      "Nous mettons en place des mesures de sécurité pour protéger vos données contre tout accès non autorisé.",
    bullets: [
      "Accès restreint aux personnes habilitées.",
      "Mesures techniques et organisationnelles adaptées.",
      "Revue régulière de nos pratiques de sécurité.",
    ],
  },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-[#EFE6D5] text-bistro-ink">
      <Header variant="opaque" />

      <main className="pt-24 md:pt-32 pb-24">
        <section className="relative px-6 md:px-10 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-visible rounded-3xl border border-bistro-ink/10 bg-bistro-card/90 px-5 py-10 shadow-[0_30px_80px_rgba(17,17,17,0.12)] md:overflow-hidden md:px-12 md:py-16">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl md:-right-24 md:-top-24 md:h-64 md:w-64" />
              <div className="pointer-events-none absolute -left-6 bottom-0 h-28 w-28 rounded-full bg-[#1a1a1a]/10 blur-2xl md:-left-10 md:h-40 md:w-40" />

              <div className="relative grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                <div className="space-y-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-bistro-ink/20 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-bistro-ink/70">
                    LA GUINCHEUSE
                  </span>
                  <h1 className="font-geom text-4xl sm:text-5xl md:text-7xl uppercase leading-[0.98] tracking-tight text-black max-w-full">
                    Politique de
                    <br />
                    <span className="block text-primary italic text-[9.5vw] sm:inline sm:text-5xl md:text-6xl break-words max-w-full">
                      Confidentialité
                    </span>
                  </h1>
                  <p className="font-body text-lg md:text-xl text-bistro-ink/80 max-w-xl">
                    Transparence, confiance et clarté : voici comment nous traitons vos données
                    personnelles lorsque vous découvrez notre bistrot, réservez une table ou
                    participez à nos événements.
                  </p>
                  <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-bistro-ink/60">
                    <span className="h-px w-10 bg-bistro-ink/20" />
                    <span>Mise à jour : Décembre 2025</span>
                  </div>
                </div>

                <div className="relative rounded-2xl border border-bistro-ink/10 bg-white/70 p-6 shadow-lg backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Contact données
                  </p>
                  <p className="mt-3 font-body text-sm text-bistro-ink/80">
                    Pour toute question liée à la confidentialité ou l&apos;exercice de vos droits :
                  </p>
                  <div className="mt-5 space-y-3 text-sm text-bistro-ink/80">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-bistro-ink/60">
                        Email
                      </p>
                      <a className="underline-offset-4 hover:underline" href="mailto:guincheuse@gmail.com">
                        guincheuse@gmail.com
                      </a>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-bistro-ink/60">
                        Adresse
                      </p>
                      <p>266 Rue du Faubourg Saint-Martin, 75010 Paris</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 px-6 md:px-10 lg:px-16">
          <div className="mx-auto max-w-5xl rounded-2xl border border-bistro-ink/10 bg-[#f7f0e1] px-6 py-6 shadow-sm md:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Sommaire</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {policySections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center justify-between rounded-xl border border-bistro-ink/10 bg-white/60 px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-bistro-ink/70 transition hover:border-primary/40 hover:text-primary"
                >
                  {section.title}
                  <span className="text-primary">→</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 px-6 md:px-10 lg:px-16">
          <div className="mx-auto max-w-5xl space-y-8">
            {policySections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="relative overflow-hidden rounded-3xl border border-bistro-ink/10 bg-bistro-card/90 px-6 py-10 shadow-[0_18px_50px_rgba(17,17,17,0.08)] md:px-10"
              >
                <div className="md:pl-14">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    {section.title}
                  </p>
                  <h2 className="mt-3 font-geom text-3xl md:text-4xl uppercase tracking-tight text-black">
                    {section.title}
                  </h2>
                  <p className="mt-4 font-body text-base md:text-lg text-bistro-ink/80">
                    {section.intro}
                  </p>
                  <ul className="mt-5 grid gap-3 md:grid-cols-2 font-body text-sm text-bistro-ink/80">
                    {section.bullets.map((item) => (
                      <li
                        key={item}
                        className="rounded-2xl border border-bistro-ink/10 bg-white/70 px-4 py-3 shadow-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 px-6 md:px-10 lg:px-16">
          <div className="mx-auto max-w-5xl rounded-3xl border border-bistro-ink/10 bg-[#1a1a1a] px-6 py-10 text-white shadow-[0_24px_60px_rgba(0,0,0,0.2)] md:px-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Besoin d&apos;aide</p>
                <h3 className="mt-3 font-geom text-3xl md:text-4xl uppercase leading-tight">
                  Une question sur vos données ?
                </h3>
                <p className="mt-3 font-body text-sm md:text-base text-white/75">
                  Notre équipe répond rapidement à vos demandes de confidentialité. Nous vous
                  accompagnerons pour toute question liée à la protection de vos données.
                </p>
              </div>
              <a
                href="mailto:guincheuse@gmail.com"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-black/30 transition hover:bg-primary/90"
              >
                Contacter l&apos;équipe
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
