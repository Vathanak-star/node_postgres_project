const { Op } = require('sequelize');
const db = require('../models');
const Item = db.Item;

exports.createItem = async (req,res) => {
    try {
        const {name,price,description,image,category,status} = req.body;

        const item = await Item.create({
            name: name,
            price: price,
            description: description,
            image: image,
            category: category,
            status: status
        })

        return res.status(201).json({
            status: 'success',
            msg: 'Item created Successfully',
            data: {
                id: item.id,
                name: item.name,
                price: item.price,
                description: item.description,
                image: item.image,
                category: item.category,
                status: item.status
            }
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

exports.updateItem = async (req,res) => {
    const {id} = req.params;
    try {
        const findItem = await Item.findByPk(id);
        if(!findItem){
            return res.status(404).json({
                status: 'error',
                msg: 'item not found!'
            })
        }

        const {name,price,description,image,category,status} = req.body;
        const value = {
            name: name,
            price: price,
            description: description,
            image: image,
            category: category,
            status: status
        }

        const condition = {
            where: {
                id: id
            }
        }

        const options = {
            multi: true
        }

        const itemUpdate = await Item.update(value,condition,options)

        return res.status(201).json({
            status: 'success',
            msg: 'Item updated successfully',
            data: itemUpdate[0]
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

exports.deleteItem = async (req,res) => {
    const {id} = req.params;
    try {
        const findItem = await Item.findByPk(id);
        if(!findItem){
            return res.status(404).json({
                status: 'error',
                msg: 'item not found!'
            })
        }

       const deleteItem = await Item.destroy({
            where: {id: id}
        }) 

        return res.status(201).json({
            status: 'success',
            msg: 'Item delete successfully',
            data: deleteItem[0]
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

exports.items = async (req,res) => {
    try {
        const items = await Item.findAll({})
        return res.status(201).json({
            status: 'success',
            data: items
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