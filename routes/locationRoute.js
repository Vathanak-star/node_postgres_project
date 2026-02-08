const {Router} = require('express');
const { addLocation, locations } = require('../controllers/location');
const router = Router();

// http://localhost:8000/api/locations?page=1&limit=5
router.get('/locations',locations);
router.post('/addLocation',addLocation);

module.exports = router;