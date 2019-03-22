import DB from '../database/models';
import { find, map, isNil } from 'lodash';
import { markdown } from 'markdown';
import { config, insideRoutes, outsideRouters } from '../globalConfig';

export const getPageAndAuth = async (req, res, next) => {
  const allPages = await DB.pages.findAll({ raw: true });
  const auth = !isNil(req.session.user_id);
  const admin = req.session.is_admin;
  const { routePrefix } = config;
  req.forPage = {
    allPages, auth, admin, routePrefix, menu: allPages, insideRoutes, outsideRouters
  };
  return next();
};


// TODO not found page
export const renderIndex = async (req, res) => {
  const { allPages } = req.forPage;
  const index = find(allPages, ['order', 0]);
  const body = markdown.toHTML(index.body);
  res.render('pages/publicPages', {
    title: index.title, body, ...req.forPage
  });
};

export const rendePublicPages = async (req, res) => {
  const { url } = req.params;
  const { allPages } = req.forPage;
  const page = find(allPages, ['url', `/${url}`]);
  if (page) {
    const body = markdown.toHTML(page.body);
    res.render('pages/publicPages', {
      title: page.title, body, ...req.forPage
    });
  }
  res.status(404).end();
};

export const rendeProfile = async (req, res) => {
  res.render('pages/profile', { ...req.forPage });
};

export const renderThesisPage = async (req, res) => {
  res.render('pages/thesis', { ...req.forPage });
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
