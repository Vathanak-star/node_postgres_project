'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SubCategory extends Model {

    }

    SubCategory.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mainCategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'mainCategoryId',
            references: {
                model: 'MainCategories',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'SubCategory'
    })

    SubCategory.associate = function(models) {
        SubCategory.belongsTo(models.MainCategory, {
            foreignKey: 'mainCategoryId',
            as: 'mainCategory'
        })
    }

    return SubCategory;
}