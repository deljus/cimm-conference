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
    const user = await DB.users.update(
        { lastName, firstName },
        { where: { id: user_id } }
    );
    res.status(200).end();
};
