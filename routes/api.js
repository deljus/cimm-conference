import { Router } from 'express';
import * as api from '../controllers/api';
import { apiRoutes } from '../globalConfig';
import { checkUser } from '../utils/auth';

const router = Router();

router.get(apiRoutes.user.current, checkUser, api.getUser);
router.get(apiRoutes.user.all, checkUser, api.getUsers);
router.post(apiRoutes.user.current, checkUser, api.saveUserInfo);
router.put(apiRoutes.user.current, checkUser, api.saveNewUser);

router.get(apiRoutes.affiliation.all, checkUser, api.getAffiliations);
router.post(apiRoutes.affiliation.current, checkUser, api.saveAffiliation);
router.post(apiRoutes.affiliation.forCurrentUser, checkUser, api.saveAffiliationForUser);
router.post(apiRoutes.affiliation.boundForUser, checkUser, api.saveAffiliationBoundForUser);
router.delete(apiRoutes.affiliation.forCurrentUser, checkUser, api.deleteAffiliationForUser);

router.put(apiRoutes.thesis.current, checkUser, api.saveThesis);
router.get(apiRoutes.thesis.all, checkUser, api.getUserThesises);
router.get('/thesis/:id', checkUser, api.getUserThesis);

export default router;
