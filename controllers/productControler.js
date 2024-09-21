const Product = require('../models/productModel');

// Define o objeto controlador para gerenciar produtos
const productController = {
    
    // Método para criar um novo produto
    createProduct: (req, res) => {
        // Cria um objeto com os dados do novo produto a partir do corpo da requisição
        const newProduct = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            price: req.body.price,
            stock: req.body.stock,
        };

        // Chama o método de criação no model e redireciona para a lista de produtos
        Product.create(newProduct, (err, productId) => {
            if (err) {
                return res.status(500).json({ error: err }); // Retorna erro em caso de falha
            }
            res.redirect('/products'); // Redireciona para a página de produtos
        });
    },

    // Método para obter um produto pelo ID
    getProductById: (req, res) => {
        const productId = req.params.id; // Obtém o ID do produto a partir dos parâmetros da URL

        // Chama o método para encontrar o produto pelo ID
        Product.findById(productId, (err, product) => {
            if (err) {
                return res.status(500).json({ error: err }); // Retorna erro em caso de falha
            }
            if (!product) {
                return res.status(404).json({ message: 'Product not found' }); // Retorna erro se o produto não for encontrado
            }
            res.render('products/show', { product }); // Renderiza a página de exibição do produto
        });
    },

    // Método para obter todos os produtos
    getAllProducts: (req, res) => {
        // Chama o método para obter todos os produtos
        Product.getAll((err, products) => {
            if (err) {
                return res.status(500).json({ error: err }); // Retorna erro em caso de falha
            }
            res.render('products/index', { products }); // Renderiza a página de listagem de produtos
        });
    },

    // Método para renderizar o formulário de criação de produto
    renderCreateForm: (req, res) => {
        res.render('products/create'); // Renderiza o formulário para criar um novo produto
    },

    // Método para renderizar o formulário de edição de produto
    renderEditForm: (req, res) => {
        const productId = req.params.id; // Obtém o ID do produto a partir dos parâmetros da URL

        // Chama o método para encontrar o produto pelo ID
        Product.findById(productId, (err, product) => {
            if (err) {
                return res.status(500).json({ error: err }); // Retorna erro em caso de falha
            }
            if (!product) {
                return res.status(404).json({ message: 'Product not found' }); // Retorna erro se o produto não for encontrado
            }
            res.render('products/edit', { product }); // Renderiza o formulário de edição do produto
        });
    },

    // Método para atualizar um produto existente
    updateProduct: (req, res) => {
        const productId = req.params.id; // Obtém o ID do produto a partir dos parâmetros da URL
        // Cria um objeto com os dados atualizados do produto a partir do corpo da requisição
        const updatedProduct = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            price: req.body.price,
            stock: req.body.stock,
        };

        // Chama o método de atualização no model
        Product.update(productId, updatedProduct, (err) => {
            if (err) {
                return res.status(500).json({ error: err }); // Retorna erro em caso de falha
            }
            res.redirect('/products'); // Redireciona para a página de produtos
        });
    },

    // Método para excluir um produto
    deleteProduct: (req, res) => {
        const productId = req.params.id; // Obtém o ID do produto a partir dos parâmetros da URL

        // Chama o método de exclusão no model
        Product.delete(productId, (err) => {
            if (err) {
                return res.status(500).json({ error: err }); // Retorna erro em caso de falha
            }
            res.redirect('/products'); // Redireciona para a página de produtos
        });
    },
};

// Exporta o controlador para ser usado em outras partes da aplicação
module.exports = productController;
