const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

// Sostituisci con la tua chiave segreta di reCAPTCHA
const secretKey = "6LdK11wrAAAAADk8bpxgjEjiGyMhWyp3NhcuH4o1";

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/verifica", async (req, res) => {
  const token = req.body["g-recaptcha-response"];
  const nome = req.body.nome;

  if (!token) {
    return res.send("CAPTCHA mancante.");
  }

  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    const response = await fetch(verifyURL, { method: "POST" });
    const data = await response.json();

    if (data.success) {
      res.send(`Captcha verificato con successo. Grazie ${nome}!`);
    } else {
      res.send("Verifica CAPTCHA fallita. Riprova.");
    }
  } catch (err) {
    res.status(500).send("Errore nella verifica CAPTCHA.");
  }
});

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
