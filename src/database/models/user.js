"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            user_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            user_name: DataTypes.STRING,
            user_lastname: DataTypes.STRING,
            user_email: DataTypes.STRING,
            user_phone: DataTypes.DECIMAL,
            role_id: DataTypes.INTEGER,
            user_password: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "User",
            timestamps: false,
        }
    );
    return User;
};
