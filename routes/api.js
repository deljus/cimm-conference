import { Router } from 'express';
import {
    getUser, getUsers, saveNewUser, saveUserInfo, getAffiliationForUser, saveAffiliationForUser, saveAffiliation, deleteAffiliationForUser, saveAffiliationBoundForUser, saveThesis, getUserThesis, getUserThesises
} from '../controllers/api';

const router = Router();

router.get('/user', getUser);
router.get('/users', getUsers);
router.post('/user', saveUserInfo);
router.put('/user', saveNewUser);

router.get('/affiliations', getAffiliationForUser);
router.post('/affiliation-create', saveAffiliation);
router.post('/affiliation', saveAffiliationForUser);
router.post('/affiliation-bound', saveAffiliationBoundForUser);
router.delete('/affiliation', deleteAffiliationForUser);

router.put('/thesis', saveThesis);
router.get('/thesis/all', getUserThesises);
router.get('/thesis/:id', getUserThesis);


export default router;
