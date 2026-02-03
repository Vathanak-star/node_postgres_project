const { body } = require('express-validator');

exports.validateRegister = [
    body('name').isLength({ min: 4 }).notEmpty().withMessage('Oops! Name is required.').trim().escape(),
    body('email').isEmail().notEmpty().withMessage('Oops! Email is required.').trim().escape(),
    body('password').isLength({ min: 8 }).withMessage('Oops! Password must be at least 8 characters long.').trim().escape(),
];

exports.validateLogin = [
    body('email').isEmail().notEmpty().withMessage('Oops! Email is required.').trim().escape(),
    body('password').notEmpty().withMessage('Oops! Password is required').trim().escape(),
];

exports.validationUpdate = [
    body('name').isLength({ min: 4 }).trim().escape(),
    body('email').isEmail().trim().escape(),
    body('password').isLength({ min: 8 }).withMessage('Oops! Password must be at least 8 characters long.').trim().escape(),
]