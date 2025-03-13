"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Multimedia extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Multimedia.init(
        {
            media_id: DataTypes.UUID,
            media_url: DataTypes.STRING,
            product_id: DataTypes.UUID,
        },
        {
            sequelize,
            modelName: "Multimedia",
            timestamps: false,
        }
    );
    return Multimedia;
};
