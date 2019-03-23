import { Router } from 'express';
import * as api from '../controllers/api';
import fileUpload from '../controllers/fileUpload';
import { apiRoutes } from '../globalConfig';
import { checkUser } from '../utils/auth';

const router = Router();

router.get(apiRoutes.user.current, checkUser, api.getUser);
router.get(apiRoutes.user.all, checkUser, api.getUsers);
router.post(apiRoutes.user.current, checkUser, api.saveUserInfo);
router.put(apiRoutes.user.current, checkUser, api.saveNewUser);


router.get(apiRoutes.affiliation.all, checkUser, api.getAffiliations);
router.get(apiRoutes.affiliation.me, checkUser, api.getAffiliationForMe);
router.delete(apiRoutes.affiliation.me, checkUser, api.deleteAffiliationForUser);
router.post(apiRoutes.affiliation.boundForMe, checkUser, api.saveAffiliationBoundForUser);

router.post(apiRoutes.affiliation.create, checkUser, api.saveAffiliation);
router.post(apiRoutes.affiliation.me, checkUser, api.saveAffiliationForUser);


router.put(apiRoutes.thesis.me, checkUser, api.saveThesis);
router.get(apiRoutes.thesis.all, checkUser, api.getUserThesises);
router.get(apiRoutes.thesis.meToId, checkUser, api.getUserThesis);
router.post(apiRoutes.thesis.meToId, checkUser, api.saveThesisById);
router.delete(apiRoutes.thesis.meToId, checkUser, api.deleteUserThesis);

router.post(apiRoutes.uploadFile, checkUser, fileUpload);

export default router;
