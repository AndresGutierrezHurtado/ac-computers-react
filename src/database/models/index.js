const { DataTypes, Sequelize } = require("sequelize");
const config = require("../config.json");

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: config.development.dialect,
        dialectModule: require("pg"),
        port: config.development.port,
    }
);

const UserModel = require("./user");
const CategoryModel = require("./category");
const ProductModel = require("./product");
const SpecModel = require("./spec");
const MultimediaModel = require("./multimedia");


const User = UserModel(sequelize, DataTypes);
const Category = CategoryModel(sequelize, DataTypes);
const Product = ProductModel(sequelize, DataTypes);
const Spec = SpecModel(sequelize, DataTypes);
const Multimedia = MultimediaModel(sequelize, DataTypes);

module.exports = { User, Category, Product, Spec, Multimedia };
