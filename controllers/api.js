import DB, { sequelize } from '../database/models';
import {
  find, map, isNil, pick
} from 'lodash';
import { markdown } from 'markdown';


export const getUser = async (req, res) => {
  const { user_id } = req.session;
  const userInfo = await DB.users.findOne({ attributes: ['id', 'lastName', 'firstName'], where: { id: user_id } });
  res.status(200).json(userInfo);
};

export const getUsers = async (req, res) => {
  const { user_id } = req.session;
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
        id: { $notIn: [user_id] }
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
  const { user_id } = req.session;
  await DB.users.update(
    { lastName, firstName },
    { where: { id: user_id } }
  );
  res.status(200).json({ id: user_id });
};

export const getAffiliations = async (req, res) => {
  const { user_id } = req.session;
  const { search } = req.query;

  if (!search && !isNil(search)) {
    return res.status(200).json([]);
  }

  let query;

  if (search) {
    query = {
      where: { affiliation: { $like: `%${search}%` } },
      limit: 10
    };
  } else {
    query = {
      include: [
        {
          model: DB.users,
          attributes: [],
          where: {
            id: user_id
          }
        }
      ]
    };
  }
  const affiliations = await DB.affiliation.findAll(query);
  res.status(200).json(affiliations);
};

export const saveAffiliationForUser = async (req, res) => {
  const {
    country,
    city,
    affiliation,
    address,
    zip
  } = req.body;
  const { user_id } = req.session;
  const affiliations = await DB.affiliation.create({
    country,
    city,
    affiliation,
    address,
    zip
  });
  await DB.user_affiliation.create({ userId: user_id, affiliationId: affiliations.id });
  res.status(200).json(affiliations);
};

export const saveAffiliation = async (req, res) => {
  const {
    country,
    city,
    affiliation,
    address,
    zip
  } = req.body;
  const affiliations = await DB.affiliation.create({
    country,
    city,
    affiliation,
    address,
    zip
  });
  res.status(200).json(affiliations);
};

export const saveAffiliationBoundForUser = async (req, res) => {
  const {
    id
  } = req.body;
  const { user_id } = req.session;
  await DB.user_affiliation.create({ userId: user_id, affiliationId: id });
  const affiliation = await DB.affiliation.findByPk(id);
  res.status(200).json(affiliation);
};

export const deleteAffiliationForUser = async (req, res) => {
  const { id } = req.body;
  const { user_id } = req.session;
  const affiliations = await DB.user_affiliation.destroy({
    where: {
      userId: user_id,
      affiliationId: id
    }
  });
  res.status(200).json(affiliations);
};


export const saveNewUser = async (req, res) => {
  let transaction;
  try {
    const userData = pick(req.body, ['lastName', 'firstName', 'email']);
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
  const { user_id } = req.session;
  const thesis = await DB.thesis.findAll({
    include: [
      {
        model: DB.users,
        where: {
          id: user_id
        }
      }

    ]
  });
  res.status(200).json({ thesis });
};

export const getUserThesis = async (req, res) => {
  const { id } = req.params;
  const thesis = await DB.thesis.findByPk(id);
  res.status(200).json(thesis);
};
