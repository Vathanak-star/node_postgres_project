const {Router} = require('express')
const { createProduct, updateProduct, updateProductImages, deleteUploadImage, uploadImageFile, deleteProduct } = require('../controllers/productModifyController')
const authenticateJWT = require('../middleware/authenticateJWT');
const { validtionCreateProduct } = require('../middleware/postValidation');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = Router()

//Protected Route
router.post('/createProduct',authenticateJWT,validtionCreateProduct ,createProduct);
router.post('/updateProduct/:id',authenticateJWT,updateProduct);
router.post('/updateImageProduct/:productId',authenticateJWT,updateProductImages);
router.delete('/deleteProduct/:productId',authenticateJWT,deleteProduct)

//TestRoute
//Upload & Delete Image
router.post('/uploadImageFile',upload.single('file'),uploadImageFile);
router.post('/deleteImage',deleteUploadImage);

module.exports = router;