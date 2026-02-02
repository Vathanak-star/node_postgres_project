const {Router} = require('express')
const { createProduct, findProductById, findAllProducts, searchForProduct, updateProduct, updateProductImages, testingRoute, deleteProductWithImage } = require('../controllers/post')
const authenticateJWT = require('../middleware/authenticateJWT');
const { validtionCreateProduct } = require('../middleware/postValidation');
const router = Router()

//Testing Route
router.get('/testingRoute', authenticateJWT,testingRoute);

//Will have protected Route
router.post('/createProduct',validtionCreateProduct ,createProduct);
router.post('/updateProduct/:id',updateProduct);
router.post('/updateImageProduct/:productId',updateProductImages);
router.delete('/deleteProductWithImage/:productId',deleteProductWithImage)

//Stay the same
router.get('/findAllProducts',findAllProducts);
router.get('/searchForProduct/:name',searchForProduct);
router.get('/findProductById/:id',findProductById);

module.exports = router