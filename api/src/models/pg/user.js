import pkg from 'pg';
const { Pool } = pkg;

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'contactos',
    password: 'postgres',
    port: 5432,
    allowExitOnIdle: true
});

export class UserModel {
    static async getAll() {
        const result = await db.query('SELECT id, name, last_name, email, phone_number FROM usuario;');
        return result.rows;
    }
    static async getById({ id }) {
        const query = {
            text: 'SELECT id, name, last_name, email, phone_number FROM usuario WHERE id = $1;',
            values: [id]
        }
        const result = await db.query(query);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    }
    static async create({ data }) {
        const {
            name,
            last_name,
            email,
            phone_number,
            password
        } = data;
        const query = {
            text: `INSERT INTO usuario (name, last_name, email, phone_number, password)
            VALUES ($1, $2, $3, $4, $5) RETURNING id, name, last_name, email, phone_number;`,
            values: [name, last_name, email, phone_number, password]
        }
        const result = await db.query(query);
        return result.rows[0];
    }
    static async update({ id, data }) {
        const userQuery = {
            text: `SELECT * FROM usuario WHERE id = $1;`,
            values: [id]
        }
        const user = await db.query(userQuery);
        if (user.rows.length === 0) {
            return null;
        }
        const {
            name,
            last_name,
            email,
            phone_number
        } = data;
        const query = {
            text: `UPDATE usuario SET name = $1, last_name = $2, email = $3, phone_number = $4
            WHERE id = $5 RETURNING id, name, last_name, email, phone_number;`,
            values: [name, last_name, email, phone_number, id]
        }
        const result = await db.query(query);
        return result.rows[0];
    }
    static async delete({ id }) {
        const queryUser = {
            text: 'SELECT * FROM usuario WHERE id = $1;',
            values: [id]
        }
        const user = await db.query(queryUser);
        if (user.rows.length === 0) {
            return false;
        }
        const query = {
            text: 'DELETE FROM usuario WHERE id = $1;',
            values: [id]
        }
        const result = await db.query(query);
        return result.rowCount === 1;
    }
}