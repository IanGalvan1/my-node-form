const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Configurar body-parser para manejar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Ruta para el formulario de contacto
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Configuración del transporte de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes usar otros servicios SMTP como Yahoo, Outlook, etc.
  auth: {
    user: 'codigoprueba29@gmail.com', // Reemplaza con tu correo electrónico
    pass: 'qujymxbjvvwblqyc' // Reemplaza con tu contraseña de aplicación
  }
});

// Ruta para manejar la presentación del formulario
app.post('/submit-form', (req, res) => {
  // Acceder a los datos del formulario enviados por el usuario
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  // Configuración del correo electrónico
  const mailOptions = {
    from: 'codigoprueba29@gmail.com', // Dirección del remitente (puede ser el mismo que el usuario)
    to: email, // Dirección del destinatario (correo del usuario que envía el formulario)
    subject: 'Gracias por tu mensaje',
    text: `Hola ${name},\n\nGracias por contactarnos. Hemos recibido tu mensaje:\n\n"${message}"\n\nNos pondremos en contacto contigo pronto.\n\nSaludos,\nEquipo de Soporte`
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo:', error);
      res.send('Hubo un error al enviar tu mensaje. Inténtalo de nuevo.');
    } else {
      console.log('Correo enviado:', info.response);
      res.redirect('/success'); // Redirigir a una página de éxito
    }
  });
});

// Ruta para la página de éxito
app.get('/success', (req, res) => {
  res.sendFile(__dirname + '/public/success.html');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
