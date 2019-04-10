import DB, { sequelize } from '../database/models';
import {
  find, map, pick, keys, forEach
} from 'lodash';

import { AUTHOR_FIELDS, AFFILIATION_FIELDS, insideRoutes } from '../utils/globalConfig';


export const getUser = async (req, res) => {
  const userInfo = await DB.users.findOne({ attributes: ['id', ...keys(AUTHOR_FIELDS)], where: { id: req.userId } });
  res.status(200).json(userInfo);
};

export const getUsers = async (req, res) => {
  const { search } = req.query;

  const query = {
    attributes: ['id', 'lastName', 'firstName', 'email'],
    where: {
      $or: [{
        lastName: { $like: `%${search}%` }
      }, {
        firstName: { $like: `%${search}%` }
      }],
      $and: {
        id: { $notIn: [req.userId] }
      }
    },
    include: [
      {
        model: DB.affiliation,
        required: true
      }

    ]
  };
  const users = await DB.users.findAll(query);
  res.status(200).json(users);
};

export const saveUserInfo = async (req, res) => {
  const { lastName, firstName } = req.body;
  await DB.users.update(
    { lastName, firstName },
    { where: { id: req.userId } }
  );
  res.status(200).json({ id: req.userId });
};

export const getAffiliations = async (req, res) => {
  const { search } = req.query;
  if (!search) return res.status(200).json([]);

  const query = {
    where: { affiliation: { $like: `%${search}%` } },
    include: [
      {
        model: DB.users,
        attributes: [],
        required: true,
        where: {
          id: { $notIn: [req.userId] }
        }
      }
    ],
    limit: 10
  };

  const affiliations = await DB.affiliation.findAll(query);
  res.status(200).json(affiliations);
};

export const saveAffiliationForUser = async (req, res) => {
  const affiliationsParams = pick(req.body, keys(AFFILIATION_FIELDS));
  const { user_id } = req.session;
  const affiliations = await DB.affiliation.create(affiliationsParams);
  await DB.user_affiliation.create({ userId: user_id, affiliationId: affiliations.id });
  res.status(200).json(affiliations);
};

export const saveAffiliation = async (req, res) => {
  const affiliationsParams = pick(req.body, keys(AUTHOR_FIELDS));
  const affiliations = await DB.affiliation.create(affiliationsParams);
  res.status(200).json(affiliations);
};

export const saveAffiliationBoundForUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    await DB.user_affiliation.create({ userId: req.userId, affiliationId: id });
    const affiliation = await DB.affiliation.findByPk(id);
    res.status(200).json(affiliation);
  } catch (err) {
    next(err);
  }
};

export const deleteAffiliationForUser = async (req, res) => {
  const { id } = req.body;
  await DB.user_affiliation.destroy({
    where: {
      userId: req.userId,
      affiliationId: id
    }
  });
  res.status(200).json({ id });
};


export const saveNewUser = async (req, res) => {
  let transaction;
  try {
    const userData = pick(req.body, keys(AUTHOR_FIELDS));
    const { affiliations } = req.body;
    transaction = await sequelize.transaction();
    const user = await DB.users.create(userData, { transaction });
    await DB.user_affiliation.bulkCreate(map(affiliations,
      ({ id }) => ({ userId: user.id, affiliationId: id })),
    { transaction });
    await transaction.commit();
    res.status(200).json({ id: user.id });
  } catch (err) {
    if (err) await transaction.rollback();
    res.status(500).end();
  }
};

export const saveThesis = async (req, res) => {
  let transaction;
  try {
    const thesisData = pick(req.body, ['title', 'text']);
    const { users } = req.body;
    transaction = await sequelize.transaction();
    const thesis = await DB.thesis.create(thesisData, { transaction });
    await DB.user_thesis.bulkCreate(map(users,
      ({ id }) => ({ userId: id, thesisId: thesis.id })),
    { transaction });
    await transaction.commit();
    res.status(200).json({ redirect: '/thesis/list' });
  } catch (err) {
    if (err) await transaction.rollback();
    res.status(500).end();
  }
};

export const getUserThesises = async (req, res) => {
  const thesis = await DB.thesis.findAll({
    include: [
      {
        model: DB.users,
        where: {
          id: req.userId
        }
      }

    ]
  });
  res.status(200).json({ thesis });
};

export const getUserThesis = async (req, res) => {
  const { id } = req.params;
  const thesis = await DB.thesis.findOne({
    where: { id },
    include: [
      {
        model: DB.users,
        attributes: ['id', ...keys(AUTHOR_FIELDS)],
        include: [{
          model: DB.affiliation,
          attributes: keys(AFFILIATION_FIELDS)
        }]
      }
    ]
  });
  res.status(200).json(thesis);
};

export const getAffiliationForMe = async (req, res) => {
  const affiliations = await DB.affiliation.findAll({
    include: [
      {
        model: DB.users,
        attributes: [],
        where: {
          id: req.userId
        }
      }
    ]
  });
  res.status(200).json(affiliations);
};

export const deleteUserThesis = async (req, res) => {
  const { id } = req.params;
  const delId = await DB.thesis.destroy({
    where: {
      id
    }
  });
  res.status(200).json({ id: delId });
};

export const saveThesisById = async (req, res) => {
  let transaction;
  try {
    const thesisData = pick(req.body, ['title', 'text']);
    const { id: thesisId } = req.params;
    const { users } = req.body;
    const userIds = map(users, 'id');
    transaction = await sequelize.transaction();
    await DB.thesis.update(thesisData, { where: { id: thesisId } }, { transaction });
    // TODO доделать лучше
    const usersDB = await DB.user_thesis.findAll({ where: { thesisId }, raw: true }, { transaction });
    const userDBIds = map(usersDB, 'userId');
    forEach(userDBIds, async (id) => {
      if (!userIds.includes(id)) {
        await DB.user_thesis.destroy({
          where: {
            userId: id,
            thesisId
          }
        }, { transaction });
      }
    });

    forEach(userIds, async (id) => {
      if (!userDBIds.includes(id)) {
        await DB.user_thesis.create({
          userId: id,
          thesisId

        });
      }
    });


    await transaction.commit();
    res.status(200).json();
  } catch (err) {
    if (err) await transaction.rollback();
    res.status(500).end();
  }
};

export const getAllPages = async (req, res) => {
  const pages = await DB.pages.findAll({ raw: true });
  res.status(200).json(pages);
};

export const getPageById = async (req, res) => {
  const { id } = req.params;
  const page = await DB.pages.findByPk(id);
  res.status(200).json(page);
};

export const createPage = async (req, res) => {
  const pageData = pick(req.body, ['title', 'body', 'url', 'order']);
  await DB.pages.create(pageData);
  res.status(200).json({ redirect: insideRoutes.admin.page.list });
};

export const deletePageById = async (req, res) => {
  const { id } = req.params;
  await DB.pages.destroy({ where: { id } });
  res.status(200).json({ id });
};

export const editPage = async (req, res) => {
  const { id } = req.params;
  const pageData = pick(req.body, ['title', 'body', 'url', 'order']);
  await DB.pages.update(pageData, { where: { id } });
  res.status(200).json({ redirect: insideRoutes.admin.page.list });
};

export const profileFullness = async (req, res) => {
  const user = await DB.users.findByPk(req.userId);
  const affiliation = await DB.user_affiliation.findOne({ where: { userId: req.userId } });
  if (user.lastName && user.firstName && affiliation) {
    res.status(200).json({ fullness: true });
  }
  res.status(200).json({ fullness: false });
};
