import { Op } from "sequelize";
import * as models from "../models/relations.js";
import { uploadFile } from "../config/useUploadImage.js";

export default class ProductController {
    static async getProducts(req, res) {
        let whereClause = {};

        if (req.query.search) {
            whereClause = {
                [Op.or]: {
                    product_id: { [Op.like]: `%${req.query.search}%` },
                    product_name: { [Op.like]: `%${req.query.search}%` },
                    product_description: { [Op.like]: `%${req.query.search}%` },
                },
            };
        }
        if (req.query.category_id)
            whereClause.category_id = req.query.category_id;
        if (req.query.sort && req.query.sort === "product_discount:desc")
            whereClause.product_discount = { [Op.gt]: 0 };

        try {
            const products = await models.Product.findAndCountAll({
                include: [
                    { model: models.Category, as: "category" },
                    { model: models.Spec, as: "specs" },
                    { model: models.Multimedia, as: "multimedias" },
                ],
                where: whereClause,
                order: [
                    [
                        req.query.sort
                            ? req.query.sort.split(":")[0]
                            : "product_id",
                        req.query.sort ? req.query.sort.split(":")[1] : "asc",
                    ],
                ],
                limit: req.query.limit ? parseInt(req.query.limit) : 10,
                offset: (parseInt(req.query.page || 1) - 1) * 10,
                distinct: true,
            });

            res.status(200).json({
                success: true,
                message: "Productos obtenidos con éxito",
                data: {
                    ...products,
                    page: parseInt(req.query.page) || 1,
                    limit: parseInt(req.query.limit) || 10,
                },
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
                    { model: models.Multimedia, as: "multimedias" },
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
            req.body.product.product_id = crypto.randomUUID();

            if (req.body.product_image) {
                req.body.product.product_image_Url = await uploadFile(
                    req.body.product_image,
                    req.body.product.product_id,
                    "/"
                );
            }

            const product = await models.Product.create(req.body.product);

            if (req.body.specs) {
                const specs = await models.Spec.bulkCreate(
                    req.body.specs.map((spec) => ({
                        ...spec,
                        product_id: product.product_id,
                    }))
                );
            }

            if (req.body.multimedias) {
                const multimediaData = await Promise.all(
                    req.body.multimedias.map(async (file) => {
                        const id = crypto.randomUUID();
                        const url = await uploadFile(file, id, "/medias");
                        return {
                            media_id: id,
                            media_url: url.data,
                            product_id: product.product_id,
                        };
                    })
                );

                await models.Multimedia.bulkCreate(multimediaData);
            }

            res.status(200).json({
                success: true,
                message: "Producto creado con éxito",
                data: product,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: error,
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
