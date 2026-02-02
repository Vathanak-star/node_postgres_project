const { body } = require('express-validator')

exports.validtionCreateProduct = [
    body('name').notEmpty().withMessage('Name is required.').trim().escape(),
    body('price').notEmpty().withMessage('Price is required.').trim().escape(),
    body('mainCategory').notEmpty().withMessage('Main category is required.').trim().escape(),
    body('subCategory').notEmpty().withMessage('Sub category is required.').trim().escape(),
];