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
          content: `Triage vétérinaire pour un(e) ${animal.toUpperCase()}. Symptômes : "${symptoms}".
          RÈGLES :
          1. Commence TOUJOURS ton conseil final (champ "advice") par : "🐾 Vous avez sélectionné : ${animal}. "
          2. Analyse basée uniquement sur un(e) ${animal}.
          3. JAMAIS de médicaments ou d'injections.
          4. Uniquement des gestes de premier secours non invasifs.
          Réponds UNIQUEMENT en JSON :
          {
            "urgency": "high"|"medium"|"low",
            "urgency_label": "ÉLEVÉ"|"MODÉRÉ"|"FAIBLE",
            "suspicions": ["suspicion 1", "suspicion 2"],
            "gestes": ["geste 1", "geste 2"],
            "protocole": "conduite à tenir",
            "advice": "conseil final commençant par le rappel de l'animal sélectionné"
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
