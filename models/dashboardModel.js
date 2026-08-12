const pool = require('../config/db');

const Dashboard = {
    buscarResumo: async () => {
        const banco = pool.promise();

        const [
            [resultadoClientes],
            [resultadoProdutos],
            [resultadoPedidosHoje],
            [resultadoFaturamento],
            [pedidosPorStatus],
            [pedidosRecentes]
        ] = await Promise.all([
            banco.query(`
                SELECT COUNT(*) AS total
                FROM clientes
            `),

            banco.query(`
                SELECT
                    COUNT(*) AS total,
                    SUM(
                        CASE
                            WHEN disponivel = 1 THEN 1
                            ELSE 0
                        END
                    ) AS disponiveis
                FROM produtos
            `),

            banco.query(`
                SELECT COUNT(*) AS total
                FROM pedidos
                WHERE DATE(data_pedido) = CURDATE()
            `),

            banco.query(`
                SELECT
                    COALESCE(SUM(valor_total), 0) AS total
                FROM pedidos
                WHERE DATE(data_pedido) = CURDATE()
                  AND status <> 'CANCELADO'
            `),

            banco.query(`
                SELECT
                    status,
                    COUNT(*) AS quantidade
                FROM pedidos
                GROUP BY status
            `),

            banco.query(`
                SELECT
                    p.id,
                    p.status,
                    p.valor_total,
                    p.tipo_entrega,
                    p.data_pedido,
                    c.nome AS cliente_nome
                FROM pedidos p
                INNER JOIN clientes c
                    ON c.id = p.id_cliente
                ORDER BY p.data_pedido DESC
                LIMIT 5
            `)
        ]);

        const status = {
            NOVO: 0,
            EM_PREPARO: 0,
            PRONTO: 0,
            EM_ENTREGA: 0,
            ENTREGUE: 0,
            CANCELADO: 0
        };

        pedidosPorStatus.forEach((item) => {
            status[item.status] = Number(
                item.quantidade
            );
        });

        return {
            totalClientes:
                Number(resultadoClientes[0].total),

            totalProdutos:
                Number(resultadoProdutos[0].total),

            produtosDisponiveis:
                Number(
                    resultadoProdutos[0].disponiveis || 0
                ),

            pedidosHoje:
                Number(resultadoPedidosHoje[0].total),

            faturamentoHoje:
                Number(resultadoFaturamento[0].total),

            status,
            pedidosRecentes
        };
    }
};

module.exports = Dashboard;