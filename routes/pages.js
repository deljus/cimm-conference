import { Router } from 'express';
import { rendePublicPages, renderIndex, rendeProfile } from '../controllers/pages';
import {
  getUser, saveUserInfo, getAffiliationForUser, saveAffiliationForUser, deleteAffiliationForUser, saveAffiliationBoundForUser
} from '../controllers/api';

const router = Router();
router.get('/', renderIndex);

router.get('/user', getUser);
router.post('/user', saveUserInfo);

router.get('/affiliations', getAffiliationForUser);
router.post('/affiliation', saveAffiliationForUser);
router.post('/affiliation-bound', saveAffiliationBoundForUser);
router.delete('/affiliation', deleteAffiliationForUser);

router.get('/profile', rendeProfile);
router.get('/:url', rendePublicPages);


export default router;
