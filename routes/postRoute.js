const {Router} = require('express')
const { dashboard, createProduct, findProductById, findAllProducts, searchForProduct } = require('../controllers/post')
const authenticateJWT = require('../middleware/authenticateJWT')
const router = Router()

//Testing Route
router.get('/dashboard', authenticateJWT,dashboard);


router.post('/createProduct',createProduct);
router.get('/findAllProducts',findAllProducts);
router.get('/searchForProduct/:name',searchForProduct);
router.get('/findProductById/:id',findProductById);

module.exports = router