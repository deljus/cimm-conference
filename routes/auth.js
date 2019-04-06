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
import { apiRoutes, outsideRouters } from '../utils/globalConfig';

const router = Router();

router.get(outsideRouters.registration, renderRegistration);
router.get(outsideRouters.login, renderLogin);

router.get(outsideRouters.logout, logoutController);
router.get(outsideRouters.send, checkEmailHashController);

// api
router.post(apiRoutes.registration, validateRegistrationForm, catchValidationError, registrationController);
router.post(apiRoutes.login, validateLoginForm, catchValidationError, loginController);


export default router;
