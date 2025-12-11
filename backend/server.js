const express = require('express');
const axios = require('axios'); // → utilisé pour appeler l'API Brevo
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// --- CORS ---
const allowedOrigins = [
    'http://cocolab.fr',
    'https://cocolab.fr',
    'http://www.cocolab.fr',
    'https://www.cocolab.fr',
    'http://localhost:4200'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (!allowedOrigins.includes(origin)) {
            return callback(new Error("Origine non autorisée par CORS"), false);
        }
        return callback(null, true);
    }
}));

app.use(express.json());

// --- Endpoint d'envoi d'email via Brevo ---
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    // Vérification des champs
    if (!name || !email || !message) {
        return res.status(400).send({ message: "Tous les champs sont requis." });
    }

    try {
        // Envoi du mail via Brevo API
        await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: { name, email },
                to: [{ email: "contact.cocolab@gmail.com" }],
                subject: `Nouveau message de contact CocoLab`,
                htmlContent: `
          <h3>Nouveau message :</h3>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Message :</strong></p>
          <p>${message}</p>
        `
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        res.status(200).send({ message: "Message envoyé avec succès !" });

    } catch (error) {
        console.error("❌ Erreur Brevo:", error.response?.data || error.message);
        res.status(500).send({ message: "Erreur lors de l'envoi du message." });
    }
});

// --- Lancement du serveur ---
app.listen(port, () => {
    console.log(`🚀 Backend en ligne sur le port ${port}`);
});
