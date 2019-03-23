import DB, { sequelize } from '../database/models';
import {
  find, map, pick, keys
} from 'lodash';

import { AUTHOR_FIELDS, AFFILIATION_FIELDS, insideRoutes } from '../globalConfig';


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

  const affiliations = await DB.affiliation.findAll({
    where: { affiliation: { $like: `%${search}%` } },
    limit: 10
  });
  res.status(200).json(affiliations);
};

export const saveAffiliationForUser = async (req, res) => {
  const affiliationsParams = pick(req.body, keys(AUTHOR_FIELDS));
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

export const saveAffiliationBoundForUser = async (req, res) => {
  const { id } = req.body;
  await DB.user_affiliation.create({ userId: req.userId, affiliationId: id });
  const affiliation = await DB.affiliation.findByPk(id);
  res.status(200).json(affiliation);
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
        attributes: keys(AUTHOR_FIELDS),
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
    const { id } = req.params;
    const { users } = req.body;
    transaction = await sequelize.transaction();
    const thesis = await DB.thesis.update({ ...thesisData, where: { id } }, { transaction });
    // TODO доделать сохранение
    // await DB.user_thesis.bulkCreate(map(users,
    //   ({ id }) => ({ userId: id, thesisId: thesis.id })),
    // { transaction });
    await transaction.commit();
    res.status(200).json({ redirect: insideRoutes.thesis.list });
  } catch (err) {
    if (err) await transaction.rollback();
    res.status(500).end();
  }
};
