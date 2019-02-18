import DB from '../database/models';

export const loadUser = async (req, res, next) => {
  if (req.session.user_id) {
    const user = await DB.users.findByPk(req.session.user_id);
    if (user) {
      req.currentUser = user;
      next();
    } else {
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
};
