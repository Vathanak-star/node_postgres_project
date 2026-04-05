'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MainCategory extends Model {

    }

    MainCategory.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'MainCategory'
    })

    MainCategory.associate = function(models) {
        MainCategory.hasMany(models.SubCategory, {
            foreignKey: 'mainCategoryId',
            as: 'subCategories'
        })
    }

    return MainCategory;
}