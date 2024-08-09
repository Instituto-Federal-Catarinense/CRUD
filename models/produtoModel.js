const produto = require('./produtoModel');

const produtoController = {
    createProduct: (req, res) => {
        const newProduct = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
        };

        produto.create(newProduct, (err, productId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/products');
        });
    },

    getProductById: (req, res) => {
        const productId = req.params.id;

        produto.findById(productId, (err, product) => {
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
        produto.getAll((err, products) => {
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

        produto.findById(productId, (err, product) => {
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
            price: req.body.pr
