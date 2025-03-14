"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Recovery extends Model {}

    Recovery.init(
        {
            recovery_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            recovery_date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Recovery",
            timestamps: false,
        }
    );

    return Recovery;
};
