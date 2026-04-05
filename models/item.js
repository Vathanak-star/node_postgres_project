'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class Item extends Model {

    }

    Item.init({
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
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },{
        sequelize,
        modelName: 'Item'
    });

    return Item;
}