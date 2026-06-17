export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Méthode non autorisée" });
  const { animal, symptoms, plan } = req.body;
  if (!process.env.MISTRAL_API_KEY) return res.status(500).json({ error: "Clé API manquante" });

  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}` },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [{ 
          role: "user", 
          content: `Triage vétérinaire. Case cochée : ${animal}. Texte utilisateur : "${symptoms}".

RÈGLES IMPORTANTES :
1. Si le texte parle d'un animal DIFFÉRENT de "${animal}", commence le champ "advice" par : "⚠️ Attention : vous avez sélectionné ${animal} mais votre texte parle d'un autre animal. Cette analyse concerne un ${animal}. "
2. Sinon, commence le champ "advice" par : "🐾 Vous avez sélectionné : ${animal}. "
3. Analyse basée UNIQUEMENT sur un ${animal}.
4. JAMAIS de médicaments ou d'injections.
5. Uniquement des gestes de premier secours non invasifs.

Réponds UNIQUEMENT en JSON :
{
  "urgency": "high"|"medium"|"low",
  "urgency_label": "ÉLEVÉ"|"MODÉRÉ"|"FAIBLE",
  "suspicions": ["suspicion 1", "suspicion 2"],
  "gestes": ["geste 1", "geste 2"],
  "protocole": "conduite à tenir",
  "advice": "conseil final"
}`
        }],
        response_format: { type: "json_object" }
      })
    });
    const data = await response.json();
    res.status(200).json(JSON.parse(data.choices[0].message.content));
  } catch (error) {
    res.status(500).json({ error: "Erreur IA" });
  }
}
