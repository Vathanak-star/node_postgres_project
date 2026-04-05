const {Router} = require('express');
const { createItem, updateItem, deleteItem, items } = require('../controllers/itemController');
const router = Router();

router.get('/items',items)

router.post('/createItem',createItem);
router.post('/updateItem/:id',updateItem);
router.delete('/deleteItem/:id',deleteItem);

module.exports = router;