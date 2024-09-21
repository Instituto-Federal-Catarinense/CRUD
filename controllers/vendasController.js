const Venda = require('../models/vendaModel');  // Importa o modelo de vendas

const vendaController = {
    // Função para criar uma nova venda
    createVenda: (req, res) => {
        const newVenda = {
            idUser: req.body.idUser,               // ID do usuário que fez a compra
            idProduct: req.body.idProduct,         // ID do produto comprado
            quantidade: req.body.quantidade,       // Quantidade comprada
            valorTotal: req.body.valorTotal,       // Valor total da venda
            DataVenda: req.body.DataVenda          // Data da venda
        };

        // Chama o método de criação do modelo
        Venda.create(newVenda, (err, vendaId) => {
            if (err) {
                return res.status(500).json({ error: err });  // Retorna erro em caso de falha
            }
            res.redirect('/vendas');  // Redireciona para a lista de vendas
        });
    },

    // Função para obter uma venda pelo seu ID
    getVendaById: (req, res) => {
        const vendaId = req.params.id;  // Pega o ID da venda dos parâmetros da URL

        // Busca a venda pelo ID
        Venda.findById(vendaId, (err, venda) => {
            if (err) {
                return res.status(500).json({ error: err });  // Retorna erro em caso de falha
            }
            if (!venda) {
                return res.status(404).json({ message: 'Venda não encontrada' });  // Retorna erro se a venda não for encontrada
            }
            res.render('vendas/show', { venda });  // Renderiza a view de detalhes da venda
        });
    },

    // Função para obter todas as vendas
    getAllVendas: (req, res) => {
        Venda.getAll((err, vendas) => {
            if (err) {
                return res.status(500).json({ error: err });  // Retorna erro em caso de falha
            }
            res.render('vendas/index', { vendas });  // Renderiza a view de listagem de vendas
        });
    },

    // Função para renderizar o formulário de criação de venda
    renderCreateForm: (req, res) => {
        res.render('vendas/create');  // Renderiza o formulário de criação de venda
    },

    // Função para renderizar o formulário de edição de venda
    renderEditForm: (req, res) => {
        const vendaId = req.params.id;  // Pega o ID da venda dos parâmetros da URL

        // Busca a venda pelo ID
        Venda.findById(vendaId, (err, venda) => {
            if (err) {
                return res.status(500).json({ error: err });  // Retorna erro em caso de falha
            }
            if (!venda) {
                return res.status(404).json({ message: 'Venda não encontrada' });  // Retorna erro se a venda não for encontrada
            }
            res.render('vendas/edit', { venda });  // Renderiza o formulário de edição de venda
        });
    },

    // Função para atualizar uma venda existente
    updateVenda: (req, res) => {
        const vendaId = req.params.id;  // Pega o ID da venda dos parâmetros da URL
        const updatedVenda = {
            idUser: req.body.idUser,              // Atualiza o ID do usuário
            idProduct: req.body.idProduct,        // Atualiza o ID do produto
            quantidade: req.body.quantidade,      // Atualiza a quantidade comprada
            valorTotal: req.body.valorTotal,      // Atualiza o valor total
            DataVenda: req.body.DataVenda         // Atualiza a data da venda
        };

        // Chama o método de atualização do modelo
        Venda.update(vendaId, updatedVenda, (err) => {
            if (err) {
                return res.status(500).json({ error: err });  // Retorna erro em caso de falha
            }
            res.redirect('/vendas');  // Redireciona para a lista de vendas
        });
    },

    // Função para deletar uma venda
    deleteVenda: (req, res) => {
        const vendaId = req.params.id;  // Pega o ID da venda dos parâmetros da URL

        // Chama o método de exclusão do modelo
        Venda.delete(vendaId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });  // Retorna erro em caso de falha
            }
            res.redirect('/vendas');  // Redireciona para a lista de vendas
        });
    },

    // Função para buscar vendas por produto ou usuário
    searchVendas: (req, res) => {
        const search = req.query.search || '';  // Pega o termo de busca da query string

        // Chama o método de busca do modelo
        Venda.searchByProductOrUser(search, (err, vendas) => {
            if (err) {
                return res.status(500).json({ error: err });  // Retorna erro em caso de falha
            }
            res.json({ vendas });  // Retorna os resultados da busca em formato JSON
        });
    },
};

module.exports = vendaController;  // Exporta o controller para uso em outros arquivos
