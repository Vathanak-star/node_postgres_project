const db = require('../models');
const Product = db.Product;
const Image = db.Image;
const { validationResult } = require("express-validator");
const { deleteImage, imageUploadFile } = require('../utils/s3Image');
require('dotenv').config();

//Test Route
exports.uploadImageFile = async (req, res) => {
    try {
        // Get file from request (using multer or similar middleware)
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                status: 'error',
                msg: 'No file uploaded.',
            });
        }

        const result = await imageUploadFile(file);
        
        return res.status(201).json({
            msg: 'Image Upload successfully',
            url: result.url,
            Key: result.Key
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

exports.deleteUploadImage = async (req,res) => {
    try {
        const {key} = req.body;
        const result = await deleteImage(key);

        return res.status(201).json({
            message: result.message,
            success: result.success
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
//Test Route

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
    const {name,price,description,mainCategory,subCategory,size,images} = req.body;

    try {
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
        
        const productUpdated = await Product.update(values, condition, options)
        
        return res.status(201).json({
                status: 'success',
                msg: 'Product updated successfully',
                productUpdated: productUpdated[0] // if rowUpdated = 1 is success, = 0 is fail
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

        return res.status(201).json({
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

//Delete Product with it's image
exports.deleteProduct = async(req,res) => {
    const {productId} = req.params;
    try {
        const findProduct = await Product.findByPk(productId)
        if(!findProduct){
            return res.status(404).json({
                status: 'error',
                msg: 'Product not found'
            })
        }

        const deletedImage = await Image.destroy({
            where: {productId: productId}
        })
        
        const deletedProduct = await Product.destroy({
            where: {id: productId}
        });

        return res.status(201).json({
            status: 'success',
            msg: 'Deleted Product success',
            deletedProduct: deletedProduct,
            deleteImage: deletedImage
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




