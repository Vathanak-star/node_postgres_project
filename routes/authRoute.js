const { Router } = require("express");
const { body } = require('express-validator');
const { register, login, allUser, singleUser } = require("../controllers/auth");
const { validateRegister, validateLogin } = require("../middleware/userValidation");
const authenticateJWT = require("../middleware/authenticateJWT");
const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

router.get('/singleUser/:id',authenticateJWT,singleUser);
router.get('/allUser',authenticateJWT,allUser);

module.exports = router;