const pool = require('../config/db');

const Usuario = {
    buscarPorEmail: async (email) => {
        const [usuarios] =
            await pool.promise().query(
                `
                    SELECT
                        id,
                        nome,
                        email,
                        senha,
                        perfil,
                        ativo,
                        criado_em,
                        atualizado_em
                    FROM usuarios
                    WHERE email = ?
                    LIMIT 1
                `,
                [email]
            );

        return usuarios[0];
    },

    buscarPorId: async (id) => {
        const [usuarios] =
            await pool.promise().query(
                `
                    SELECT
                        id,
                        nome,
                        email,
                        perfil,
                        ativo,
                        criado_em,
                        atualizado_em
                    FROM usuarios
                    WHERE id = ?
                    LIMIT 1
                `,
                [id]
            );

        return usuarios[0];
    },

    criar: async ({
        nome,
        email,
        senha,
        perfil = 'CLIENTE'
    }) => {
        const [resultado] =
            await pool.promise().query(
                `
                    INSERT INTO usuarios
                    (
                        nome,
                        email,
                        senha,
                        perfil,
                        ativo
                    )
                    VALUES (?, ?, ?, ?, 1)
                `,
                [
                    nome,
                    email,
                    senha,
                    perfil
                ]
            );

        return resultado.insertId;
    }
};

module.exports = Usuario;