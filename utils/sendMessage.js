import nodemailer from 'nodemailer';
import { markdown } from 'markdown';

export const transporter = ({ emailTransporter }) => nodemailer.createTransport(emailTransporter);

export const mailTemplate = ({ to, from, sendMailUrl, emailTemplate, emailTitle }) => {
  const str = emailTemplate.join('\n\n');
  const mark = str.replace('{sendMailUrl}', sendMailUrl);
  return ({
    to,
    from,
    subject: emailTitle,
    html: markdown.toHTML(mark)
  });
};
