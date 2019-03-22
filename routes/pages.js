import { Router } from 'express';
import { values } from 'lodash';
import { rendePublicPages, renderIndex, rendeProfile, renderThesisPage, getPageAndAuth, renderUsersPage } from '../controllers/pages';
import { checkUser, checkAdmin } from '../utils/auth';
import { insideRoutes, outsideRouters } from '../globalConfig';

const router = Router();
router.get(outsideRouters.index, getPageAndAuth, renderIndex);
router.get(outsideRouters.profile, checkUser, getPageAndAuth, rendeProfile);
// Все роуты будут через react-router
router.get(values(insideRoutes.thesis), checkUser, getPageAndAuth, renderThesisPage);

router.get(outsideRouters.users, checkUser, checkAdmin, getPageAndAuth, renderUsersPage);
router.get(outsideRouters.page, getPageAndAuth, getPageAndAuth, rendePublicPages);
export default router;
