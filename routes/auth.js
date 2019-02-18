import { Router } from 'express';
import {
  registrationController,
  renderLogin,
  checkEmailHashController,
  renderRegistration,
  loginController,
  logoutController
} from '../controllers/auth';
import { catchValidationError, validateLoginForm, validateRegistrationForm } from '../utils/validations';

const router = Router();

router.get('/registration', renderRegistration);
router.post('/registration', validateRegistrationForm, catchValidationError, registrationController);

router.get('/login', renderLogin);
router.post('/login', validateLoginForm, catchValidationError, loginController);

router.get('/logout', logoutController);
router.get('/send', checkEmailHashController);


export default router;
