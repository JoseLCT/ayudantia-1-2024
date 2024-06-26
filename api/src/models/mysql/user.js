import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'root',
    database: 'contactos'
}

const connection = await mysql.createConnection(config);

export class UserModel {
    static async getAll() {
        // Devuelve una tupla con dos elementos, el primero es un array con los datos
        // y el segundo es un array con los nombres de las columnas
        const [users] = await connection.execute('SELECT * FROM usuario');
        return users;
    }
    static async getById({ id }) {
        const [user] = await connection.query('SELECT * FROM usuario WHERE id = ?;', [id]);
        if (user.length === 0) return null;
        return user;
    }
    static async create({ data }) {
        const {
            name,
            last_name,
            email,
            phone_number,
            password
        } = data;
        const result = await connection.query(
            `INSERT INTO usuario (name, last_name, email, phone_number, password) 
            VALUES (?, ?, ?, ?, ?);`, [name, last_name, email, phone_number, password]
        );
        const [user] = await connection.query('SELECT * FROM usuario WHERE id = ?;', [result[0].insertId]);
        return user;
    }
    static async update({ id, data }) {
        const {
            name,
            last_name,
            email,
            phone_number
        } = data;
        const result = await connection.query(
            `UPDATE usuario SET name = ?, last_name = ?, email = ?, phone_number = ? WHERE id = ?;`,
            [name, last_name, email, phone_number, id]
        );
        return result;
    }
    static async delete({ id }) {
        const result = await connection.query('DELETE FROM usuario WHERE id = ?;', [id]);
        return result;
    }
}