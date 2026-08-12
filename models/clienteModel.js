const pool = require('../config/db');

const Cliente = {
    listarTodos: async () => {
        const [clientes] = await pool.promise().query(`
            SELECT
                c.*,
                e.rua,
                e.numero,
                e.bairro,
                e.municipio,
                e.ponto_referencia,
                e.cep
            FROM clientes c
            LEFT JOIN enderecos e
                ON e.id = c.id_endereco
            ORDER BY c.nome ASC
        `);

        return clientes;
    },

    pesquisarPorNome: async (nome) => {
        const [clientes] = await pool.promise().query(
            `
                SELECT
                    c.*,
                    e.rua,
                    e.numero,
                    e.bairro,
                    e.municipio,
                    e.ponto_referencia,
                    e.cep
                FROM clientes c
                LEFT JOIN enderecos e
                    ON e.id = c.id_endereco
                WHERE c.nome LIKE ?
                ORDER BY c.nome ASC
            `,
            [`%${nome}%`]
        );

        return clientes;
    },

    buscarPorId: async (id) => {
        const [clientes] = await pool.promise().query(
            `
                SELECT
                    c.*,
                    e.rua,
                    e.numero,
                    e.bairro,
                    e.municipio,
                    e.ponto_referencia,
                    e.cep
                FROM clientes c
                LEFT JOIN enderecos e
                    ON e.id = c.id_endereco
                WHERE c.id = ?
            `,
            [id]
        );

        return clientes[0];
    },

    cadastrarCompleto: async (cliente, endereco) => {
        const conexao = await pool
            .promise()
            .getConnection();

        try {
            await conexao.beginTransaction();

            let idEndereco = null;

            if (endereco) {
                const [resultadoEndereco] =
                    await conexao.query(
                        `
                            INSERT INTO enderecos
                            (
                                rua,
                                numero,
                                bairro,
                                municipio,
                                ponto_referencia,
                                cep
                            )
                            VALUES (?, ?, ?, ?, ?, ?)
                        `,
                        [
                            endereco.rua,
                            endereco.numero,
                            endereco.bairro,
                            endereco.municipio,
                            endereco.ponto_referencia,
                            endereco.cep
                        ]
                    );

                idEndereco =
                    resultadoEndereco.insertId;
            }

            const [resultadoCliente] =
                await conexao.query(
                    `
                        INSERT INTO clientes
                        (
                            nome,
                            email,
                            telefone,
                            cpf,
                            instituicao,
                            id_endereco
                        )
                        VALUES (?, ?, ?, ?, ?, ?)
                    `,
                    [
                        cliente.nome,
                        cliente.email,
                        cliente.telefone,
                        cliente.cpf,
                        cliente.instituicao,
                        idEndereco
                    ]
                );

            await conexao.commit();

            return resultadoCliente.insertId;
        } catch (erro) {
            await conexao.rollback();
            throw erro;
        } finally {
            conexao.release();
        }
    },

    atualizarCompleto: async (
        id,
        cliente,
        endereco
    ) => {
        const conexao = await pool
            .promise()
            .getConnection();

        try {
            await conexao.beginTransaction();

            const [clientes] = await conexao.query(
                `
                    SELECT id_endereco
                    FROM clientes
                    WHERE id = ?
                    FOR UPDATE
                `,
                [id]
            );

            if (clientes.length === 0) {
                const erro =
                    new Error('Cliente não encontrado.');

                erro.code =
                    'CLIENTE_NAO_ENCONTRADO';

                throw erro;
            }

            const idEnderecoAntigo =
                clientes[0].id_endereco;

            let idEnderecoNovo =
                idEnderecoAntigo;

            if (endereco) {
                if (idEnderecoAntigo) {
                    await conexao.query(
                        `
                            UPDATE enderecos
                            SET
                                rua = ?,
                                numero = ?,
                                bairro = ?,
                                municipio = ?,
                                ponto_referencia = ?,
                                cep = ?
                            WHERE id = ?
                        `,
                        [
                            endereco.rua,
                            endereco.numero,
                            endereco.bairro,
                            endereco.municipio,
                            endereco.ponto_referencia,
                            endereco.cep,
                            idEnderecoAntigo
                        ]
                    );
                } else {
                    const [resultadoEndereco] =
                        await conexao.query(
                            `
                                INSERT INTO enderecos
                                (
                                    rua,
                                    numero,
                                    bairro,
                                    municipio,
                                    ponto_referencia,
                                    cep
                                )
                                VALUES (?, ?, ?, ?, ?, ?)
                            `,
                            [
                                endereco.rua,
                                endereco.numero,
                                endereco.bairro,
                                endereco.municipio,
                                endereco.ponto_referencia,
                                endereco.cep
                            ]
                        );

                    idEnderecoNovo =
                        resultadoEndereco.insertId;
                }
            } else {
                idEnderecoNovo = null;
            }

            await conexao.query(
                `
                    UPDATE clientes
                    SET
                        nome = ?,
                        email = ?,
                        telefone = ?,
                        cpf = ?,
                        instituicao = ?,
                        id_endereco = ?
                    WHERE id = ?
                `,
                [
                    cliente.nome,
                    cliente.email,
                    cliente.telefone,
                    cliente.cpf,
                    cliente.instituicao,
                    idEnderecoNovo,
                    id
                ]
            );

            /*
             * Caso todos os campos do endereço tenham sido
             * apagados, remove o endereço somente quando ele
             * não estiver sendo usado por cliente ou entrega.
             */
            if (!endereco && idEnderecoAntigo) {
                const [referencias] =
                    await conexao.query(
                        `
                            SELECT
                                (
                                    SELECT COUNT(*)
                                    FROM clientes
                                    WHERE id_endereco = ?
                                ) AS clientes,

                                (
                                    SELECT COUNT(*)
                                    FROM entregas
                                    WHERE id_endereco = ?
                                ) AS entregas
                        `,
                        [
                            idEnderecoAntigo,
                            idEnderecoAntigo
                        ]
                    );

                const totalReferencias =
                    Number(referencias[0].clientes) +
                    Number(referencias[0].entregas);

                if (totalReferencias === 0) {
                    await conexao.query(
                        `
                            DELETE FROM enderecos
                            WHERE id = ?
                        `,
                        [idEnderecoAntigo]
                    );
                }
            }

            await conexao.commit();
        } catch (erro) {
            await conexao.rollback();
            throw erro;
        } finally {
            conexao.release();
        }
    },

    excluirCompleto: async (id) => {
        const conexao = await pool
            .promise()
            .getConnection();

        try {
            await conexao.beginTransaction();

            const [clientes] = await conexao.query(
                `
                    SELECT id_endereco
                    FROM clientes
                    WHERE id = ?
                    FOR UPDATE
                `,
                [id]
            );

            if (clientes.length === 0) {
                await conexao.rollback();
                return 0;
            }

            const idEndereco =
                clientes[0].id_endereco;

            const [resultado] =
                await conexao.query(
                    `
                        DELETE FROM clientes
                        WHERE id = ?
                    `,
                    [id]
                );

            if (idEndereco) {
                const [referencias] =
                    await conexao.query(
                        `
                            SELECT
                                (
                                    SELECT COUNT(*)
                                    FROM clientes
                                    WHERE id_endereco = ?
                                ) AS clientes,

                                (
                                    SELECT COUNT(*)
                                    FROM entregas
                                    WHERE id_endereco = ?
                                ) AS entregas
                        `,
                        [idEndereco, idEndereco]
                    );

                const totalReferencias =
                    Number(referencias[0].clientes) +
                    Number(referencias[0].entregas);

                if (totalReferencias === 0) {
                    await conexao.query(
                        `
                            DELETE FROM enderecos
                            WHERE id = ?
                        `,
                        [idEndereco]
                    );
                }
            }

            await conexao.commit();

            return resultado.affectedRows;
        } catch (erro) {
            await conexao.rollback();
            throw erro;
        } finally {
            conexao.release();
        }
    }
};

module.exports = Cliente;