import { Router } from 'express';
import { rendePublicPages, renderIndex, rendeProfile } from '../controllers/pages';
import { getUser, saveUserInfo } from '../controllers/api';

const router = Router();
router.get('/', renderIndex);

router.get('/user', getUser);
router.post('/user', saveUserInfo);

router.get('/profile', rendeProfile);
router.get('/:url', rendePublicPages);



export default router;
