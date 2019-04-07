import { Router } from 'express';
import {
  registrationController,
  renderLogin,
  checkEmailHashController,
  renderRegistration,
  loginController,
  renderChangePass,
  logoutController,
  changePassController,
  renderNewPass,
  checkEmailinDB,
  newPassController
} from '../controllers/auth';
import {
  catchValidationError, validateEmail, validateLoginForm, validateRegistrationForm
} from '../utils/validations';
import { apiRoutes, outsideRouters } from '../utils/globalConfig';

const router = Router();

router.get(outsideRouters.registration, renderRegistration);
router.get(outsideRouters.login, renderLogin);
router.get(outsideRouters.changePassByEmail, renderChangePass);
router.get(outsideRouters.changePass, renderNewPass);

router.get(outsideRouters.logout, logoutController);
router.get(outsideRouters.send, checkEmailHashController);

// api
router.post(apiRoutes.registration, validateRegistrationForm, catchValidationError, checkEmailinDB, registrationController);
router.post(apiRoutes.login, validateLoginForm, catchValidationError, loginController);
router.post(apiRoutes.changePassByEmail, validateEmail, catchValidationError, changePassController);
router.post(apiRoutes.changePass, newPassController);

export default router;
