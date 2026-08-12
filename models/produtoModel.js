const db = require('../config/db');

const Produto = {
    listarTodos: (callback) => {
        const query = `
            SELECT *
            FROM produtos
            ORDER BY nome ASC
        `;

        db.query(query, (erro, produtos) => {
            if (erro) {
                return callback(erro);
            }

            callback(null, produtos);
        });
    },

    pesquisarPorNome: (nome, callback) => {
        const query = `
            SELECT *
            FROM produtos
            WHERE nome LIKE ?
            ORDER BY nome ASC
        `;

        db.query(query, [`%${nome}%`], (erro, produtos) => {
            if (erro) {
                return callback(erro);
            }

            callback(null, produtos);
        });
    },

    buscarPorId: (id, callback) => {
        const query = `
            SELECT *
            FROM produtos
            WHERE id = ?
        `;

        db.query(query, [id], (erro, resultados) => {
            if (erro) {
                return callback(erro);
            }

            callback(null, resultados[0]);
        });
    },

    cadastrar: (produto, callback) => {
        const query = `
            INSERT INTO produtos
            (
                nome,
                descricao,
                preco,
                tamanho,
                imagem_url,
                obs,
                disponivel
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const valores = [
            produto.nome,
            produto.descricao || null,
            produto.preco,
            produto.tamanho || null,
            produto.imagem_url || null,
            produto.obs || null,
            produto.disponivel ? 1 : 0
        ];

        db.query(query, valores, (erro, resultado) => {
            if (erro) {
                return callback(erro);
            }

            callback(null, resultado.insertId);
        });
    },

    atualizar: (id, produto, callback) => {
        const query = `
            UPDATE produtos
            SET
                nome = ?,
                descricao = ?,
                preco = ?,
                tamanho = ?,
                imagem_url = ?,
                obs = ?,
                disponivel = ?
            WHERE id = ?
        `;

        const valores = [
            produto.nome,
            produto.descricao || null,
            produto.preco,
            produto.tamanho || null,
            produto.imagem_url || null,
            produto.obs || null,
            produto.disponivel ? 1 : 0,
            id
        ];

        db.query(query, valores, (erro, resultado) => {
            if (erro) {
                return callback(erro);
            }

            callback(null, resultado);
        });
    },

    excluir: (id, callback) => {
        const query = `
            DELETE FROM produtos
            WHERE id = ?
        `;

        db.query(query, [id], (erro, resultado) => {
            if (erro) {
                return callback(erro);
            }

            callback(null, resultado);
        });
    }
};

module.exports = Produto;