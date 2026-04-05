const {Router} = require('express');
const { products, searchProducts } = require('../controllers/productController');
const router = Router();

// http://localhost:8000/api/products?page=1&limit=5
router.get('/products',products);

//http://localhost:8000/api/searchProducts/:name?page=1&limit=5
router.get('/searchProducts/:name',searchProducts);

module.exports = router;