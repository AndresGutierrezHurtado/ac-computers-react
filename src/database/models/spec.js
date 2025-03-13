"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Spec extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Spec.init(
        {
            spec_id: DataTypes.UUID,
            spec_key: DataTypes.STRING,
            spec_value: DataTypes.STRING,
            product_id: DataTypes.UUID,
        },
        {
            sequelize,
            modelName: "Spec",
            timestamps: false,
        }
    );
    return Spec;
};
