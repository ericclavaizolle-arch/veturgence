export default function handler(req, res) {
  const { ville, symptome } = req.query;
  
  if (!ville || !symptome) {
    return res.status(400).json({ error: "Ville et symptome requis" });
  }
  
  const villeFormatted = ville.charAt(0).toUpperCase() + ville.slice(1);
  const symptomeFormatted = symptome.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Contenu spécifique par symptôme : direct, pragmatique, tension maîtrisée
  const contenuSpecifique = {
    'ingestion-chocolat-noir': {
      title: `Mon chien a mangé du chocolat à ${villeFormatted} : agissez maintenant`,
      meta: `Chocolat ingéré à ${villeFormatted} ? Le chocolat noir peut être mortel pour un chien. Signes d'alerte, gestes immédiats et vétérinaire 24h/24 avec VetUrgence+.`,
      h1: `Chocolat à ${villeFormatted} : ne minimisez pas`,
      intro: `Le chocolat contient de la théobromine, toxique pour les chiens. Le chocolat noir est 3 fois plus concentré que le chocolat au lait. Un chien de 10kg peut présenter des symptômes graves avec seulement 100g de chocolat noir. Ne perdez pas de temps : observez, agissez, consultez si nécessaire.`,
      signes: [
        'Vomissements dans les 2 à 6 heures',
        'Diarrhée',
        'Agitation anormale ou tremblements',
        'Respiration accélérée',
        'Soif excessive',
        'Rigidité musculaire (cas graves)'
      ],
      gestes: [
        'Notez IMMÉDIATEMENT l\'heure et la quantité ingérée',
        'Identifiez le type de chocolat (noir, au lait, blanc, cacao pur)',
        'Pesez votre chien si possible (le poids détermine la gravité)',
        'Gardez-le au calme dans un endroit frais',
        'Préparez son carnet de santé'
      ],
      interdits: [
        'Ne faites PAS vomir sans avis vétérinaire (risque de fausse route)',
        'Ne donnez AUCUN médicament humain (paracétamol, ibuprofène = dangereux)',
        'Ne donnez pas de lait (inefficace et peut aggraver)',
        'N\'attendez PAS "de voir si ça passe" : les symptômes peuvent apparaître jusqu\'à 12h après'
      ],
      urgence: `Les petits chiens et les chiots sont particulièrement sensibles. Si votre chien présente des tremblements, une respiration très rapide ou semble désorienté, consultez IMMÉDIATEMENT un vétérinaire à ${villeFormatted}. Le chocolat noir peut provoquer des convulsions et des troubles cardiaques graves. VetUrgence+ vous permet de trouver une clinique ouverte en quelques secondes.`,
      faq: [
        {q: `Mon chien a mangé du chocolat à ${villeFormatted}, quand dois-je m'inquiéter ?`, a: `Si votre chien pèse moins de 15kg et a ingéré plus de 50g de chocolat noir, consultez rapidement. Les symptômes peuvent apparaître jusqu'à 12h après. VetUrgence+ vous aide à localiser un vétérinaire ouvert à ${villeFormatted} immédiatement.`},
        {q: `Comment trouver un vétérinaire ouvert maintenant à ${villeFormatted} ?`, a: `Ouvrez VetUrgence+ : l'application géolocalise instantanément les cliniques vétérinaires ouvertes 24h/24 autour de vous à ${villeFormatted}. Adresses, distances et numéros d'urgence en 3 secondes.`},
        {q: `Que faire en attendant de consulter à ${villeFormatted} ?`, a: `Gardez votre chien au calme, notez l'heure et la quantité ingérée, préparez son carnet de santé. N'essayez pas de le faire vomir. Utilisez VetUrgence+ pour trouver la clinique la plus proche à ${villeFormatted}.`}
      ]
    },
    'default': {
      title: `${symptomeFormatted} chez mon animal à ${villeFormatted} : que faire ?`,
      meta: `Votre animal présente ${symptomeFormatted.toLowerCase()} à ${villeFormatted} ? Ne minimisez pas : signes d'alerte, gestes immédiats et vétérinaire 24h/24 avec VetUrgence+.`,
      h1: `${symptomeFormatted} à ${villeFormatted} : agissez rapidement`,
      intro: `Si votre animal présente ${symptomeFormatted.toLowerCase()}, n'attendez pas que ça s'aggrave. Certains symptômes peuvent évoluer rapidement. Observez attentivement, notez les signes, et consultez si nécessaire. VetUrgence+ vous aide à trouver un vétérinaire ouvert à ${villeFormatted} en quelques secondes.`,
      signes: [
        'Changement brutal de comportement',
        'Refus de manger ou de boire depuis plusieurs heures',
        'Respiration anormale (rapide, saccadée, bruyante)',
        'Difficulté à se déplacer ou à se lever',
        'Gémissements ou signes de douleur',
        'Température anormale au toucher'
      ],
      gestes: [
        'Restez calme : votre stress aggrave l\'état de l\'animal',
        'Notez l\'heure exacte d\'apparition des premiers signes',
        'Isolez votre animal dans un endroit calme et sécurisé',
        'Préparez son carnet de santé et notez son poids'
      ],
      interdits: [
        'Ne donnez AUCUN médicament humain sans avis vétérinaire',
        'Ne forcez pas votre animal à manger ou boire',
        'N\'attendez pas "que ça passe" : certains symptômes s\'aggravent rapidement',
        'N\'appliquez pas de remèdes de grand-mère sans avis professionnel'
      ],
      urgence: `Si les symptômes persistent plus de quelques heures ou s'aggravent, consultez rapidement un vétérinaire à ${villeFormatted}. Les animaux ne peuvent pas dire ce qu'ils ressentent : mieux vaut consulter trop tôt que trop tard. VetUrgence+ vous permet de localiser immédiatement une clinique ouverte.`,
      faq: [
        {q: `Mon animal présente ${symptomeFormatted.toLowerCase()} à ${villeFormatted}, est-ce urgent ?`, a: `Si les symptômes persistent plus de 2-3 heures ou s'aggravent, consultez rapidement. VetUrgence+ vous aide à trouver un vétérinaire ouvert à ${villeFormatted} en quelques secondes.`},
        {q: `Comment trouver un vétérinaire disponible à ${villeFormatted} ?`, a: `Ouvrez VetUrgence+ : l'application géolocalise les cliniques vétérinaires ouvertes 24h/24 à ${villeFormatted}. Vous voyez les adresses et numéros immédiatement.`},
        {q: `Que faire en attendant de consulter à ${villeFormatted} ?`, a: `Gardez votre animal au calme, notez l'heure d'apparition des symptômes, préparez son carnet de santé. Utilisez VetUrgence+ pour trouver la clinique la plus proche.`}
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
    { slug: 'vomissements', nom: 'Mon animal vomit' },
    { slug: 'difficulte-respirer', nom: 'Mon animal respire mal' },
    { slug: 'prostration', nom: 'Mon animal ne bouge plus' },
    { slug: 'tremblements', nom: 'Mon animal tremble' },
    { slug: 'diarrhee', nom: 'Mon animal a la diarrhée' },
    { slug: 'perte-appetit', nom: 'Mon animal ne mange plus' }
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
                <p class="text-lg text-gray-700 mb-4 leading-relaxed">
                    ${contenu.intro}
                </p>

                <h2 class="text-2xl font-bold text-red-900 mt-6 mb-3">⚠️ Signes à surveiller</h2>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    ${contenu.signes.map(s => `<li class="text-gray-700">${s}</li>`).join('')}
                </ul>

                <h2 class="text-2xl font-bold text-red-900 mt-6 mb-3">✅ Ce qu'il faut faire IMMÉDIATEMENT</h2>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    ${contenu.gestes.map(g => `<li class="text-gray-700">${g}</li>`).join('')}
                </ul>

                <h2 class="text-2xl font-bold text-red-900 mt-6 mb-3">❌ Ce qu'il ne faut SURTOUT PAS faire</h2>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    ${contenu.interdits.map(i => `<li class="text-gray-700">${i}</li>`).join('')}
                </ul>

                <h2 class="text-2xl font-bold text-red-900 mt-6 mb-3">🚨 Quand consulter rapidement</h2>
                <p class="mb-4 text-gray-700">
                    ${contenu.urgence}
                </p>

                <div class="bg-red-50 border-l-4 border-red-800 p-4 my-6">
                    <p class="font-bold text-red-900 mb-2">
                        🚨 Ouvrez votre application VetUrgence+ et trouvez la clinique d'urgence la plus proche à ${villeFormatted}.
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
            <h2 class="text-2xl font-bold text-red-900 mb-4">Questions fréquentes</h2>
            ${contenu.faq.map(f => `
                <div class="mb-4 pb-4 border-b">
                    <h3 class="font-bold text-lg text-red-800 mb-2">${f.q}</h3>
                    <p class="text-gray-700">${f.a}</p>
                </div>
            `).join('')}
        </section>

        <section class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold text-red-900 mb-4">Autres situations d'urgence à ${villeFormatted}</h2>
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
