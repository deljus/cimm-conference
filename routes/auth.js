import { Router } from 'express';
import {
  registrationController,
  renderLogin,
  checkEmailHashController,
  renderRegistration,
  validateRegistrationForm,
  validateLoginForm,
  loginController,
  logoutController
} from '../controllers/auth';

const router = Router();

router.get('/registration', renderRegistration);
router.post('/registration', validateRegistrationForm, registrationController);

router.get('/login', renderLogin);
router.post('/login', validateLoginForm, loginController);

router.get('/logout', logoutController);
router.get('/send', checkEmailHashController);


export default router;
