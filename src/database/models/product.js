"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Product.init(
        {
            product_id: DataTypes.UUID,
            product_name: DataTypes.STRING,
            product_description: DataTypes.TEXT,
            product_image_url: DataTypes.STRING,
            product_price: DataTypes.DECIMAL,
            product_discount: DataTypes.INTEGER,
            product_date: DataTypes.DATE,
            category_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Product",
            timestamps: false,
        }
    );
    return Product;
};
