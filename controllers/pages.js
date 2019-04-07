import DB from '../database/models';
import {
  find, map, isNil, eq
} from 'lodash';
import {
  config, insideRoutes, outsideRouters
} from '../utils/globalConfig';

export const getPageAndAuth = async (req, res, next) => {
  const menu = await DB.pages.findAll({
    attributes: ['id', 'title', 'url'],
    order: [['order']]
  });

  const auth = !isNil(req.session.user_id);
  const admin = req.session.is_admin;
  const { conferenceName } = config;
  req.forPage = {
    auth, admin, menu, insideRoutes, outsideRouters, conferenceName
  };
  return next();
};

export const rendePublicPages = async (req, res) => {
  const { url } = req.params;

  const page = await DB.pages.findOne({
    attributes: ['id', 'title', 'body'],
    where: {
      url: `/${url || ''}`
    },
    raw: true
  });

  const pageData = page || { body: 'Not found page' };
  res.render('pages/publicPages', {
    ...pageData, ...req.forPage
  });
};

export const rendeProfile = async (req, res) => {
  res.render('pages/profile', { ...req.forPage });
};

export const renderThesisPage = async (req, res) => {
  res.render('pages/thesis', { ...req.forPage });
};

export const rendeStaticPage = async (req, res) => {
  res.render('admin/staticPage', { ...req.forPage });
};

export const renderUsersPage = async (req, res) => {
  const { page } = req.query;
  const limit = 10;
  const currentPage = parseInt(page) ? parseInt(page) - 1 : 0;
  const offset = limit * currentPage;
  const data = await DB.users.findAndCountAll({ limit, offset });
  const all = Math.ceil(data.count / limit);
  const pages = [...Array(all).keys()];
  res.render('admin/usersPage', { ...data, ...req.forPage, pages });
};
