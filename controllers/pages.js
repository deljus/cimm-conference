import DB from '../database/models';
import { find, map, isNil } from 'lodash';
import { markdown } from 'markdown';
// TODO not found page
export const renderIndex = async (req, res) => {
  const allPages = await DB.pages.findAll({ raw: true });
  const index = find(allPages, ['order', 0]);
  const body = markdown.toHTML(index.body);
  const auth = !isNil(req.session.user_id);
  res.render('pages/publicPages', {
    title: index.title, body, menu: allPages, auth
  });
};

export const rendePublicPages = async (req, res) => {
  const { url } = req.params;
  const allPages = await DB.pages.findAll({ raw: true });
  const page = find(allPages, ['url', `/${url}`]);
  if (page) {
    const body = markdown.toHTML(page.body);
    const auth = !isNil(req.session.user_id);
    res.render('pages/publicPages', {
      title: page.title, body, menu: allPages, auth
    });
  }
  res.status(404).end();
};

export const rendeProfile = async (req, res) => {
  const allPages = await DB.pages.findAll({ raw: true });
  const auth = !isNil(req.session.user_id);
  res.render('pages/profile', { menu: allPages, auth });
};

export const renderThesisPage = async (req, res) => {
  const allPages = await DB.pages.findAll({ raw: true });
  const auth = !isNil(req.session.user_id);
  res.render('pages/thesis', { menu: allPages, auth });
};
