const {Router} = require('express');
const { addLocation, locations, updateLocation, deleteLocation, locationsAll } = require('../controllers/locationController');
const router = Router();

// http://localhost:8000/api/locations?page=1&limit=5
router.get('/locations',locations);
router.get('/locationsAll',locationsAll)

//Add,Update & Delete Location routes
router.post('/addLocation',addLocation);
router.post('/updateLocation/:id',updateLocation);
router.delete('/deleteLocation/:id',deleteLocation);

module.exports = router;