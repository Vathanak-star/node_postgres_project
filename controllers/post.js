const { Op } = require('sequelize');
const db = require('../models');
const Product = db.Product;
const Image = db.Image;
const { validationResult } = require("express-validator");

//For Testing Post Route
exports.testingRoute = async (req,res) => {
    return res.status(200).json({
        msg: "This is route for testing with JWT Token."
    })
}
//Testing Route

//Create or Add Product
exports.createProduct = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            status: 'error',
            msg: 'Validation error',
            errors: errors.array()
        })
    }

    try {
        const {name,price,description,mainCategory,subCategory,size,images} = req.body;
        
        const product = await Product.create({
            name,
            price,
            description,
            mainCategory,
            subCategory,
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

//Update Product
exports.updateProduct = async (req,res) => {
    const {id} = req.params;
    try {
        //Checking if json not have body object at all
        if(req.body.constructor === Object && Object.keys(req.body).length === 0){
            return res.status(401).json({
                status: 'error',
                msg: 'No information detail provided for update!'
            })
        }

        const findProduct = await Product.findByPk(id);

        if(!findProduct){
            return res.status(404).json({
                status: 'error',
                msg: 'Product not found with that ID'
            })
        }

        const {name,price,description,mainCategory,subCategory,size} = req.body;
        const values = {
                name: name,
                price: price,
                description: description,
                mainCategory: mainCategory,
                subCategory: subCategory,
                size: size,
            };
        const condition = {
            where: {id: id},
        }

        const options = {
            multi: true
        }
        
        const rowUpdated = await Product.update(values, condition, options)
        
        return res.status(201).json({
                status: 'success',
                msg: 'Product updated successfully',
                rowUpdated: rowUpdated[0] // if rowUpdated = 1 is success, = 0 is fail
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

//Update Image Product
exports.updateProductImages = async (req,res) => {
    const {productId} = req.params;
    try {
        const {images} = req.body;

        if(!images || !Array.isArray(images)){
            return res.status(400).json({
                status: 'fail',
                msg: 'Images must be provide as an array!'
            })
        }

        if(images.length === 0){
            return res.status(404).json({
                status: 'error',
                msg: 'No images to update'
            })
        }
        
        const product = await Product.findByPk(productId);

        if(!product){
            return res.status(404).json({
                status: 'error',
                msg: 'Product not found'
            })
        }

        await Image.destroy({
            where: {productId: productId}
        });

        const imageNew = images.map(imageData => 
            Image.create({
                color: imageData.color,
                image: imageData.image,
                productId: productId
            })
        )

        const updatedNewImages = await Promise.all(imageNew);

        return res.status(200).json({
            status: 'success',
            msg: 'Product images updated successfully',
            data: {
                productId: productId,
                images: updatedNewImages
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}

//Search for product with name
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

        if(searchForProduct.length === 0){
            return res.status(404).json({
                status: 'error',
                msg: 'Search products not found'
            })
        }


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

//Get all product
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


//search for product by ID
exports.findProductById = async (req,res) => {
    const {id} = req.params;

    try {
        const findProduct = await Product.findByPk(id, {
            include: [{
                model: Image,
                as: 'images'
            }]
        })

        if(!findProduct){
            return res.status(404).json({
                status: 'error',
                msg: 'Product not found with that ID'
            })
        }

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