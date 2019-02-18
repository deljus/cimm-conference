import {check, validationResult} from "express-validator/check";


export const validateRegistrationForm = [
    check('email').isEmail(),
    check('password').isLength({ min: 6 })
];

export const validateLoginForm = [
    check('email').isEmail(),
    check('password').isLength({ min: 6 })
];

export const catchValidationError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};
