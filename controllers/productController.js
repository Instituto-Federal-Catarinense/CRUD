const Product = require('../models/productModel');

const productController = {
    // Renderiza o formulário de criação de um novo produto
    renderCreateForm: (req, res) => {
        res.render('products/create');
    },

    // Cria um novo produto
    createProduct: (req, res) => {
        const newProduct = {
            name: req.body.name,
            price: parseFloat(req.body.price),
            category: req.body.category,
        };

        Product.create(newProduct, (err, productId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/products');
        });
    },

    // Obtém um produto por ID
    getProductById: (req, res) => {
        const productId = req.params.id;

        Product.findById(productId, (err, product) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            product.price = parseFloat(product.price);
            res.render('products/show', { product });
        });
    },

    // Obtém todos os produtos
    getAllProducts: (req, res) => {
        Product.getAll((err, products) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            // Converter preços para números
            products.forEach(product => {
                product.price = parseFloat(product.price);
            });
            res.render('products/index', { products });
        });
    },

    // Renderiza o formulário de edição de um produto
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

    // Atualiza um produto
    updateProduct: (req, res) => {
        const productId = req.params.id;
        const updatedProduct = {
            name: req.body.name,
            price: parseFloat(req.body.price),
            category: req.body.category,
        };

        Product.update(productId, updatedProduct, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/products');
        });
    },

    // Deleta um produto
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
