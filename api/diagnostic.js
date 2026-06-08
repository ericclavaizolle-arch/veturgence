export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Méthode non autorisée" });

  const { animal, query, plan } = req.body;

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
          content: `Analyse pour un ${animal} sous la formule ${plan}. Symptômes : ${query}. Donne un avis expert et conseille une consultation si nécessaire.` 
        }]
      })
    });

    const data = await response.json();
    res.status(200).json(data);
    
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur lors de l'appel API" });
  }
}
