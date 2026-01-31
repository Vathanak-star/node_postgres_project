const { Op } = require('sequelize');
const db = require('../models');
const Product = db.Product;
const Image = db.Image;

//For Testing Post Route
exports.dashboard = async (req,res) => {
    return res.status(200).json({
        msg: "This is the Dashboard Page."
    })
}
//Testing Route

exports.searchForProduct = async (req,res) => {
    const {name} = req.params;
    try {
        const searchForProduct = await Product.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}`
                }
            },
            include: [{
                model: Image,
                as: 'images'
            }]
        })
        return res.status(200).json(
            searchForProduct
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error',
            errors: error.message
        })
    }
}

exports.findAllProducts = async (req,res) => {
    try {
        const findAllProducts = await Product.findAll({
            include: [{
                model: Image,
                as: 'images'
            }]
        })
        return res.status(200).json(
            findAllProducts
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error',
            errors: error.message
        })
    }
}

exports.findProductById = async (req,res) => {
    const {id} = req.params;

    try {
        const findProduct = await Product.findByPk(id, {
            include: [{
                model: Image,
                as: 'images'
            }]
        })

        return res.status(201).json(
            findProduct
        )
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}

exports.createProduct = async (req,res) => {
    try {
        const {name,price,description,mainCategory,specificCategory,size,images} = req.body;
        
        const product = await Product.create({
            name,
            price,
            description,
            mainCategory,
            specificCategory,
            size,
            images: images
        },{
            include: [{
                model: Image,
                as: 'images'
            }]
        });

        return res.status(201).json({
            status: 'success',
            msg: 'Product created successfully',
            product,
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