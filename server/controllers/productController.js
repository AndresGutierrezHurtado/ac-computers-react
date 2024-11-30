import { Op } from "sequelize";
import * as models from "../models/relations.js";

export default class ProductController {
    static async getProducts(req, res) {
        let whereClause = {};
        if (req.query.category_id)
            whereClause.category_id = req.query.category_id;
        if (req.query.sort && req.query.sort === "product_discount")
            whereClause.product_discount = { [Op.gt]: 0 };

        try {
            const products = await models.Product.findAll({
                include: [
                    { model: models.Category, as: "category" },
                    { model: models.Spec, as: "specs" },
                ],
                where: whereClause,
                order: [
                    [
                        req.query.sort || "product_name",
                        req.query.order || "ASC",
                    ],
                ],
                limit: req.query.limit ? parseInt(req.query.limit) : 10,
            });

            res.status(200).json({
                success: true,
                message: "Productos obtenidos con éxito",
                data: products,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al obtener los productos",
                data: error,
            });
        }
    }

    static async getProduct(req, res) {
        try {
            const product = await models.Product.findByPk(req.params.id, {
                include: [
                    { model: models.Category, as: "category" },
                    { model: models.Spec, as: "specs" },
                ],
            });

            res.status(200).json({
                success: true,
                message: "Producto obtenido con éxito",
                data: product,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al obtener el producto",
                error: error.message,
            });
        }
    }

    static async createProduct(req, res) {
        try {
            // product_name, product_description, product_price, category_id
            const product = await models.Product.create(req.body.product);

            if (req.body.specs) {
                const specs = await models.Spec.bulkCreate(
                    req.body.specs.map((spec) => ({
                        ...spec,
                        product_id: product.product_id,
                    }))
                );
            }

            res.status(200).json({
                success: true,
                message: "Producto creado con éxito",
                data: product,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al crear el producto",
                error: error.message,
            });
        }
    }

    static async updateProduct(req, res) {
        try {
            const product = await models.Product.update(req.body.product, {
                where: { product_id: req.params.id },
            });

            if (req.body.specs) {
                await models.Spec.destroy({
                    where: { product_id: req.params.id },
                });

                const specs = await models.Spec.bulkCreate(
                    req.body.specs.map((spec) => ({
                        ...spec,
                        product_id: req.params.id,
                    }))
                );
            }

            res.status(200).json({
                success: true,
                message: "Producto actualizado con éxito",
                data: product,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al actualizar el producto",
                error: error.message,
            });
        }
    }

    static async deleteProduct(req, res) {
        try {
            const product = await models.Product.destroy({
                where: { product_id: req.params.id },
            });

            await models.Spec.destroy({
                where: { product_id: req.params.id },
            });

            res.status(200).json({
                success: true,
                message: "Producto eliminado con éxito",
                data: product,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al eliminar el producto",
                error: error.message,
            });
        }
    }
}
