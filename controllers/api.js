import DB from '../database/models';
import { find, map, isNil } from 'lodash';
import {markdown} from "markdown";


export const getUser = async(req, res) => {
    const { user_id } = req.session;
    const userInfo = await DB.users.findOne({ attributes: ['lastName', 'firstName'], where: { id: user_id }});
    res.status(200).json(userInfo);
};

export const saveUserInfo = async(req, res) => {
    const { lastName, firstName } = req.body;
    const { user_id } = req.session;
    await DB.users.update(
        { lastName, firstName },
        { where: { id: user_id } }
    );
    res.status(200).json({ id: user_id });
};

export const getAffiliationForUser = async(req, res) => {
    const { user_id } = req.session;
    const affiliations = await DB.affiliation.findAll({ attributes: [
            'address',
            'affiliation',
            'city',
            'country',
            'zip',
            'id'
        ], include: [
            {
                model: DB.users,
                attributes: [],
                where: {
                        id: user_id
                    }
                }
        ] });
    res.status(200).json(affiliations);
};

export const saveAffiliationForUser = async(req, res) => {
    const {  country,
        city,
        affiliation,
        address,
        zip } = req.body;
    const { user_id } = req.session;
    const affiliations = await DB.affiliation.create({
        country,
        city,
        affiliation,
        address,
        zip
    });
    await DB.user_affiliation.create({ userId: user_id, affiliationId: affiliations.id })
    res.status(200).json(affiliations);
};

export const deleteAffiliationForUser = async(req, res) => {
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
