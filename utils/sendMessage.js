import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'musindelus@gmail.com',
    pass: 'whilewhileTrue1'
  }
});

export const mailTemplate = ({ to, urlToMail }) => ({
  from: 'musindelus@gmail.com',
  to,
  subject: 'Registration on conference KSSCl - 2019',
  html: `<b>Hi!</b><a href=${urlToMail} >Link</a>`
});
