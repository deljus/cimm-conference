import nodemailer from 'nodemailer';
import { config } from '../globalConfig';
import { markdown } from 'markdown';

export const transporter = ({ emailTransporter }) => nodemailer.createTransport(emailTransporter);

export const mailTemplate = ({ to, from, sendMailUrl }) => {
  const str = config.emailTemplate.join('\n\n');
  const mark = str.replace('{sendMailUrl}', sendMailUrl);
  return ({
    to,
    subject: config.emailTitle,
    html: markdown.toHTML(mark)
  });
};
