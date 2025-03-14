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
        logging: false,
    }
);

const UserModel = require("./user");
const CategoryModel = require("./category");
const ProductModel = require("./product");
const SpecModel = require("./spec");
const MultimediaModel = require("./multimedia");
const RoleModel = require("./role");
const RecoveryModel = require("./recovery");

const User = UserModel(sequelize, DataTypes);
const Category = CategoryModel(sequelize, DataTypes);
const Product = ProductModel(sequelize, DataTypes);
const Spec = SpecModel(sequelize, DataTypes);
const Multimedia = MultimediaModel(sequelize, DataTypes);
const Role = RoleModel(sequelize, DataTypes);
const Recovery = RecoveryModel(sequelize, DataTypes);

// User relations
User.belongsTo(Role, { foreignKey: "role_id", as: "role" });
Role.hasMany(User, { foreignKey: "role_id", as: "users" });

User.hasMany(Recovery, { foreignKey: "user_id", as: "recoveries" });
Recovery.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Product relations
Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });
Category.hasMany(Product, { foreignKey: "category_id", as: "products" });

Product.hasMany(Multimedia, { foreignKey: "product_id", as: "multimedias" });
Multimedia.belongsTo(Product, { foreignKey: "product_id", as: "product" });

Product.hasMany(Spec, { foreignKey: "product_id", as: "specs" });
Spec.belongsTo(Product, { foreignKey: "product_id", as: "product" });

module.exports = { User, Category, Product, Spec, Multimedia, connection: sequelize };
