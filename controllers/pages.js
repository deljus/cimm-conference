import DB from '../database/models';
import {
  find, map, isNil, eq
} from 'lodash';
import { markdown } from 'markdown';
import {
  config, insideRoutes, outsideRouters
} from '../utils/globalConfig';
import resolveUrl from '../dynamic/core/resolveUrl';

export const getPageAndAuth = async (req, res, next) => {
  const allPages = await DB.pages.findAll({ raw: true });
  const menu = map(allPages, (page) => {
    if (eq(page.url, '/')) {
      return ({ ...page, outside: false });
    }
    if (page.url.startsWith('http')) {
      return ({ ...page, outside: true });
    }
    return ({ ...page, url: resolveUrl(outsideRouters.page, { url: page.url }), outside: false });
  });

  const auth = !isNil(req.session.user_id);
  const admin = req.session.is_admin;
  const { routePrefix, conferenceName } = config;
  req.forPage = {
    allPages, auth, admin, routePrefix, menu, insideRoutes, outsideRouters, conferenceName
  };
  return next();
};


// TODO not found page
export const renderIndex = async (req, res) => {
  const { allPages } = req.forPage;
  const index = find(allPages, ['order', 0]);
  res.render('pages/publicPages', {
    ...index, ...req.forPage
  });
};

export const rendePublicPages = async (req, res) => {
  const { url } = req.params;
  const { allPages } = req.forPage;
  const page = find(allPages, ['url', url]);

  if (page) {
    res.render('pages/publicPages', {
      ...page, ...req.forPage
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
