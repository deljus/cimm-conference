import { Router } from 'express';
import { renderAddTheses, renderIndex } from '../controllers/pages';
import { loadUser } from '../utils/auth';

const router = Router();


router.get('/', loadUser, renderIndex);

router.get('/add-theses', loadUser, renderAddTheses);

export default router;
