import * as models from "../models/relations.js";
import bcrypt from "bcrypt";

export default class UserController {
    static async getUsers(req, res) {
        try {
            const users = await models.User.findAll({
                include: [
                    {
                        model: models.Role,
                        as: "role",
                    },
                ],
            });

            res.status(200).json({
                success: true,
                message: "Usuarios obtenidos con éxito",
                data: users,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al obtener los usuarios",
                error: error.message,
            });
        }
    }

    static async getUser(req, res) {
        try {
            const user = await models.User.findByPk(req.params.id, {
                include: [
                    {
                        model: models.Role,
                        as: "role",
                    },
                ],
            });

            res.status(200).json({
                success: true,
                message: "Usuario obtenido con éxito",
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al obtener el usuario",
                error: error.message,
            });
        }
    }

    static async createUser(req, res) {
        try {
            req.body.user.user_password = await bcrypt.hash(
                req.body.user.user_password,
                10
            );

            const user = await models.User.create(req.body.user);

            res.status(200).json({
                success: true,
                message: "Usuario creado con éxito",
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al crear el usuario",
                error: error.message,
            });
        }
    }

    static async updateUser(req, res) {
        try {
            if (req.body.user.user_password) {
                req.body.user.user_password = await bcrypt.hash(
                    req.body.user.user_password,
                    10
                );
            }

            const user = await models.User.update(req.body.user, {
                where: { user_id: req.params.id },
            });

            res.status(200).json({
                success: true,
                message: "Usuario actualizado con éxito",
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al actualizar el usuario",
                error: error.message,
            });
        }
    }
}
