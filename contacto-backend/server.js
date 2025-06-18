const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "opendatarail@gmail.com",
    pass: "lsmcbveyisiodlln", // password per app
  },
});

// Inserisci qui la tua chiave segreta reCAPTCHA v2 (dal sito Google)
const RECAPTCHA_SECRET_KEY = "6LdK11wrAAAAADk8bpxgjEjiGyMhWyp3NhcuH4o1";

app.post("/contact", async (req, res) => {
  const { nombre, email, consulta, token } = req.body;

  if (!nombre || !email || !consulta || !token) {
    return res.status(400).json({ message: "Por favor, rellena todos los campos." });
  }

  // Verificar reCAPTCHA con Google
  try {
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const response = await axios.post(verifyUrl, null, {
      params: {
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      },
    });

    const data = response.data;

    if (!data.success) {
      return res.status(400).json({ message: "Verificación reCAPTCHA fallida." });
    }
  } catch (err) {
    console.error("Error al verificar reCAPTCHA:", err.message);
    return res.status(500).json({ message: "Error en la verificación del CAPTCHA." });
  }

  // Si el captcha es válido, enviar el correo
  const mailOptions = {
    from: "openda@gmail.com",
    replyTo: email,
    to: "opendatarail@gmail.com",
    subject: `Consulta de ${nombre}`,
    text: `Nombre: ${nombre}\nEmail: ${email}\nConsulta:\n${consulta}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar correo:", error);
      return res.status(500).json({ message: "Error al enviar el correo." });
    }
    console.log("Correo enviado:", info.response);
    res.json({ message: "¡Gracias por tu consulta! Nos pondremos en contacto contigo pronto." });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
