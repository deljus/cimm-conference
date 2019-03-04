import { Router } from 'express';
import { rendePublicPages, renderIndex, rendeProfile } from '../controllers/pages';
import { getUser, saveUserInfo, getAffiliationForUser, saveAffiliationForUser } from '../controllers/api';

const router = Router();
router.get('/', renderIndex);

router.get('/user', getUser);
router.post('/user', saveUserInfo);

router.get('/affiliations', getAffiliationForUser);
router.post('/affiliation', saveAffiliationForUser);

router.get('/profile', rendeProfile);
router.get('/:url', rendePublicPages);



export default router;
