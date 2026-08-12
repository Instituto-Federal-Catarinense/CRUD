const Entrega = require('../models/entregaModel');

const entregaController = {
    exibirPainel: async (req, res) => {
        try {
            const entregas =
                await Entrega.listarPainel();

            const colunas = {
                AGUARDANDO: [],
                SAIU_PARA_ENTREGA: [],
                ENTREGUE: []
            };

            entregas.forEach((entrega) => {
                if (colunas[entrega.status_entrega]) {
                    colunas[
                        entrega.status_entrega
                    ].push(entrega);
                }
            });

            res.render('entregas/index', {
                title:
                    'Entregas - Cantina Federal',

                colunas
            });
        } catch (erro) {
            console.error(erro);

            res.status(500).json({
                mensagem:
                    'Erro ao carregar as entregas',
                erro: erro.message
            });
        }
    }
};

module.exports = entregaController;