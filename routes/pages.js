import { Router } from 'express';
import { rendePublicPages, renderIndex, rendeProfile, renderThesisPage } from '../controllers/pages';


const router = Router();
router.get('/', renderIndex);
router.get('/profile', rendeProfile);
// Все роуты будут через react-router
router.get(['/thesis/create', '/thesis/edit/*', '/thesis/list', '/thesis/show/*'], renderThesisPage);

router.get('/page/:url', rendePublicPages);


export default router;
