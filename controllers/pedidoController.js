const Pedido = require('../models/pedidosModel');

exports.listarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll();
        res.render('pedidos/index', { pedidos });
    } catch (err) {
        res.status(500).json({ erro: err });
    }
};

exports.buscarPedidoPorId = async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id);
        if (!pedido) return res.status(404).json({ mensagem: 'Pedido não encontrado' });
        res.render('pedidos/show', { pedido });
    } catch (err) {
        res.status(500).json({ erro: err });
    }
};

exports.criarPedido = async (req, res) => {
    try {
        await Pedido.create({
            nome_produto: req.body.nome_produto,
            quantidade: req.body.quantidade,
            preco: req.body.preco
        });
        res.redirect('/pedidos');
    } catch (err) {
        res.status(500).json({ erro: err });
    }
};

exports.atualizarPedido = async (req, res) => {
    try {
        await Pedido.update(
            {
                nome_produto: req.body.nome_produto,
                quantidade: req.body.quantidade,
                preco: req.body.preco
            },
            { where: { id: req.params.id } }
        );
        res.redirect('/pedidos');
    } catch (err) {
        res.status(500).json({ erro: err });
    }
};

exports.deletarPedido = async (req, res) => {
    try {
        await Pedido.destroy({ where: { id: req.params.id } });
        res.redirect('/pedidos');
    } catch (err) {
        res.status(500).json({ erro: err });
    }
};