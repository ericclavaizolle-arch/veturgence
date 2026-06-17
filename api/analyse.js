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
          content: `Tu es un assistant vétérinaire expert. Analyse pour un ${animal}. Symptômes : "${symptoms}". 
Réponds UNIQUEMENT avec ce format JSON valide, sans aucun texte avant ou après :
{
  "urgency": "high" ou "medium" ou "low",
  "urgency_label": "ÉLEVÉ" ou "MODÉRÉ" ou "FAIBLE",
  "suspicions": ["suspicion 1", "suspicion 2"],
  "gestes": ["geste 1", "geste 2"],
  "protocole": "texte du protocole",
  "advice": "conseil final"
}`
        }],
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    const aiResult = JSON.parse(data.choices[0].message.content);
    res.status(200).json(aiResult);
    
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'analyse IA" });
  }
}
