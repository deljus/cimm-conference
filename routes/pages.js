import { Router } from 'express';
import { values } from 'lodash';
import { rendePublicPages, renderIndex, rendeProfile, renderThesisPage, getPageAndAuth, renderUsersPage, rendeStaticPage } from '../controllers/pages';
import { checkUser, checkAdmin } from '../utils/auth';
import { insideRoutes, outsideRouters } from '../utils/globalConfig';

const router = Router();
//router.get(outsideRouters.index, getPageAndAuth, renderIndex);
router.get(outsideRouters.profile, checkUser, getPageAndAuth, rendeProfile);
// Все роуты будут через react-router
router.get(values(insideRoutes.thesis), checkUser, getPageAndAuth, renderThesisPage);

router.get(outsideRouters.users, checkUser, checkAdmin, getPageAndAuth, renderUsersPage);
router.get(['/', outsideRouters.page], getPageAndAuth, rendePublicPages);

router.get(values(insideRoutes.admin.page), getPageAndAuth, checkAdmin, rendeStaticPage);
export default router;
