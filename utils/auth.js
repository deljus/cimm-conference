export const checkUser = async (req, res, next) => {
  if (req.session.user_id) {
    req.userId = req.session.user_id;
    next();
  }

  if (req.xhr) {
    res.status(401).json({ redirect: '/login' }).end();
  }

  res.status(401).redirect('/login');
};
