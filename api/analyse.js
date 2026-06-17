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
          content: `Tu es un assistant de triage vétérinaire. Analyse pour un ${animal}. Symptômes : "${symptoms}".
          
          ⚠️ RÈGLES DE SÉCURITÉ ABSOLUES : 
          1. Ne conseille JAMAIS d'administrer des médicaments (humains ou vétérinaires).
          2. Ne conseille JAMAIS de faire des injections ou des gestes invasifs.
          3. Tes conseils ("gestes") doivent se limiter STRICTEMENT aux premiers secours non invasifs (ex: mettre au calme, ne pas donner à manger/boire, surveiller la respiration, préparer le transport).
          
          Réponds UNIQUEMENT avec ce format JSON valide, sans aucun texte avant ou après :
          {
            "urgency": "high" ou "medium" ou "low",
            "urgency_label": "ÉLEVÉ" ou "MODÉRÉ" ou "FAIBLE",
            "suspicions": ["suspicion 1", "suspicion 2"],
            "gestes": ["geste de premier secours 1", "geste de premier secours 2"],
            "protocole": "texte court sur la conduite à tenir pour le transport ou l'attente",
            "advice": "conseil final rassurant mais ferme sur la nécessité de consulter un vétérinaire"
          }`
        }],
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    const aiResult = JSON.parse(data.choices[0].message.content);
    res.status(200).json(aiResult);
    
  } catch (error) {
    console.error("Erreur Mistral:", error);
    res.status(500).json({ error: "Erreur lors de l'analyse IA" });
  }
}
