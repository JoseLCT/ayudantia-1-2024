// import { UserModel } from "../models/mysql/user.js";
import { UserModel } from "../models/pg/user.js";
import { validateUser, validateUpdateUser } from "../schemas/users.js";
import { guardarImagen } from "../utils/image.js";

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
        const result = validateUpdateUser(req.body);
        if (result.error) {
            res.status(422).json({ message: result.error.message });
            return;
        }
        const user = await UserModel.update({ id, data: result.data });
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.json(user);
    }

    static async delete(req, res) {
        const { id } = req.params;
        const result = await UserModel.delete({ id });
        if (!result) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.json({ message: 'Usuario eliminado' });
    }

    static async login(req, res) {
        const {
            email,
            password
        } = req.body;
        const user = await UserModel.login({ email, password });
        if (!user) {
            res.status(401).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    }

    static async subirImagen(req, res) {
        const { id } = req.params;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: 'No hay archivos para subir' });
        }
        const imagen = req.files.imagen;
        try {
            const ruta = await guardarImagen('usuarios', imagen, id);
            const usuario = await UserModel.subirImagen({ id, ruta });
            if (!usuario) {
                return res.status(401).json({ message: 'Usuario no encontrado' });
            }
            res.json(usuario);
        } catch (e) {
            console.log(e);
        }
    }
}