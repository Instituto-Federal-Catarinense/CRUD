const Product = require('../models/productModel');

const productController = {
    createProduct: (req, res) => {
        const newProduct = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
        };

        Product.create(newProduct, (err, productId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/products');
        });
    },

    getProductById: (req, res) => {
        const productId = req.params.id;

        Product.findById(productId, (err, product) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.render('products/show', { product });
        });
    },

    getAllProducts: (req, res) => {
        Product.getAll((err, products) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('products/index', { products });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('products/create');
    },

    renderEditForm: (req, res) => {
        const productId = req.params.id;

        Product.findById(productId, (err, product) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.render('products/edit', { product });
        });
    },

    updateProduct: (req, res) => {
        const productId = req.params.id;
        const updatedProduct = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
        };

        Product.update(productId, updatedProduct, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/products');
        });
    },

    deleteProduct: (req, res) => {
        const productId = req.params.id;

        Product.delete(productId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/products');
        });
    },
};

module.exports = productController;