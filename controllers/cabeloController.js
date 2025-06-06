const Cabelo = require('../models/cabeloModel');

const cabeloController = {
    createCabelo: (req, res) => {
        const newCabelo = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            categoria: req.body.categoria
        };
        Cabelo.create(newCabelo, (err) => {
            if (err) return res.status(500).json({ error: err });
            res.redirect('/cabelos');
        });
    },

    getAllCabelos: (req, res) => {
        Cabelo.getAll((err, cabelos) => {
            if (err) return res.status(500).json({ error: err });
            res.render('cabelos/index', { cabelos });
        });
    },

    getCabeloById: (req, res) => {
        Cabelo.findById(req.params.id, (err, cabelo) => {
            if (err) return res.status(500).json({ error: err });
            if (!cabelo) return res.status(404).json({ message: 'Cabelo não encontrado' });
            res.render('cabelos/show', { cabelo });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('cabelos/create');
    },

    renderEditForm: (req, res) => {
        Cabelo.findById(req.params.id, (err, cabelo) => {
            if (err) return res.status(500).json({ error: err });
            if (!cabelo) return res.status(404).json({ message: 'Cabelo não encontrado' });
            res.render('cabelos/edit', { cabelo });
        });
    },

    updateCabelo: (req, res) => {
        const updatedCabelo = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            categoria: req.body.categoria
        };
        Cabelo.update(req.params.id, updatedCabelo, (err) => {
            if (err) return res.status(500).json({ error: err });
            res.redirect('/cabelos');
        });
    },

    deleteCabelo: (req, res) => {
        Cabelo.delete(req.params.id, (err) => {
            if (err) return res.status(500).json({ error: err });
            res.redirect('/cabelos');
        });
    },

    searchCabelos: (req, res) => {
        const search = req.query.search || '';
        Cabelo.searchByName(search, (err, cabelos) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ cabelos });
        });
    }
};

module.exports = cabeloController;