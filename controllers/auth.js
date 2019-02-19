import bcrypt from 'bcrypt';
import randomstring from 'randomstring';
import { pick } from 'lodash';
import url from 'url';
import { mailTemplate, transporter } from '../utils/sendMessage';
import { check, validationResult } from 'express-validator/check';
import DB from '../database/models';

const salt = '$2b$12$hQkZGSu0X3JN9Nl91zc5sO';

export const registrationController = async (req, res) => {
  const hash = randomstring.generate();
  const urlToMail = url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: '/send',
    query: {
      hash
    }
  });

  const templateToMail = mailTemplate({
    to: 'musindelus@gmail.com',
    urlToMail
  });

  const userParams = pick(req.body, ['firstName', 'lastName', 'middleName', 'country', 'phone', 'email']);

  try {
    await transporter.sendMail(templateToMail);
    const password = bcrypt.hashSync(req.body.password, salt);
    await DB.users.create({
      isVerifiedEmail: false,
      hash,
      password,
      ...userParams
    });
    res.status(200).send({ message: 'We sent you a password confirmation link in the mail. Please check your mail.' });
  } catch (e) {
    res.status(422).json({ message: 'We sent you a password confirmation link in the mail. Please check your mail.' });
  }
};

export const loginController = async (req, res, next) => {

  const { email, password: bodyPassword } = req.body;
  const password = bcrypt.hashSync(bodyPassword, salt);

  try {
    const user = await DB.users.find({
      where: {
        email,
        password,
        isVerifiedEmail: true
      }
    });

    if (!user) {
      return res.status(422).json({ errors: [{ msg: 'User not found or you not check email' }] });
    }

    req.session.user_id = user.id;
    return res.redirect('/');

  } catch (e) {

  }
};


export const renderRegistration = (req, res) => res.render('registration');

export const renderLogin = (req, res) => res.render('login');

export const checkEmailHashController = async (req, res) => {
  const { hash } = req.query;

  if (req.query.hash) {
    const user = await DB.users.update(
      { isVerifiedEmail: true },
      { where: { hash } }
    );
    if (user[0]) {
      return res.redirect('/login');
    }
  }
  res.status(400).send('Email is not valid');
};

export const logoutController = async (req, res) => {
  try{
    await req.session.destroy();
    return res.redirect('/login');
  }catch (e) {

  }
};
