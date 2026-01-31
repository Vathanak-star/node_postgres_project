'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model{

    }

    Product = Product.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mainCategory: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subCategory: {
            type: DataTypes.STRING,
            allowNull: false
        },
        size: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
            defaultValue: []
        },
    },{
        sequelize,
        modelName: 'Product'
    })

    Product.associate = function(models){
        Product.hasMany(models.Image,{
            foreignKey: 'productId',
            as: 'images'
        })
    }

    return Product;
}