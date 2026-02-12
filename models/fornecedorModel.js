const db = require('../config/db');

class Fornecedor {
    static async create(nome, cnpj, telefone, email, endereco) {
        const [result] = await db.query(
            'INSERT INTO fornecedores (nome, cnpj, telefone, email, endereco) VALUES (?, ?, ?, ?, ?)',
            [nome, cnpj, telefone, email, endereco]
        );
        return result.insertId;
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM fornecedores ORDER BY nome');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM fornecedores WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, nome, cnpj, telefone, email, endereco) {
        await db.query(
            'UPDATE fornecedores SET nome = ?, cnpj = ?, telefone = ?, email = ?, endereco = ? WHERE id = ?',
            [nome, cnpj, telefone, email, endereco, id]
        );
    }

    static async delete(id) {
        await db.query('DELETE FROM fornecedores WHERE id = ?', [id]);
    }

    static async findByCnpj(cnpj) {
        const [rows] = await db.query('SELECT * FROM fornecedores WHERE cnpj = ?', [cnpj]);
        return rows[0];
    }
}

module.exports = Fornecedor;