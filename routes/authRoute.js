const { Router } = require("express");
const { body } = require('express-validator');
const { register, login, allUser, singleUser, updateUser, deleteUser } = require("../controllers/auth");
const { validateRegister, validateLogin, validationUpdate } = require("../middleware/userValidation");
const authenticateJWT = require("../middleware/authenticateJWT");
const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

//Update & Delete User
router.post('/updateUser/:id',authenticateJWT,validationUpdate,updateUser);
router.delete('/deleteUser/:id',authenticateJWT,deleteUser);

//Search User
router.get('/singleUser/:id',authenticateJWT,singleUser);
router.get('/allUser',authenticateJWT,allUser);

module.exports = router;
