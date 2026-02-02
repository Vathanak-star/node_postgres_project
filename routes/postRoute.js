const {Router} = require('express')
const { createProduct, findProductById, findAllProducts, searchForProduct, updateProduct, updateProductImages, testingRoute, deleteProductWithImage } = require('../controllers/post')
const authenticateJWT = require('../middleware/authenticateJWT');
const { validtionCreateProduct } = require('../middleware/postValidation');
const router = Router()

//Testing Route
router.get('/testingRoute', authenticateJWT,testingRoute);

//Will have protected Route
router.post('/createProduct',authenticateJWT,validtionCreateProduct ,createProduct);
router.post('/updateProduct/:id',authenticateJWT,updateProduct);
router.post('/updateImageProduct/:productId',authenticateJWT,updateProductImages);
router.delete('/deleteProductWithImage/:productId',authenticateJWT,deleteProductWithImage)

//Stay the same: no protected Route
router.get('/findAllProducts',findAllProducts);
router.get('/searchForProduct/:name',searchForProduct);
router.get('/findProductById/:id',findProductById);

module.exports = router