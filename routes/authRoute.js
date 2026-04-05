const { Router } = require("express");
const { body } = require('express-validator');
const { register, login, allUser, singleUser, updateUser, deleteUser } = require("../controllers/authController");
const { validateRegister, validateLogin, validationUpdate } = require("../middleware/userValidation");
const authenticateJWT = require("../middleware/authenticateJWT");
const router = Router();

//SignUp & Login
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

//Update & Delete User
router.post('/updateUser/:id',authenticateJWT,validationUpdate,updateUser);
router.delete('/deleteUser/:id',authenticateJWT,deleteUser);

//Search User
//http://localhost:8000/api/auth/User?id=5
router.get('/User',authenticateJWT,singleUser);

router.get('/Users',allUser);

module.exports = router;
