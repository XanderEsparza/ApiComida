const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'xandervesper342@gmail.com',
      pass: 'nogm hwov oenq zgox',
    },
});

module.exports = transporter;