import { Router } from 'express';
import { rendePublicPages, renderIndex, rendeProfile, renderThesisPage } from '../controllers/pages';
import { checkUser } from '../utils/auth';

const router = Router();
router.get('/', renderIndex);
router.get('/page/:url', rendePublicPages);
router.get('/profile', checkUser, rendeProfile);
// Все роуты будут через react-router
router.get(['/thesis/create', '/thesis/edit/*', '/thesis/list', '/thesis/show/*'], checkUser, renderThesisPage);



export default router;
