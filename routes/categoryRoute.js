const {Router} = require('express');
const { addMainCategory, addSubCategory, mainCategory, subCategory, deleteMainCategory, deleteSubCategory, updateMainCategory, updateSubCategory } = require('../controllers/categoryController');
const router = Router();

//Add,Update & Delete main & sub category routes
router.post('/addMainCategory',addMainCategory);
router.post('/addSubCategory',addSubCategory);

router.post('/updateMainCategory/:id',updateMainCategory)
router.post('/updateSubCategory/:id',updateSubCategory)

router.delete('/deleteMainCategory/:id',deleteMainCategory)
router.delete('/deleteSubCategory/:id',deleteSubCategory)

router.get('/mainCategory',mainCategory)
router.get('/subCategory',subCategory)

module.exports = router;