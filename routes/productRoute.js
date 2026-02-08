const {Router} = require('express');
const { products } = require('../controllers/product');
const router = Router();

// http://localhost:8000/api/products?page=1&limit=5
router.get('/products',products)

module.exports = router;