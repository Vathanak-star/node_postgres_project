const db = require('../models');
const Location = db.Location;

exports.locations = async (req,res) => {
    const page = Number.parseInt(req.query.page) || 1;
    const limit = Number.parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    try {
        const {count,rows} = await Location.findAndCountAll({
            offset: offset,
            limit: limit
        })

        return res.status(201).json({
            page,
            limit,
            totalLocations: count,
            totalPages: Math.ceil(count/limit),
            data: rows
        })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}

exports.addLocation = async (req,res) => {
    try {
        const {address,telegram,googleMap,image} = req.body;
        
        const location = await Location.create({
            address,
            telegram,
            googleMap,
            image
        });

        return res.status(201).json({
            status: 'success',
            msg: 'locaton added successfully',
            location
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}