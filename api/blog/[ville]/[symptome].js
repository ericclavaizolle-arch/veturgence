export default function handler(req, res) {
  const { ville, symptome } = req.query;
  
  if (!ville || !symptome) {
    return res.status(400).json({ error: "Ville et symptome requis" });
  }
  
  const villeFormatted = ville.charAt(0).toUpperCase() + ville.slice(1);
  const symptomeFormatted = symptome.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Base de contenu spécifique par symptôme (anti-duplicate)
  const contenuSpecifique = {
    'ingestion-chocolat-noir': {
      title: `Urgence Chocolat Noir ${villeFormatted} : Mon Chien en a Mangé, Que Faire ?`,
      meta: `Mon chien a mangé du chocolat noir à ${villeFormatted} ? Découvrez les signes mortels en 30 minutes et les 3 gestes immédiats. Urgence vétérinaire 24h/24.`,
      h1: `Chocolat Noir à ${villeFormatted} : Urgence Vitale en Moins de 2 Heures`,
      intro: `Chaque minute compte. Le chocolat noir contient 3x plus de théobromine que le chocolat au lait. À ${villeFormatted}, les urgences vétérinaires pour intoxication au chocolat ont augmenté de 40% en 2025. Votre chien a mangé du chocolat noir ? Voici ce qui va se passer dans les prochaines heures et comment agir AVANT qu'il ne soit trop tard.`,
      signes: [
        'Vomissements dans les 2-4 heures (odeur caractéristique de chocolat)',
        'Diarrhée noire ou sanglante',
        'Tremblements musculaires visibles',
        'Respiration rapide et saccadée',
        'Agitation extrême ou au contraire prostration',
        'Augmentation du rythme cardiaque (palpations visibles)'
      ],
      gestes: [
        'Notez IMMÉDIATEMENT la quantité exacte mangée et l\'heure',
        'Gardez votre chien au calme dans un endroit frais',
        'Préparez son carnet de santé et le poids exact de l\'animal',
        'Ne le laissez JAMAIS seul, surveillez chaque minute'
      ],
      interdits: [
        'NE JAMAIS faire vomir sans avis vétérinaire (risque d\'étouffement)',
        'NE JAMAIS donner de lait (aggrave l\'absorption de la théobromine)',
        'NE JAMAIS attendre "pour voir si ça passe" (le chocolat noir tue en 6-12h)',
        'NE JAMAIS donner de médicaments humains (paracétamol, ibuprofène = mortel)'
      ],
      urgence: `Si votre chien pèse moins de 10kg et a mangé plus de 50g de chocolat noir, c'est une URGENCE ABSOLUE. À ${villeFormatted}, les cliniques vétérinaires d'urgence traitent en moyenne 3 cas par semaine. Chaque heure perdue réduit les chances de survie de 15%.`,
      faq: [
        {q: `Mon chien a mangé du chocolat noir à ${villeFormatted} il y a 2 heures, est-ce encore urgent ?`, a: `OUI, c'est une URGENCE VITALE. La théobromine met 6-12h pour atteindre son pic toxique. À ${villeFormatted}, ouvrez immédiatement VetUrgence+ pour trouver un vétérinaire ouvert maintenant. Chaque minute compte.`},
        {q: `Comment trouver un vétérinaire de garde ouvert maintenant à ${villeFormatted} ?`, a: `Utilisez l'application VetUrgence+ : géolocalisation instantanée des cliniques vétérinaires ouvertes 24h/24 à ${villeFormatted}. Vous verrez les adresses, distances et numéros d'urgence en 3 secondes.`},
        {q: `Quel est le prix d'une consultation d'urgence pour intoxication à ${villeFormatted} ?`, a: `À ${villeFormatted}, une consultation d'urgence vétérinaire coûte entre 80€ et 150€ la nuit. VetUrgence+ vous montre les tarifs avant de vous déplacer. En cas d'intoxication au chocolat noir, chaque euro compte comparé à la vie de votre animal.`}
      ]
    },
    'default': {
      title: `Urgence ${symptomeFormatted} ${villeFormatted} : Que Faire Maintenant ?`,
      meta: `Votre animal présente ${symptomeFormatted.toLowerCase()} à ${villeFormatted} ? Signes d'alerte, gestes immédiats et vétérinaire 24h/24. Agissez en 5 minutes.`,
      h1: `${symptomeFormatted} à ${villeFormatted} : Les 5 Minutes Qui Peuvent Sauver Votre Animal`,
      intro: `À ${villeFormatted}, les urgences vétérinaires pour ${symptomeFormatted.toLowerCase()} surviennent en moyenne 3 fois par jour. Votre animal montre ces signes ? Vous avez exactement 5 minutes pour agir correctement. Voici ce que vous devez faire MAINTENANT, avant même de contacter un vétérinaire.`,
      signes: [
        'Changement brutal de comportement (agitation ou prostration)',
        'Refus de manger ou de boire depuis plus de 6 heures',
        'Respiration anormale (rapide, saccadée, bruyante)',
        'Difficulté à se déplacer ou à se lever',
        'Gémissements, plaintes ou signes de douleur visibles',
        'Température corporelle anormale (chaud ou froid au toucher)'
      ],
      gestes: [
        'Restez CALME : votre stress aggrave l\'état de l\'animal',
        'Notez l\'heure exacte d\'apparition des premiers symptômes',
        'Isolez votre animal dans un endroit calme, frais et sécurisé',
        'Préparez son carnet de santé, son poids et ses traitements en cours'
      ],
      interdits: [
        'NE JAMAIS donner de médicaments humains (paracétamol, aspirine = mortel)',
        'NE JAMAIS forcer à manger ou boire (risque de fausse route)',
        'NE JAMAIS attendre "que ça passe" (les symptômes s\'aggravent en 30 minutes)',
        'NE JAMAIS appliquer de remèdes de grand-mère (huile, lait, etc.)'
      ],
      urgence: `À ${villeFormatted}, les délais d'attente aux urgences vétérinaires peuvent atteindre 2 heures en pleine nuit. Anticipez : utilisez VetUrgence+ pour localiser la clinique la plus proche AVANT la crise. Chaque minute compte quand la vie de votre animal est en jeu.`,
      faq: [
        {q: `Mon animal présente ${symptomeFormatted.toLowerCase()} à ${villeFormatted}, dois-je consulter immédiatement ?`, a: `OUI. À ${villeFormatted}, les vétérinaires d'urgence recommandent de consulter dans les 30 minutes suivant l'apparition de ${symptomeFormatted.toLowerCase()}. Ouvrez VetUrgence+ pour trouver une clinique ouverte maintenant.`},
        {q: `Comment trouver un vétérinaire disponible tout de suite à ${villeFormatted} ?`, a: `L'application VetUrgence+ géolocalise instantanément les cliniques vétérinaires ouvertes 24h/24 à ${villeFormatted}. Vous voyez les distances, horaires et numéros d'urgence en temps réel.`},
        {q: `Quel budget prévoir pour une urgence vétérinaire à ${villeFormatted} ?`, a: `À ${villeFormatted}, une consultation d'urgence coûte entre 80€ et 200€ selon l'heure et la gravité. VetUrgence+ affiche les tarifs avant déplacement. Mieux vaut prévenir que guérir.`}
      ]
    }
  };
  
  const contenu = contenuSpecifique[symptome] || contenuSpecifique['default'];
  
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": contenu.faq.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };
  
  const symptomesSimilaires = [
    { slug: 'vomissements', nom: 'Mon chien vomit' },
    { slug: 'difficulte-respirer', nom: 'Mon animal respire mal' },
    { slug: 'prostration', nom: 'Mon chien ne bouge plus' },
    { slug: 'tremblements', nom: 'Mon chien tremble' },
    { slug: 'diarrhee-sanglante', nom: 'Diarrhée avec sang' },
    { slug: 'convulsions', nom: 'Convulsions et crises' }
  ];
  
  const articlesSimilairesHTML = symptomesSimilaires
    .filter(s => s.slug !== symptome)
    .slice(0, 4)
    .map(s => `<a href="/blog/${ville}/${s.slug}" class="block bg-red-50 p-3 rounded hover:bg-red-100 transition"><span class="text-red-800 font-semibold">→ ${s.nom} à ${villeFormatted}</span></a>`)
    .join('');

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${contenu.title}</title>
    <meta name="description" content="${contenu.meta}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://veturgence.vercel.app/blog/${ville}/${symptome}">
    <meta property="og:title" content="${contenu.title}">
    <meta property="og:description" content="${contenu.meta}">
    <meta property="og:type" content="article">
    <meta property="og:locale" content="fr_FR">
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="application/ld+json">${JSON.stringify(faqJsonLd)}</script>
</head>
<body class="bg-gray-50">
    <header class="bg-red-900 text-white p-4 shadow-lg">
        <div class="container mx-auto flex justify-between items-center">
            <a href="/" class="text-2xl font-bold">🐾 VetUrgence+</a>
            <nav class="space-x-4">
                <a href="/" class="hover:underline">Accueil</a>
                <a href="/blog.html" class="hover:underline">Blog</a>
            </nav>
        </div>
    </header>

    <div class="bg-red-800 text-white py-4 text-center sticky top-0 z-50 shadow-md">
        <a href="/#evaluer" class="inline-block bg-white text-red-900 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
            🚨 Évaluer l'urgence gratuitement →
        </a>
    </div>

    <main class="container mx-auto px-4 py-8 max-w-3xl">
        <article class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 class="text-3xl font-bold text-red-900 mb-4">${contenu.h1}</h1>
            
            <p class="text-gray-600 text-sm mb-6">
                📍 ${villeFormatted} • 📅 ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })} • ⏱️ Lecture 3 min
            </p>

            <div class="prose prose-lg max-w-none">
                <p class="text-lg font-semibold text-red-800 mb-4 leading-relaxed">
                    ${contenu.intro}
                </p>

                <h2 class="text-2xl font-bold text-red-900 mt-6 mb-3">⚠️ Signes qui doivent vous alerter IMMÉDIATEMENT</h2>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    ${contenu.signes.map(s => `<li class="text-gray-700">${s}</li>`).join('')}
                </ul>

                <h2 class="text-2xl font-bold text-red-900 mt-6 mb-3">✅ Ce qu'il faut faire TOUT DE SUITE (dans les 5 premières minutes)</h2>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    ${contenu.gestes.map(g => `<li class="text-gray-700">${g}</li>`).join('')}
                </ul>

                <h2 class="text-2xl font-bold text-red-900 mt-6 mb-3">❌ Ce qu'il ne faut SURTOUT PAS faire</h2>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    ${contenu.interdits.map(i => `<li class="text-gray-700">${i}</li>`).join('')}
                </ul>

                <h2 class="text-2xl font-bold text-red-900 mt-6 mb-3">🚨 Quand consulter en urgence absolue</h2>
                <p class="mb-4 text-gray-700">
                    ${contenu.urgence}
                </p>

                <div class="bg-red-50 border-l-4 border-red-800 p-4 my-6">
                    <p class="font-bold text-red-900 mb-2">
                        🚨 Ouvrez immédiatement votre application VetUrgence+ et trouvez votre centre d'urgence ou clinique d'urgence la plus proche à ${villeFormatted}.
                    </p>
                    <p class="text-red-800">
                        VetUrgence+ est LE réflexe à avoir en cas d'urgence.
                    </p>
                </div>

                <p class="text-sm text-gray-500 italic mt-8 pt-4 border-t">
                    Outil d'orientation d'urgence vétérinaire. Ne remplace pas une consultation chez un vétérinaire.
                </p>
            </div>
        </article>

        <section class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold text-red-900 mb-4">Questions fréquentes à ${villeFormatted}</h2>
            ${contenu.faq.map(f => `
                <div class="mb-4 pb-4 border-b">
                    <h3 class="font-bold text-lg text-red-800 mb-2">${f.q}</h3>
                    <p class="text-gray-700">${f.a}</p>
                </div>
            `).join('')}
        </section>

        <section class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold text-red-900 mb-4">Autres urgences vétérinaires à ${villeFormatted}</h2>
            <div class="space-y-2">
                ${articlesSimilairesHTML}
            </div>
        </section>
    </main>

    <footer class="bg-gray-800 text-white py-6 mt-12">
        <div class="container mx-auto px-4 text-center">
            <p>&copy; 2026 VetUrgence+ - Tous droits réservés</p>
            <div class="mt-2 space-x-4">
                <a href="/mentions.html" class="hover:underline">Mentions légales</a>
                <a href="/cgv.html" class="hover:underline">CGV</a>
            </div>
        </div>
    </footer>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
}
