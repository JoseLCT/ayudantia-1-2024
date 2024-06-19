import { UserModel } from "../models/user.js";
import { validateUser } from "../schemas/users.js";

export class UserController {
    static async getAll(req, res) {
        const users = await UserModel.getAll();
        res.json(users);
    }

    static async getById(req, res) {
        const { id } = req.params;
        const user = await UserModel.getById({ id });
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.json(user);
    }

    static async create(req, res) {
        const result = validateUser(req.body);
        if (result.error) {
            return res.status(422).json({ error: JSON.parse(result.error.message) });
        }
        const user = await UserModel.create({ data: result.data });
        res.status(201).json(user);
    }

    static async update(req, res) {
        const { id } = req.params;
        const result = validateUser(req.body);
        if (result.error) {
            res.status(422).json({ message: result.error.message });
            return;
        }
        const user = await UserModel.update({ id, data: result.data });
        res.json(user);
    }

    static async delete(req, res) {
        const { id } = req.params;
        const result = await UserModel.delete({ id });
        res.json({ message: 'Usuario eliminado' });
    }
}