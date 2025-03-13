"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Recovery extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Recovery.init(
        {
            recovery_id: DataTypes.UUID,
            user_id: DataTypes.UUID,
            recovery_date: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Recovery",
            timestamps: false,
        }
    );
    return Recovery;
};
