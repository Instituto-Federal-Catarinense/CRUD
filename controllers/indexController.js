const Dashboard = require('../models/dashboardModel');

const indexController = {
    exibirInicio: async (req, res) => {
        try {
            const resumo =
                await Dashboard.buscarResumo();

            res.render('index', {
                title: 'Painel - Cantina Federal',
                resumo
            });
        } catch (erro) {
            res.status(500).json({
                mensagem:
                    'Erro ao carregar o painel',
                erro: erro.message
            });
        }
    }
};

module.exports = indexController;