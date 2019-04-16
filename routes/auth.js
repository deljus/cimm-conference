import { Router } from 'express';
import { values } from 'lodash';
import {
  registrationController,
  checkEmailHashController,
  renderAuth,
  loginController,
  logoutController,
  changePassController,
  checkEmailinDB,
  newPassController
} from '../controllers/auth';
import {
  catchValidationError, validateEmail, validateLoginForm, validateRegistrationForm
} from '../utils/validations';
import { apiRoutes, outsideRouters, insideRoutes } from '../utils/globalConfig';

const router = Router();

router.get(values(insideRoutes.auth), renderAuth);

router.get(outsideRouters.logout, logoutController);
router.get(outsideRouters.send, checkEmailHashController);

// api
router.post(apiRoutes.registration, validateRegistrationForm, catchValidationError, checkEmailinDB, registrationController);
router.post(apiRoutes.login, validateLoginForm, catchValidationError, loginController);
router.post(apiRoutes.changePassByEmail, validateEmail, catchValidationError, changePassController);
router.post(apiRoutes.changePass, newPassController);

export default router;
