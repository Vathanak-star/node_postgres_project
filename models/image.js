'use strict';
const { Model }  = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class Image extends Model{

    }

    Image.init({
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'productId',
            references: {
                model: 'Products',
                key: 'id'
            }
        }
    },{
        sequelize,
        modelName: 'Image',
        underscored: false,
    });

    Image.associate = function(models){
        Image.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: 'product'
        })
    }

    return Image;
}
