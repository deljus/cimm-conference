import { Router } from 'express';
import { values } from 'lodash';
import { rendePublicPages, renderIndex, rendeProfile, renderThesisPage, getPageAndAuth } from '../controllers/pages';
import { checkUser } from '../utils/auth';
import { insideRoutes } from '../globalConfig';

const router = Router();
router.get('/', getPageAndAuth, renderIndex);
router.get('/profile', checkUser, getPageAndAuth, rendeProfile);
// Все роуты будут через react-router
router.get(values(insideRoutes.thesis), checkUser, getPageAndAuth, renderThesisPage);
router.get('/:url', getPageAndAuth, rendePublicPages);


export default router;
