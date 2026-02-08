const { Op } = require('sequelize');
const db = require('../models');
const Product = db.Product;
const Image = db.Image;

exports.products = async (req,res) => {
    const page = Number.parseInt(req.query.page) || 1;
    const limit = Number.parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const {count,rows} = await Product.findAndCountAll({
            include: [{
                model: Image,
                as: 'images'
            }],
            distinct: true,
            offset: offset,
            limit: limit,
        })

        return res.status(201).json({
            page,
            limit,
            totalProducts: count,
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