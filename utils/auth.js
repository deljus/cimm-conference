import { isNil } from 'lodash';

export const checkUser = async (req, res, next) => {
  if (!isNil(req.session.user_id)) {
    req.userId = req.session.user_id;
    return next();
  }

  if (req.xhr) {
    return res.status(401).json({ redirect: '/login' });
  }

  return res.status(401).redirect('/login');
};

export const checkAdmin = async (req, res, next) => {
  if (!isNil(req.session.is_admin)) {
    return next();
  }

  if (req.xhr) {
    return res.status(404);
  }

  return res.status(404);
};
