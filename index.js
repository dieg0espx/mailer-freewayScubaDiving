const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const bodyParser = require('body-parser');

// Parse JSON request bodies
app.use(bodyParser.json());

// Parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route
app.post('/bookingPayment', async (req, res) => {
  const { name, email, link } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tecnodael@gmail.com',
        pass: 'ghtlxjfxetitxwyn'
      }
    });

    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve('./views'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./views'),
      extName: ".handlebars",
    };
    transporter.use('compile', hbs(handlebarOptions));

    const mailOptions = {
      from: 'Freeway Scuba Diving',
      to: email,
      subject: 'Booking Confirmation',
      template: 'email',
      context: {
        name: name,
        link: link
      }
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.send(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error sending email');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
