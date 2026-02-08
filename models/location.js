'user-strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Location extends Model {

    }

    Location.init({
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telegram: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        googleMap: {
            type:DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'Location'
    });

    return Location;
}