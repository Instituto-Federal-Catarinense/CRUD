const pool = require('../config/db');

const Pedido = {
    listarTodos: async () => {
        const [pedidos] = await pool.promise().query(`
            SELECT
                p.id,
                p.tipo_entrega,
                p.status,
                p.valor_total,
                p.observacao,
                p.data_pedido,
                c.nome AS cliente_nome,
                f.descricao AS forma_descricao,
                COUNT(pi.id) AS quantidade_itens
            FROM pedidos p
            INNER JOIN clientes c
                ON c.id = p.id_cliente
            LEFT JOIN formas_pagamento f
                ON f.id = p.id_forma_pagamento
            LEFT JOIN pedido_itens pi
                ON pi.id_pedido = p.id
            GROUP BY
                p.id,
                p.tipo_entrega,
                p.status,
                p.valor_total,
                p.observacao,
                p.data_pedido,
                c.nome,
                f.descricao
            ORDER BY p.data_pedido DESC
        `);

        return pedidos;
    },

    buscarPorId: async (id) => {
        const [pedidos] = await pool.promise().query(
            `
                SELECT
                    p.*,
                    c.nome AS cliente_nome,
                    c.email AS cliente_email,
                    c.telefone AS cliente_telefone,
                    f.descricao AS forma_descricao
                FROM pedidos p
                INNER JOIN clientes c
                    ON c.id = p.id_cliente
                LEFT JOIN formas_pagamento f
                    ON f.id = p.id_forma_pagamento
                WHERE p.id = ?
            `,
            [id]
        );

        return pedidos[0];
    },

    buscarItens: async (idPedido) => {
        const [itens] = await pool.promise().query(
            `
                SELECT
                    pi.id,
                    pi.id_produto,
                    pi.quantidade,
                    pi.preco_unitario,
                    pi.subtotal,
                    pr.nome AS produto_nome
                FROM pedido_itens pi
                INNER JOIN produtos pr
                    ON pr.id = pi.id_produto
                WHERE pi.id_pedido = ?
                ORDER BY pi.id ASC
            `,
            [idPedido]
        );

        return itens;
    },

    buscarDadosFormulario: async () => {
        const banco = pool.promise();

        const [
            [clientes],
            [formas],
            [produtos]
        ] = await Promise.all([
            banco.query(`
                SELECT
                    id,
                    nome,
                    id_endereco
                FROM clientes
                ORDER BY nome ASC
            `),

            banco.query(`
                SELECT
                    id,
                    descricao
                FROM formas_pagamento
                ORDER BY descricao ASC
            `),

            banco.query(`
                SELECT
                    id,
                    nome,
                    preco,
                    tamanho
                FROM produtos
                WHERE disponivel = 1
                ORDER BY nome ASC
            `)
        ]);

        return {
            clientes,
            formas,
            produtos
        };
    },

    criarCompleto: async (dadosPedido) => {
        const conexao = await pool
            .promise()
            .getConnection();

        try {
            await conexao.beginTransaction();

            /*
             * Confirma que o cliente existe e busca
             * o endereço cadastrado.
             */
            const [clientes] = await conexao.query(
                `
                    SELECT
                        id,
                        id_endereco
                    FROM clientes
                    WHERE id = ?
                    FOR UPDATE
                `,
                [dadosPedido.id_cliente]
            );

            if (clientes.length === 0) {
                throw new Error(
                    'O cliente informado não existe.'
                );
            }

            const cliente = clientes[0];

            if (
                dadosPedido.tipo_entrega === 'ENTREGA' &&
                !cliente.id_endereco
            ) {
                const erro = new Error(
                    'O cliente precisa ter um endereço cadastrado para receber o pedido.'
                );

                erro.code = 'CLIENTE_SEM_ENDERECO';

                throw erro;
            }

            /*
             * Confirma que a forma de pagamento existe,
             * quando uma forma for selecionada.
             */
            if (dadosPedido.id_forma_pagamento) {
                const [formas] = await conexao.query(
                    `
                        SELECT id
                        FROM formas_pagamento
                        WHERE id = ?
                    `,
                    [dadosPedido.id_forma_pagamento]
                );

                if (formas.length === 0) {
                    throw new Error(
                        'A forma de pagamento não existe.'
                    );
                }
            }

            /*
             * Agrupa produtos repetidos.
             */
            const itensAgrupados = new Map();

            dadosPedido.itens.forEach((item) => {
                const quantidadeAnterior =
                    itensAgrupados.get(
                        item.id_produto
                    ) || 0;

                itensAgrupados.set(
                    item.id_produto,
                    quantidadeAnterior +
                    item.quantidade
                );
            });

            const idsProdutos = Array.from(
                itensAgrupados.keys()
            );

            if (idsProdutos.length === 0) {
                throw new Error(
                    'O pedido precisa possuir pelo menos um produto.'
                );
            }

            const marcadores = idsProdutos
                .map(() => '?')
                .join(', ');

            /*
             * Busca o preço diretamente do banco.
             */
            const [produtos] = await conexao.query(
                `
                    SELECT
                        id,
                        nome,
                        preco,
                        disponivel
                    FROM produtos
                    WHERE id IN (${marcadores})
                    FOR UPDATE
                `,
                idsProdutos
            );

            if (produtos.length !== idsProdutos.length) {
                throw new Error(
                    'Um ou mais produtos não foram encontrados.'
                );
            }

            const produtosPorId = new Map();

            produtos.forEach((produto) => {
                produtosPorId.set(
                    Number(produto.id),
                    produto
                );
            });

            let valorTotal = 0;
            const itensParaSalvar = [];

            itensAgrupados.forEach(
                (quantidade, idProduto) => {
                    const produto =
                        produtosPorId.get(
                            Number(idProduto)
                        );

                    if (!produto) {
                        throw new Error(
                            `Produto ${idProduto} não encontrado.`
                        );
                    }

                    if (!produto.disponivel) {
                        throw new Error(
                            `O produto "${produto.nome}" não está disponível.`
                        );
                    }

                    const precoUnitario = Number(
                        produto.preco
                    );

                    valorTotal +=
                        precoUnitario * quantidade;

                    itensParaSalvar.push({
                        id_produto:
                            Number(idProduto),

                        quantidade,

                        preco_unitario:
                            precoUnitario
                    });
                }
            );

            valorTotal = Number(
                valorTotal.toFixed(2)
            );

            /*
             * Cadastra o pedido.
             */
            const [resultadoPedido] =
                await conexao.query(
                    `
                        INSERT INTO pedidos
                        (
                            id_cliente,
                            id_forma_pagamento,
                            tipo_entrega,
                            status,
                            valor_total,
                            observacao
                        )
                        VALUES (?, ?, ?, ?, ?, ?)
                    `,
                    [
                        dadosPedido.id_cliente,
                        dadosPedido.id_forma_pagamento,
                        dadosPedido.tipo_entrega,
                        'NOVO',
                        valorTotal,
                        dadosPedido.observacao
                    ]
                );

            const pedidoId =
                resultadoPedido.insertId;

            /*
             * Cadastra todos os itens do pedido.
             */
            const valoresItens = [];

            const marcadoresItens =
                itensParaSalvar
                    .map(() => '(?, ?, ?, ?)')
                    .join(', ');

            itensParaSalvar.forEach((item) => {
                valoresItens.push(
                    pedidoId,
                    item.id_produto,
                    item.quantidade,
                    item.preco_unitario
                );
            });

            await conexao.query(
                `
                    INSERT INTO pedido_itens
                    (
                        id_pedido,
                        id_produto,
                        quantidade,
                        preco_unitario
                    )
                    VALUES ${marcadoresItens}
                `,
                valoresItens
            );

            /*
             * Quando o pedido for para entrega,
             * cria automaticamente o registro da entrega.
             */
            if (
                dadosPedido.tipo_entrega ===
                'ENTREGA'
            ) {
                await conexao.query(
                    `
                        INSERT INTO entregas
                        (
                            id_pedido,
                            id_endereco,
                            status_entrega
                        )
                        VALUES (?, ?, 'AGUARDANDO')
                    `,
                    [
                        pedidoId,
                        cliente.id_endereco
                    ]
                );
            }

            await conexao.commit();

            return {
                pedidoId,
                valorTotal
            };
        } catch (erro) {
            await conexao.rollback();
            throw erro;
        } finally {
            conexao.release();
        }
    },

    listarParaCozinha: async () => {
        const [linhas] =
            await pool.promise().query(`
                SELECT
                    p.id,
                    p.status,
                    p.tipo_entrega,
                    p.observacao,
                    p.data_pedido,
                    c.nome AS cliente_nome,
                    pi.quantidade,
                    pr.nome AS produto_nome
                FROM pedidos p
                INNER JOIN clientes c
                    ON c.id = p.id_cliente
                INNER JOIN pedido_itens pi
                    ON pi.id_pedido = p.id
                INNER JOIN produtos pr
                    ON pr.id = pi.id_produto
                WHERE p.status IN (
                    'NOVO',
                    'EM_PREPARO',
                    'PRONTO'
                )
                ORDER BY
                    FIELD(
                        p.status,
                        'NOVO',
                        'EM_PREPARO',
                        'PRONTO'
                    ),
                    p.data_pedido ASC,
                    pi.id ASC
            `);

        const pedidosAgrupados = new Map();

        linhas.forEach((linha) => {
            if (
                !pedidosAgrupados.has(linha.id)
            ) {
                pedidosAgrupados.set(
                    linha.id,
                    {
                        id: linha.id,
                        status: linha.status,

                        tipo_entrega:
                            linha.tipo_entrega,

                        observacao:
                            linha.observacao,

                        data_pedido:
                            linha.data_pedido,

                        cliente_nome:
                            linha.cliente_nome,

                        itens: []
                    }
                );
            }

            pedidosAgrupados
                .get(linha.id)
                .itens
                .push({
                    produto_nome:
                        linha.produto_nome,

                    quantidade:
                        linha.quantidade
                });
        });

        return Array.from(
            pedidosAgrupados.values()
        );
    },

    atualizarStatus: async (id, status) => {
        const conexao = await pool
            .promise()
            .getConnection();

        try {
            await conexao.beginTransaction();

            /*
             * Busca o pedido e o endereço atual
             * do cliente.
             */
            const [pedidos] =
                await conexao.query(
                    `
                        SELECT
                            p.id,
                            p.tipo_entrega,
                            c.id_endereco
                        FROM pedidos p
                        INNER JOIN clientes c
                            ON c.id = p.id_cliente
                        WHERE p.id = ?
                        FOR UPDATE
                    `,
                    [id]
                );

            if (pedidos.length === 0) {
                await conexao.rollback();
                return 0;
            }

            const pedido = pedidos[0];

            /*
             * Pedido de retirada não pode entrar
             * no status EM_ENTREGA.
             */
            if (
                pedido.tipo_entrega !==
                'ENTREGA' &&
                status === 'EM_ENTREGA'
            ) {
                const erro = new Error(
                    'Um pedido para retirada não pode ser enviado para entrega.'
                );

                erro.code =
                    'PEDIDO_RETIRADA_NAO_ENTREGA';

                throw erro;
            }

            /*
             * Garante que pedidos antigos do tipo ENTREGA
             * também possuam um registro na tabela entregas.
             */
            if (
                pedido.tipo_entrega ===
                'ENTREGA'
            ) {
                const [entregas] =
                    await conexao.query(
                        `
                            SELECT
                                id,
                                id_endereco
                            FROM entregas
                            WHERE id_pedido = ?
                            FOR UPDATE
                        `,
                        [id]
                    );

                if (entregas.length === 0) {
                    if (!pedido.id_endereco) {
                        const erro =
                            new Error(
                                'O cliente deste pedido não possui endereço cadastrado.'
                            );

                        erro.code =
                            'CLIENTE_SEM_ENDERECO';

                        throw erro;
                    }

                    await conexao.query(
                        `
                            INSERT INTO entregas
                            (
                                id_pedido,
                                id_endereco,
                                status_entrega
                            )
                            VALUES (
                                ?,
                                ?,
                                'AGUARDANDO'
                            )
                        `,
                        [
                            id,
                            pedido.id_endereco
                        ]
                    );
                }
            }

            /*
             * Atualiza o status principal do pedido.
             */
            await conexao.query(
                `
                    UPDATE pedidos
                    SET status = ?
                    WHERE id = ?
                `,
                [status, id]
            );

            /*
             * Sincroniza a tabela entregas.
             */
            if (
                pedido.tipo_entrega ===
                'ENTREGA'
            ) {
                if (
                    [
                        'NOVO',
                        'EM_PREPARO',
                        'PRONTO'
                    ].includes(status)
                ) {
                    await conexao.query(
                        `
                            UPDATE entregas
                            SET
                                status_entrega =
                                    'AGUARDANDO',

                                data_saida = NULL,
                                data_entrega = NULL
                            WHERE id_pedido = ?
                        `,
                        [id]
                    );
                }

                if (status === 'EM_ENTREGA') {
                    await conexao.query(
                        `
                            UPDATE entregas
                            SET
                                status_entrega =
                                    'SAIU_PARA_ENTREGA',

                                data_saida =
                                    COALESCE(
                                        data_saida,
                                        NOW()
                                    ),

                                data_entrega = NULL
                            WHERE id_pedido = ?
                        `,
                        [id]
                    );
                }

                if (status === 'ENTREGUE') {
                    await conexao.query(
                        `
                            UPDATE entregas
                            SET
                                status_entrega =
                                    'ENTREGUE',

                                data_saida =
                                    COALESCE(
                                        data_saida,
                                        NOW()
                                    ),

                                data_entrega = NOW()
                            WHERE id_pedido = ?
                        `,
                        [id]
                    );
                }

                if (status === 'CANCELADO') {
                    await conexao.query(
                        `
                            UPDATE entregas
                            SET
                                status_entrega =
                                    'CANCELADA',

                                data_entrega = NULL
                            WHERE id_pedido = ?
                        `,
                        [id]
                    );
                }
            }

            await conexao.commit();

            return 1;
        } catch (erro) {
            await conexao.rollback();
            throw erro;
        } finally {
            conexao.release();
        }
    },

    excluir: async (id) => {
        const [resultado] =
            await pool.promise().query(
                `
                    DELETE FROM pedidos
                    WHERE id = ?
                `,
                [id]
            );

        return resultado.affectedRows;
    }
};

module.exports = Pedido;