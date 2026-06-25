export default function handler(req, res) {
  const { ville, symptome } = req.query;
  
  if (!ville || !symptome) {
    return res.status(400).json({ error: "Ville et symptome requis" });
  }
  
  const villeFormatted = ville.charAt(0).toUpperCase() + ville.slice(1);
  const symptomeFormatted = symptome.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const title = `Urgence vétérinaire ${symptomeFormatted} à ${villeFormatted} : que faire ? | VetUrgence+`;
  const metaDescription = `Votre animal présente ${symptomeFormatted.toLowerCase()} à ${villeFormatted} ? Découvrez les signes d'alerte et les gestes à adopter. VetUrgence+ vous guide.`;
  const h1 = `${symptomeFormatted} à ${villeFormatted} : Guide d'urgence vétérinaire`;
  
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Mon animal présente ${symptomeFormatted.toLowerCase()} à ${villeFormatted}, est-ce urgent ?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Oui, ${symptomeFormatted.toLowerCase()} peut être le signe d'une urgence vétérinaire. Utilisez VetUrgence+ pour trouver immédiatement un vétérinaire ouvert 24h/24 à ${villeFormatted}.`
        }
      },
      {
        "@type": "Question",
        "name": `Comment trouver un vétérinaire de garde à ${villeFormatted} ?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Ouvrez l'application VetUrgence+ pour localiser instantanément les cliniques vétérinaires ouvertes 24h/24 à ${villeFormatted} et à proximité.`
        }
      },
      {
        "@type": "Question",
        "name": `Que faire en attendant le vétérinaire pour ${symptomeFormatted.toLowerCase()} ?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Restez calme, notez l'heure d'apparition des symptômes, isolez votre animal dans un endroit calme et sécurisé, et utilisez VetUrgence+ pour trouver le vétérinaire le plus proche.`
        }
      }
    ]
  };
  
  const symptomesSimilaires = [
    { slug: 'vomissements', nom: 'Vomissements' },
    { slug: 'difficulte-respirer', nom: 'Difficulté à respirer' },
    { slug: 'prostration', nom: 'Prostration' },
    { slug: 'tremblements', nom: 'Tremblements' }
  ];
  
  const articlesSimilairesHTML = symptomesSimilaires
    .filter(s => s.slug !== symptome)
    .slice(0, 3)
    .map(s => `<a href="/blog/${ville}/${s.slug}" class="text-red-800 hover:underline">→ ${s.nom} à ${villeFormatted}</a>`)
    .join('<br>');

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${metaDescription}">
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
            <h1 class="text-3xl font-bold text-red-900 mb-4">${h1}</h1>
            
            <p class="text-gray-600 text-sm mb-6">
                📍 ${villeFormatted} • 📅 ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div class="prose prose-lg max-w-none">
                <p class="text-lg font-semibold text-red-800 mb-4">
                    VetUrgence+ vous informe, l'application d'urgence pour votre petit compagnon.
                </p>

                <h2 class="text-2xl font-bold text-red-900 mt-6 mb-3">Introduction</h2>
                <p class="mb-4">
                    ${symptomeFormatted} chez votre animal à ${villeFormatted} peut être le signe d'une urgence vétérinaire. 
                    Il est crucial de reconnaître les signes d'alerte et d'agir rapidement pour assurer la sécurité de votre compagnon.
                </p>

                <h2 class="text-2xl font-bold text-red-900 mt-6 mb-3">Signes qui doivent alerter</h2>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li>Changement de comportement soudain</li>
                    <li>Perte d'appétit ou refus de boire</li>
                    <li>Gémissements ou signes de douleur</li>
                    <li>Difficulté à se déplacer ou à respirer</li>
                </ul>

                <h2 class="text-2xl font-bold text-red-900 mt-6 mb-3">Ce qu'il faut faire tout de suite</h2>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li>Rester calme pour ne pas stresser davantage votre animal</li>
                    <li>Noter l'heure d'apparition des symptômes</li>
                    <li>Isoler votre animal dans un endroit calme et sécurisé</li>
                    <li>Préparer ses documents vétérinaires</li>
                </ul>

                <h2 class="text-2xl font-bold text-red-900 mt-6 mb-3">Ce qu'il ne faut surtout pas faire</h2>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li>Ne donnez aucun médicament sans avis vétérinaire</li>
                    <li>Ne forcez pas votre animal à manger ou boire</li>
                    <li>N'attendez pas que les symptômes s'aggravent</li>
                </ul>

                <h2 class="text-2xl font-bold text-red-900 mt-6 mb-3">Quand consulter en urgence</h2>
                <p class="mb-4">
                    Si vous observez ${symptomeFormatted.toLowerCase()} accompagné d'autres signes graves, 
                    consultez immédiatement un vétérinaire.
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
            <h2 class="text-2xl font-bold text-red-900 mb-4">Questions fréquentes</h2>
            ${faqJsonLd.mainEntity.map(faq => `
                <div class="mb-4">
                    <h3 class="font-bold text-lg text-red-800 mb-2">${faq.name}</h3>
                    <p class="text-gray-700">${faq.acceptedAnswer.text}</p>
                </div>
            `).join('')}
        </section>

        <section class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold text-red-900 mb-4">Articles similaires à ${villeFormatted}</h2>
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
