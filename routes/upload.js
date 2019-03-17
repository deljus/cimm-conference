import { Router } from 'express';
import fileUpload from '../controllers/fileUpload'

const router = Router();
router.post('/upload', fileUpload);

export default router;
