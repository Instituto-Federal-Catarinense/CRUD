const Pedido = require('../models/pedidoModel');

const cozinhaController = {
    exibirPainel: async (req, res) => {
        try {
            const pedidos =
                await Pedido.listarParaCozinha();

            const colunas = {
                NOVO: [],
                EM_PREPARO: [],
                PRONTO: []
            };

            pedidos.forEach((pedido) => {
                if (colunas[pedido.status]) {
                    colunas[pedido.status].push(pedido);
                }
            });

            res.render('cozinha/index', {
                title: 'Cozinha - Cantina Federal',
                colunas
            });
        } catch (erro) {
            res.status(500).json({
                mensagem:
                    'Erro ao carregar os pedidos da cozinha',
                erro: erro.message
            });
        }
    }
};

module.exports = cozinhaController;