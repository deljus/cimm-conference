import { Router } from 'express';
import { rendePublicPages, renderIndex } from '../controllers/pages';

const router = Router();
router.get('/', renderIndex);
router.get('/:url', rendePublicPages);

export default router;
