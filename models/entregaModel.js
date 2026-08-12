const pool = require('../config/db');

const Entrega = {
    listarPainel: async () => {
        const [linhas] = await pool.promise().query(`
            SELECT
                e.id,
                e.id_pedido,
                e.status_entrega,
                e.data_saida,
                e.data_entrega,
                e.observacao AS observacao_entrega,

                p.status AS pedido_status,
                p.valor_total,
                p.data_pedido,

                c.nome AS cliente_nome,
                c.telefone AS cliente_telefone,

                end.rua,
                end.numero,
                end.bairro,
                end.municipio,
                end.ponto_referencia,
                end.cep,

                pi.quantidade,
                pr.nome AS produto_nome
            FROM entregas e
            INNER JOIN pedidos p
                ON p.id = e.id_pedido
            INNER JOIN clientes c
                ON c.id = p.id_cliente
            INNER JOIN enderecos end
                ON end.id = e.id_endereco
            INNER JOIN pedido_itens pi
                ON pi.id_pedido = p.id
            INNER JOIN produtos pr
                ON pr.id = pi.id_produto
            WHERE
                (
                    e.status_entrega = 'AGUARDANDO'
                    AND p.status = 'PRONTO'
                )
                OR e.status_entrega =
                    'SAIU_PARA_ENTREGA'
                OR (
                    e.status_entrega = 'ENTREGUE'
                    AND DATE(e.data_entrega) =
                        CURDATE()
                )
            ORDER BY
                FIELD(
                    e.status_entrega,
                    'AGUARDANDO',
                    'SAIU_PARA_ENTREGA',
                    'ENTREGUE'
                ),
                p.data_pedido ASC,
                pi.id ASC
        `);

        const entregasAgrupadas = new Map();

        linhas.forEach((linha) => {
            if (!entregasAgrupadas.has(linha.id)) {
                entregasAgrupadas.set(linha.id, {
                    id: linha.id,
                    id_pedido: linha.id_pedido,
                    status_entrega:
                        linha.status_entrega,

                    pedido_status:
                        linha.pedido_status,

                    valor_total:
                        linha.valor_total,

                    data_pedido:
                        linha.data_pedido,

                    data_saida:
                        linha.data_saida,

                    data_entrega:
                        linha.data_entrega,

                    observacao_entrega:
                        linha.observacao_entrega,

                    cliente_nome:
                        linha.cliente_nome,

                    cliente_telefone:
                        linha.cliente_telefone,

                    rua: linha.rua,
                    numero: linha.numero,
                    bairro: linha.bairro,
                    municipio: linha.municipio,
                    ponto_referencia:
                        linha.ponto_referencia,
                    cep: linha.cep,

                    itens: []
                });
            }

            entregasAgrupadas
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
            entregasAgrupadas.values()
        );
    }
};

module.exports = Entrega;