import bcrypt from 'bcrypt';
import randomstring from 'randomstring';
import { pick, omit } from 'lodash';
import url from 'url';
import { mailTemplate, transporter } from '../utils/sendMessage';
import DB from '../database/models';
import { config, outsideRouters, insideRoutes } from '../utils/globalConfig';

const salt = '$2b$12$hQkZGSu0X3JN9Nl91zc5sO';

export const checkEmailinDB = async (req, res, next) => {
  const { email } = req.body;
  const user = await DB.users.find({
    where: {
      email,
      isVerifiedEmail: true
    }
  });
  if (user) {
    res.status(422).json({ message: 'A user with this email already exists' });
  } else {
    next();
  }
};

export const registrationController = async (req, res) => {
  const userParams = pick(req.body, ['firstName', 'lastName', 'middleName', 'country', 'phone', 'email']);
  const hash = randomstring.generate();
  const sendMailUrl = url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: outsideRouters.send,
    query: {
      hash
    }
  });

  const templateToMail = mailTemplate({
    to: userParams.email,
    from: config.emailTransporter.auth.user,
    emailTemplate: config.email.registration.template,
    emailTitle: config.email.registration.title,
    sendMailUrl
  });


  try {
    await transporter(config).sendMail(templateToMail);
    const password = bcrypt.hashSync(req.body.password, salt);

    // если есть user обновляем либо создаем

    const user = await DB.users.findOne({
      where: {
        email: userParams.email
      }
    });
    if (user) {
      await DB.users.update({
        isVerifiedEmail: false,
        hash,
        password
      }, {
        where: {
          email: userParams.email
        }
      });
    } else {
      await DB.users.create({
        isVerifiedEmail: false,
        hash,
        password,
        ...userParams
      });
    }


    res.status(200).send({ message: 'We sent you a password confirmation link in the mail. Please check your mail.' });
  } catch (e) {
    console.error(e);
    res.status(422).json({ message: 'Error to transporter' });
  }
};

export const loginController = async (req, res) => {
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
      return res.status(422).json({ message: 'Not valid password' });
    }

    req.session.user_id = user.id;
    req.session.is_admin = user.isAdmin;
    return res.status(200).json({ redirect: outsideRouters.index });
  } catch (e) {

  }
};

export const changePassController = async (req, res) => {
  const { email } = req.body;
  const hash = randomstring.generate();
  const sendMailUrl = url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: insideRoutes.auth.changePass,
    query: {
      hash
    }
  });

  const templateToMail = mailTemplate({
    to: email,
    from: config.emailTransporter.auth.user,
    emailTemplate: config.email.changePassword.template,
    emailTitle: config.email.changePassword.title,
    sendMailUrl
  });


  try {
    await transporter(config).sendMail(templateToMail);
    await DB.users.update({
      isVerifiedEmail: false,
      hash
    }, { where: { email } });
    res.status(200).send({ message: 'We sent you a password confirmation link in the mail. Please check your mail.' });
  } catch (e) {
    console.error(e);
    res.status(422).json({ message: 'Mail transport error' });
  }
};

export const newPassController = async (req, res) => {
  const { hash, password: bodyPassword } = req.body;

  const password = bcrypt.hashSync(bodyPassword, salt);

  if (hash) {
    const user = await DB.users.update(
      { isVerifiedEmail: true, password },
      { where: { hash } }
    );
    if (user[0]) {
      return res.status(200).json({ redirect: insideRoutes.auth.login });
    }
  }
  res.status(400).json({ message: 'Change password error' });
};


export const renderAuth = (req, res) => res.render('auth', { ...config, outsideRouters });

export const checkEmailHashController = async (req, res) => {
  const { hash } = req.query;

  if (req.query.hash) {
    const user = await DB.users.update(
      { isVerifiedEmail: true },
      { where: { hash } }
    );
    if (user[0]) {
      return res.redirect(insideRoutes.auth.login);
    }
  }
  res.status(400).send('Email is not valid');
};

export const logoutController = async (req, res) => {
  await req.session.destroy();
  res.redirect(outsideRouters.index);
};
