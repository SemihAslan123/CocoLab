const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config(); // Pour charger les variables d'environnement

const app = express();
// Utilise le port du fichier .env ou 3000 par défaut
const port = process.env.PORT || 3000;

// Liste des adresses autorisées à contacter le serveur
const allowedOrigins = [
    'http://cocolab.fr',
    'https://cocolab.fr',
    'http://www.cocolab.fr',
    'https://www.cocolab.fr',
    'http://localhost:4200'
];

app.use(cors({
    origin: function (origin, callback) {
        // Autorise les requêtes sans origine (comme Postman ou applications mobiles)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            // Si l'origine n'est pas dans la liste, on bloque
            const msg = 'La politique CORS interdit l’accès depuis cette origine.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
app.use(express.json()); // Pour analyser le corps des requêtes en JSON

// Configuration Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Endpoint pour l'envoi d'e-mail
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send({ message: "Tous les champs sont requis." });
  }

  // Contenu de l'e-mail pour contact.cocolab@gmail.com
  const mailOptions = {
    from: `"${name}" <${email}>`, // Nom de l'expéditeur et son e-mail
    to: 'contact.cocolab@gmail.com', // Adresse de réception finale
    subject: `Nouveau message de contact CocoLab de: ${name}`,
    html: `
            <h3>Détails du message:</h3>
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Message envoyé avec succès!" });
  } catch (error) {
    console.error("Erreur d'envoi d'e-mail:", error);
    res.status(500).send({ message: "Erreur lors de l'envoi du message." });
  }
});

app.listen(port, () => {
  console.log(`Le serveur backend tourne sur le port ${port}`);
});
