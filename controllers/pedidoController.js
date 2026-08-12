const Pedido = require('../models/pedidoModel');

const STATUS_VALIDOS = [
    'NOVO',
    'EM_PREPARO',
    'PRONTO',
    'EM_ENTREGA',
    'ENTREGUE',
    'CANCELADO'
];

const DESTINOS_PERMITIDOS = [
    '/cozinha',
    '/entregas'
];

function transformarItens(body) {
    const itensRecebidos =
        body.itens || body.items || [];

    const lista = Array.isArray(itensRecebidos)
        ? itensRecebidos
        : [itensRecebidos];

    return lista
        .filter((item) => {
            return item && item.id_produto;
        })
        .map((item) => {
            return {
                id_produto: Number(
                    item.id_produto
                ),

                quantidade: Number(
                    item.quantidade
                )
            };
        });
}

function validarId(id, tipo) {
    if (!Number.isInteger(id) || id <= 0) {
        return `ID de ${tipo} inválido.`;
    }

    return null;
}

function validarPedido(dadosPedido) {
    if (
        !Number.isInteger(dadosPedido.id_cliente) ||
        dadosPedido.id_cliente <= 0
    ) {
        return 'Selecione um cliente válido.';
    }

    if (
        dadosPedido.id_forma_pagamento !== null &&
        (
            !Number.isInteger(
                dadosPedido.id_forma_pagamento
            ) ||
            dadosPedido.id_forma_pagamento <= 0
        )
    ) {
        return 'Selecione uma forma de pagamento válida.';
    }

    if (
        !['RETIRADA', 'ENTREGA'].includes(
            dadosPedido.tipo_entrega
        )
    ) {
        return 'O tipo de entrega é inválido.';
    }

    if (dadosPedido.itens.length === 0) {
        return (
            'O pedido precisa ter pelo menos um item.'
        );
    }

    const itemInvalido =
        dadosPedido.itens.some((item) => {
            return (
                !Number.isInteger(
                    item.id_produto
                ) ||
                item.id_produto <= 0 ||
                !Number.isInteger(
                    item.quantidade
                ) ||
                item.quantidade <= 0
            );
        });

    if (itemInvalido) {
        return (
            'Os produtos e quantidades precisam ser válidos.'
        );
    }

    return null;
}

function tratarErro(res, erro, mensagemPadrao) {
    if (erro.code === 'CLIENTE_SEM_ENDERECO') {
        return res
            .status(400)
            .send(erro.message);
    }

    if (
        erro.code ===
        'PEDIDO_RETIRADA_NAO_ENTREGA'
    ) {
        return res
            .status(400)
            .send(erro.message);
    }

    if (
        erro.code ===
        'ER_NO_REFERENCED_ROW_2'
    ) {
        return res.status(400).send(
            'Um dos registros selecionados não existe mais.'
        );
    }

    if (
        erro.code ===
        'ER_ROW_IS_REFERENCED_2'
    ) {
        return res.status(409).send(
            'Este pedido possui registros vinculados e não pode ser excluído.'
        );
    }

    console.error(erro);

    return res.status(500).json({
        mensagem: mensagemPadrao,
        erro: erro.message
    });
}

const pedidoController = {
    listarPedidos: async (req, res) => {
        try {
            const pedidos =
                await Pedido.listarTodos();

            res.render('pedidos/index', {
                title: 'Pedidos - Cantina Federal',
                pedidos
            });
        } catch (erro) {
            tratarErro(
                res,
                erro,
                'Erro ao buscar pedidos'
            );
        }
    },

    exibirFormularioCadastro: async (
        req,
        res
    ) => {
        try {
            const dados =
                await Pedido.buscarDadosFormulario();

            res.render('pedidos/create', {
                title:
                    'Novo pedido - Cantina Federal',

                clientes: dados.clientes,
                formas: dados.formas,
                produtos: dados.produtos
            });
        } catch (erro) {
            tratarErro(
                res,
                erro,
                'Erro ao carregar o formulário'
            );
        }
    },

    cadastrarPedido: async (req, res) => {
        try {
            const idFormaPagamento =
                req.body.id_forma_pagamento
                    ? Number(
                        req.body.id_forma_pagamento
                    )
                    : null;

            const observacao =
                typeof req.body.observacao ===
                    'string'
                    ? req.body.observacao.trim()
                    : '';

            const dadosPedido = {
                id_cliente: Number(
                    req.body.id_cliente
                ),

                id_forma_pagamento:
                    idFormaPagamento,

                tipo_entrega:
                    req.body.tipo_entrega,

                observacao:
                    observacao || null,

                itens:
                    transformarItens(req.body)
            };

            const erroValidacao =
                validarPedido(dadosPedido);

            if (erroValidacao) {
                return res
                    .status(400)
                    .send(erroValidacao);
            }

            const resultado =
                await Pedido.criarCompleto(
                    dadosPedido
                );

            res.redirect(
                `/pedidos/${resultado.pedidoId}`
            );
        } catch (erro) {
            tratarErro(
                res,
                erro,
                'Erro ao criar pedido'
            );
        }
    },

    visualizarPedido: async (req, res) => {
        try {
            const id = Number(req.params.id);

            const erroId =
                validarId(id, 'pedido');

            if (erroId) {
                return res
                    .status(400)
                    .send(erroId);
            }

            const [pedido, itens] =
                await Promise.all([
                    Pedido.buscarPorId(id),
                    Pedido.buscarItens(id)
                ]);

            if (!pedido) {
                return res
                    .status(404)
                    .send(
                        'Pedido não encontrado.'
                    );
            }

            res.render('pedidos/show', {
                title:
                    `Pedido #${pedido.id} - Cantina Federal`,

                pedido,

                /*
                 * Mantém os dois nomes para garantir
                 * compatibilidade com telas antigas.
                 */
                items: itens,
                itens
            });
        } catch (erro) {
            tratarErro(
                res,
                erro,
                'Erro ao buscar pedido'
            );
        }
    },

    atualizarStatus: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const status = req.body.status;

            const erroId =
                validarId(id, 'pedido');

            if (erroId) {
                return res
                    .status(400)
                    .send(erroId);
            }

            if (!STATUS_VALIDOS.includes(status)) {
                return res
                    .status(400)
                    .send('Status inválido.');
            }

            const alterados =
                await Pedido.atualizarStatus(
                    id,
                    status
                );

            if (alterados === 0) {
                return res
                    .status(404)
                    .send(
                        'Pedido não encontrado.'
                    );
            }

            const destinoSolicitado =
                req.body.redirecionar_para;

            const destino =
                DESTINOS_PERMITIDOS.includes(
                    destinoSolicitado
                )
                    ? destinoSolicitado
                    : `/pedidos/${id}`;

            res.redirect(destino);
        } catch (erro) {
            tratarErro(
                res,
                erro,
                'Erro ao atualizar o status'
            );
        }
    },

    excluirPedido: async (req, res) => {
        try {
            const id = Number(req.params.id);

            const erroId =
                validarId(id, 'pedido');

            if (erroId) {
                return res
                    .status(400)
                    .send(erroId);
            }

            const excluidos =
                await Pedido.excluir(id);

            if (excluidos === 0) {
                return res
                    .status(404)
                    .send(
                        'Pedido não encontrado.'
                    );
            }

            res.redirect('/pedidos');
        } catch (erro) {
            tratarErro(
                res,
                erro,
                'Erro ao excluir pedido'
            );
        }
    }
};

module.exports = pedidoController;