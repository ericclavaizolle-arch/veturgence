export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Méthode non autorisée" });
  
  const { animal, symptoms, plan } = req.body;
  
  if (!process.env.MISTRAL_API_KEY) {
    return res.status(500).json({ error: "Clé API manquante" });
  }

  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}` 
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [{ 
          role: "user", 
          content: `Triage vétérinaire. Case cochée : ${animal}. Texte utilisateur : "${symptoms}".

RÈGLES STRICTES :
1. Si le texte parle d'un animal DIFFÉRENT de "${animal}", commence le champ "advice" par : "⚠️ Attention : vous avez sélectionné ${animal} mais votre texte parle d'un autre animal. Cette analyse concerne un ${animal}. "
2. Sinon, commence le champ "advice" par : "🐾 Vous avez sélectionné : ${animal}. "
3. Analyse basée UNIQUEMENT sur un ${animal}. IGNORE toute mention de maladies ou d'animaux autres que le ${animal} sélectionné.
4. INTERDIT ABSOLU :
   - JAMAIS de médicaments (humains ou vétérinaires)
   - JAMAIS d'injections, perfusions ou gestes invasifs
   - JAMAIS de palper, toucher ou examiner physiquement l'animal
   - JAMAIS de prendre la température, ausculter ou vérifier les muqueuses
   - JAMAIS de manipuler une plaie ou faire un soin
5. Les "gestes" doivent être UNIQUEMENT des actions simples qu'un propriétaire peut faire SANS compétence médicale :
   ✓ Mettre l'animal au calme dans un endroit tranquille
   ✓ Ne pas donner à manger ni à boire
   ✓ Observer à distance le comportement
   ✓ Préparer le transport vers le vétérinaire
   ✓ Garder l'animal au chaud
   ✓ Éloigner les enfants ou autres animaux
   ✓ Noter l'heure de début des symptômes
   ✗ Tout le reste est INTERDIT. N'utilise JAMAIS le terme "signes vitaux", utilise uniquement "respiration et état de conscience".

Réponds UNIQUEMENT en JSON valide :
{
  "urgency": "high" | "medium" | "low",
  "urgency_label": "ÉLEVÉ" | "MODÉRÉ" | "FAIBLE",
  "suspicions": ["suspicion 1", "suspicion 2"],
  "gestes": ["geste simple 1", "geste simple 2"],
  "protocole": "conduite à tenir (transport, surveillance à distance, respiration et état de conscience)",
  "advice": "conseil final"
}`
        }],
        response_format: { type: "json_object" }
      })
    });
    
    const data = await response.json();
    res.status(200).json(JSON.parse(data.choices[0].message.content));
    
  } catch (error) {
    console.error("Erreur Mistral:", error);
    res.status(500).json({ error: "Erreur lors de l'analyse IA" });
  }
}
